
document.addEventListener('DOMContentLoaded', function () {
    // Alle Inputs mit Pattern _sf_file_cf_* auswählen
    if (autoCompleteValues) {
        let selectedIndex = -1;

        const inputs = document.querySelectorAll('input[name^="_sf_file_cf_"]');
        // console.log('DOMContentLoaded EXIST autoCompleteValues', autoCompleteValues);

        function getSuggestionsForInput(inputName, suggestionsObj) {
            // letzte Zahl im Input extrahieren
            const match = inputName.match(/_(\d+)$/);
            if (!match) return [];
            const index = '_' + match[1]; 
        
            // Vorschlag-Key suchen
            const suggestionKey = Object.keys(suggestionsObj).find(key => {
                return key.startsWith("_sf_file_upload_cf_") && key.endsWith(index);
            });
        
            if (!suggestionKey) return [];
        
            return suggestionsObj[suggestionKey]; // Array zurückgeben
        }
        
        inputs.forEach(input => {

            let listDiv;

            input.addEventListener('input', function () {
                const val = this.value;
                selectedIndex = -1;
                // console.log('DOMContentLoaded INPUT ', this);
                // console.log('DOMContentLoaded INPUT val, autoCompleteValues', val, autoCompleteValues);

                // Liste löschen, falls vorhanden
                if (listDiv) listDiv.remove();

                if (!val) return;

                // Liste erzeugen
                listDiv = document.createElement('div');
                listDiv.className = 'autocomplete-list';

                // Position unter Input
                const rect = this.getBoundingClientRect();
                listDiv.style.top = (this.offsetTop + this.offsetHeight) + 'px';
                listDiv.style.left = this.offsetLeft + 'px';
                listDiv.style.width = this.offsetWidth + 'px';

                // Vorschläge filtern
                const extractedAutoCompleteValues = getSuggestionsForInput(this.name, autoCompleteValues);
                // console.log('DOMContentLoaded INPUT autoCompleteValues', extractedAutoCompleteValues);

                extractedAutoCompleteValues
                    .filter(s => s.toLowerCase().includes(val.toLowerCase()))
                    .forEach(s => {
                        const item = document.createElement('div');
                        item.className = 'autocomplete-item';
                        item.textContent = s;

                        item.addEventListener('click', () => {
                            input.value = s;
                            input.onchange?.();
                            listDiv.remove();
                        });

                        listDiv.appendChild(item);
                    });

                // Anhängen
                this.parentNode.appendChild(listDiv);

                // Tastatursteuerung
                input.addEventListener('keydown', function(e) {
                    const items = listDiv?.querySelectorAll('.autocomplete-item');
                    if (!items || items.length === 0) return;
        
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        selectedIndex = (selectedIndex + 1) % items.length;
                        updateSelection(items, selectedIndex);
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        selectedIndex = (selectedIndex - 1 + items.length) % items.length;
                        updateSelection(items, selectedIndex);
                    } else if (e.key === 'Enter') {
                        e.preventDefault();
                        if (selectedIndex >= 0) {
                            items[selectedIndex].click();
                        }
                    } else if (e.key === 'Escape') {
                        listDiv.remove();
                    }
                });
        
                function updateSelection(items, index) {
                    items.forEach((el, i) => {
                        el.style.backgroundColor = i === index ? '#ddd' : 'white';
                    });
                }							
            });

            // Liste schließen bei Klick außerhalb
            document.addEventListener('click', function(e){
                if(listDiv && !listDiv.contains(e.target) && e.target !== input){
                    listDiv.remove();
                }
            });
        });
    }
});