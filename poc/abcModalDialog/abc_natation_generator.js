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
function getTriadNotation(key, triadNotes, abcNotes, title, midiProgramNr, playAccordPrior, playTriad, playNotes){
    let triadLine1 = "";
    let triadLine2 = "";
    // triad
    if(playAccordPrior && triadNotes && triadNotes.length >=3){
        triadLine1 = "[" + triadNotes.slice(0, 3).join('2') + "] z | ";
        triadLine2 = "z2z | ";
    }
    if(playTriad){
        triadLine1 += triadNotes.join('') + " z | ";
        triadLine2 += "zzzzzz |";
    }

    if(playNotes){
        // notes
        triadLine1 += abcNotes.slice(0, abcNotes.length - 2).join('');
        if(triadLine1.length > 2){
            triadLine1 += "z";
        }

        for(i=0; i < abcNotes.length - 2; i++){
            triadLine2 += "z";
        }
        triadLine2 += abcNotes.slice(abcNotes.length - 2, abcNotes.length).join('') + " | ";
    }

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