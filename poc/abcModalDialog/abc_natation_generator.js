/** ABC Notation 
 * T: = Title Titel des Stücks (frei wählbar, rein informativ)
 * %% = Direktive (Layout- oder MIDI-Anweisung) MIDI program 0: Setzt das MIDI-Instrument, 0 = Acoustic Grand Piano
 * Siehe https://michaeleskin.com/abctools/general_midi_extended_v7.pdf
 * M: 4/4 Taktart
 * L: 1/4 Default Note Length, D = Viertelnote, D2 = Halbe, D/2 = Achtel
 * K: D Key (Tonart D)
 * V: 1 Voice, Startet Stimme 1
 * [D2F2A2] Akkord mit halber Note mit den Tönen D, Fis und A (weil Tonart D-Dur)
 * z Pause viertel Note
 * clef=bass Bassschlüssel
*/
function getTriadNotation(key, triadNotes, title, midiProgramNr, playAccordPrior){
    let triadText = "";
    if(playAccordPrior && triadNotes && triadNotes.length >=3){
        triadText = "[" + triadNotes.slice(0, 3).join('2') + "] z | ";
    }

    let triadAbc = triadNotes.join('') + " | ";

    return `T: ${title}
    %%MIDI program ${midiProgramNr}
    L: 1/4
    K: ${key}
    V: 1
    ${triadText}${triadAbc}
    `;
}

function getTonesNotation(key, triadNotes, abcNotes, title, midiProgramNr, playAccordPrior){
    let triadText = "";
    let triadAbcLine1 = abcNotes.slice(0, abcNotes.length - 2).join('');
    if(triadAbcLine1.length > 2){
         triadAbcLine1 += "z";
    }

    let triadAbcLine2 = "";
    for(i=0; i < abcNotes.length - 2; i++){
        triadAbcLine2 += "z";
    }
    triadAbcLine2 += abcNotes.slice(abcNotes.length - 2, abcNotes.length).join('') + " | ";
    console.log("GGGGG getTonesNotation", abcNotes, abcNotes.slice(0, abcNotes.length - 2), abcNotes.slice(abcNotes.length - 2, abcNotes.length))
    if(playAccordPrior && triadNotes && triadNotes.length >=3){
        triadText = "[" + triadNotes.slice(0, 3).join('2') + "] z | ";
        triadAbcLine2 = "z2z | " + triadAbcLine2;
    }


    return `T: ${title}
    %%MIDI program ${midiProgramNr}
    L: 1/4
    K: ${key}
    V: 1
    ${triadText}${triadAbcLine1}
    V: 2 clef=bass
    ${triadAbcLine2}
    `;
}

function getTriadAndTonesNotation(key, triadNotes, abcNotes, title, midiProgramNr, playAccordPrior){
    let triadLine1 = triadNotes.join('') + " z | ";
    let triadLine2 = "zzzzzz |";
    if(playAccordPrior && triadNotes && triadNotes.length >=3){
        triadLine1 = "[" + triadNotes.slice(0, 3).join('2') + "] z | " + triadLine1;
        triadLine2 = "z2z | " + triadLine2;
    }

    triadLine1 += abcNotes.slice(0, abcNotes.length - 2).join('');
    if(triadLine1.length > 2){
         triadLine1 += "z";
    }

    for(i=0; i < abcNotes.length - 2; i++){
        triadLine2 += "z";
    }
    triadLine2 += abcNotes.slice(abcNotes.length - 2, abcNotes.length).join('') + " | ";

    return `T: ${title}
    %%MIDI program ${midiProgramNr}
    L: 1/4
    K: ${key}
    V: 1
    ${triadLine1}
    V: 2 clef=bass
    ${triadLine2}
    `;
}