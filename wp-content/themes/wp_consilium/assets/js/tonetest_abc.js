// import { getKeySignature, getCorrectedKeySignature } from '/wp-content/themes/wp_consilium/assets/js/tonarten_helper.js';
// import { getTones } from '/wp-content/themes/wp_consilium/assets/js/tone_input_parser.js';
// import {
//   getTriadNotation,
//   getSingleToneNotation
// } from '/wp-content/themes/wp_consilium/assets/js//abc_notation_generator.js';

document.addEventListener('DOMContentLoaded', function () {
	console.log("tonetst_abc DOMContentLoaded before initTonesModal")
	initTonesModal();
});

/** START tone_input_parser **/
function getKeySignature(input) {
    if (typeof input !== "string") return null;

    const parts = input.split("/");
    if(parts.length > 0)
        return parts[0].trim();

    return null;
}

function getTones(input, clearEmptyTones) {
    if (typeof input !== "string") return null;

    const parts = input.split("/");
    if(parts.length > 1) {
        if(clearEmptyTones) {
            return parts[1].replaceAll("-", "").trim();
        } else{
            return parts[1].trim();
        }
    }

    return null;
}
/** END tone_input_parser**/

/** START tonarten_helper **/
const scalesMapTonartenScientific = {
  // ======================
  // DUR-TONARTEN
  // ======================
  "C-Dur":  ["C4","D4","E4","F4","G4","A4","B4","C5"],

  "G-Dur":  ["G4","A4","B4","C5","D5","E5","F#5","G5"],
  "D-Dur":  ["D4","E4","F#4","G4","A4","B4","C#5","D5"],
  "A-Dur":  ["A4","B4","C#5","D5","E5","F#5","G#5","A5"],
  "E-Dur":  ["E4","F#4","G#4","A4","B4","C#5","D#5","E5"],
  "B-Dur":  ["B4","C#5","D#5","E5","F#5","G#5","A#5","B5"],
  "F#-Dur": ["F#4","G#4","A#4","B4","C#5","D#5","E#5","F#5"],
  "C#-Dur": ["C#4","D#4","E#4","F#4","G#4","A#4","B#4","C#5"],

  "F-Dur":  ["F4","G4","A4","Bb4","C5","D5","E5","F5"],
  "Bb-Dur": ["Bb4","C5","D5","Eb5","F5","G5","A5","Bb5"],
  "Eb-Dur": ["Eb4","F4","G4","Ab4","Bb4","C5","D5","Eb5"],
  "Ab-Dur": ["Ab4","Bb4","C5","Db5","Eb5","F5","G5","Ab5"],
  "Db-Dur": ["Db4","Eb4","F4","Gb4","Ab4","Bb4","C5","Db5"],
  "Gb-Dur": ["Gb4","Ab4","Bb4","Cb5","Db5","Eb5","F5","Gb5"],
  "Cb-Dur": ["Cb4","Db4","Eb4","Fb4","Gb4","Ab4","Bb4","Cb5"],

  // ======================
  // MOLL (natürlich)
  // ======================
  "a-Moll":  ["A4","B4","C5","D5","E5","F5","G5","A5"],
  "e-Moll":  ["E4","F#4","G4","A4","B4","C5","D5","E5"],
  "h-Moll":  ["B4","C#5","D5","E5","F#5","G5","A5","B5"],
  "f#-Moll": ["F#4","G#4","A4","B4","C#5","D5","E5","F#5"],
  "c#-Moll": ["C#4","D#4","E4","F#4","G#4","A4","B4","C#5"],
  "g#-Moll": ["G#4","A#4","B4","C#5","D#5","E5","F#5","G#5"],
  "d#-Moll": ["D#4","E#4","F#4","G#4","A#4","B4","C#5","D#5"],
  "a#-Moll": ["A#4","B#4","C#5","D#5","E#5","F#5","G#5","A#5"],

  "d-Moll":  ["D4","E4","F4","G4","A4","Bb4","C5","D5"],
  "g-Moll":  ["G4","A4","Bb4","C5","D5","Eb5","F5","G5"],
  "c-Moll":  ["C4","D4","Eb4","F4","G4","Ab4","Bb4","C5"],
  "f-Moll":  ["F4","G4","Ab4","Bb4","C5","Db5","Eb5","F5"],
  "bb-Moll": ["Bb4","C5","Db5","Eb5","F5","Gb5","Ab5","Bb5"],
  "eb-Moll": ["Eb4","F4","Gb4","Ab4","Bb4","Cb5","Db5","Eb5"],
  "ab-Moll": ["Ab4","Bb4","Cb5","Db5","Eb5","Fb5","Gb5","Ab5"]
};

const scalesMapTonartenMusikalisch = {
  // ======================
  // DUR-TONARTEN
  // ======================
  "C-Dur":  ["C4","D4","E4","F4","G4","A4","B4","C5"],

  "G-Dur":  ["G4","A4","B4","C5","D5","E5","F#5","G5"],
  "D-Dur":  ["D4","E4","F#4","G4","A4","B4","C#5","D5"],
  "A-Dur":  ["A4","B4","C#5","D5","E5","F#5","G#5","A5"],
  "E-Dur":  ["E4","F#4","G#4","A4","B4","C#5","D#5","E5"],
  "B-Dur":  ["B4","C#5","D#5","E5","F#5","G#5","A#5","B5"],
  "F#-Dur": ["F#4","G#4","A#4","B4","C#5","D#5","E#5","F#5"],
  "C#-Dur": ["C#4","D#4","E#4","F#4","G#4","A#4","B#4","C#5"],

  "F-Dur":  ["F4","G4","A4","Bb4","C5","D5","E5","F5"],
  "Bb-Dur": ["Bb4","C5","D5","Eb5","F5","G5","A5","Bb5"],
  "Eb-Dur": ["Eb4","F4","G4","Ab4","Bb4","C5","D5","Eb5"],
  "Ab-Dur": ["Ab4","Bb4","C5","Db5","Eb5","F5","G5","Ab5"],
  "Db-Dur": ["Db4","Eb4","F4","Gb4","Ab4","Bb4","C5","Db5"],
  "Gb-Dur": ["Gb4","Ab4","Bb4","Cb5","Db5","Eb5","F5","Gb5"],
  "Cb-Dur": ["Cb4","Db4","Eb4","Fb4","Gb4","Ab4","Bb4","Cb5"],

  // ======================
  // MOLL (natürlich)
  // ======================
  "a-Moll":  ["A4","B4","C5","D5","E5","F5","G5","A5"],
  "e-Moll":  ["E4","F#4","G4","A4","B4","C5","D5","E5"],
  "h-Moll":  ["B4","C#5","D5","E5","F#5","G5","A5","B5"],
  "f#-Moll": ["F#4","G#4","A4","B4","C#5","D5","E5","F#5"],
  "c#-Moll": ["C#4","D#4","E4","F#4","G#4","A4","B4","C#5"],
  "g#-Moll": ["G#4","A#4","B4","C#5","D#5","E5","F#5","G#5"],
  "d#-Moll": ["D#4","E#4","F#4","G#4","A#4","B4","C#5","D#5"],
  "a#-Moll": ["A#4","B#4","C#5","D#5","E#5","F#5","G#5","A#5"],

  "d-Moll":  ["D4","E4","F4","G4","A4","Bb4","C5","D5"],
  "g-Moll":  ["G4","A4","Bb4","C5","D5","Eb5","F5","G5"],
  "c-Moll":  ["C4","D4","Eb4","F4","G4","Ab4","Bb4","C5"],
  "f-Moll":  ["F4","G4","Ab4","Bb4","C5","Db5","Eb5","F5"],
  "bb-Moll": ["Bb4","C5","Db5","Eb5","F5","Gb5","Ab5","Bb5"],
  "eb-Moll": ["Eb4","F4","Gb4","Ab4","Bb4","Cb5","Db5","Eb5"],
  "ab-Moll": ["Ab4","Bb4","Cb5","Db5","Eb5","Fb5","Gb5","Ab5"]
};

const helmholtzToScientificPitchMap = {
  // Oktave 2 (großes C)
  "C": "C2",  "C#": "C#2", "Db": "Db2", "D": "D2",  "D#": "D#2", "Eb": "Eb2",
  "E": "E2",  "F": "F2",   "F#": "F#2", "Gb": "Gb2", "G": "G2",  "G#": "G#2",
  "Ab": "Ab2", "A": "A2",  "A#": "A#2", "Bb": "Bb2", "B": "B2",

  // Oktave 3
  "c": "C3",  "cis": "C#3",  "des": "Db3", "d": "D3",  "dis": "D#3",  "es": "Eb3",
  "e": "E3",  "f": "F3",     "fis": "F#3", "ges": "Gb3", "g": "G3",   "gis": "G#3",
  "as": "Ab3","a": "A3",     "ais": "A#3", "b": "Bb3", "h": "B3",

  // Oktave 4
  "c'": "C4",  "cis'": "C#4",  "des'": "Db4", "d'": "D4",  "dis'": "D#4", "es'": "Eb4",
  "e'": "E4",  "f'": "F4",    "fis'": "F#4", "ges'": "Gb4", "g'": "G4",   "gis'": "G#4",
  "as'": "Ab4","a'": "A4",    "ais'": "A#4", "b'": "Bb4", "h'": "B4",

  // Oktave 5
  "c''": "C5", "cis''": "C#5", "des''": "Db5","d''": "D5", "dis''": "D#5","es''": "Eb5",
  "e''": "E5", "f''": "F5",   "fis''": "F#5","ges''": "Gb5","g''": "G5",  "gis''": "G#5",
  "as''": "Ab5","a''": "A5",  "ais''": "A#5","b''": "Bb5","h''": "B5",

  // Oktave 6
  "c'''": "C6", "cis'''": "C#6","des'''": "Db6","d'''": "D6","dis'''": "D#6","es'''": "Eb6",
  "e'''": "E6", "f'''": "F6",  "fis'''": "F#6","ges'''": "Gb6","g'''": "G6","gis'''": "G#6",
  "as'''": "Ab6","a'''": "A6","ais'''": "A#6","b'''": "Bb6","h'''": "B6"
};

const helmholtzToAbcPitchMap = {
  // Oktave 2 (großes C)
  "C": "C,,",   "C#": "^C,,", "Db": "_D,,", "D": "D,,",   "D#": "^D,,", "Eb": "_E,,",
  "E": "E,,",   "F": "F,,",   "F#": "^F,,", "Gb": "_G,,", "G": "G,,",   "G#": "^G,,",
  "Ab": "_A,,", "A": "A,,",   "A#": "^A,,", "Bb": "_B,,", "B": "B,,",

  // Oktave 3
  "c": "C,",    "cis": "^C,",   "des": "_D,", "d": "D,",    "dis": "^D,", "es": "_E,",
  "e": "E,",    "f": "F,",      "fis": "^F,", "ges": "_G,", "g": "G,",    "gis": "^G,",
  "as": "_A,",  "a": "A,",      "ais": "^A,", "b": "_B,",  "h": "B,",

  // Oktave 4 (mittleres C)
  "c'": "C",    "cis'": "^C",   "des'": "_D", "d'": "D",    "dis'": "^D", "es'": "_E",
  "e'": "E",    "f'": "F",      "fis'": "^F", "ges'": "_G", "g'": "G",    "gis'": "^G",
  "as'": "_A",  "a'": "A",      "ais'": "^A", "b'": "_B",  "h'": "B",

  // Oktave 5
  "c''": "c",   "cis''": "^c",  "des''": "_d", "d''": "d",   "dis''": "^d", "es''": "_e",
  "e''": "e",   "f''": "f",     "fis''": "^f", "ges''": "_g", "g''": "g",   "gis''": "^g",
  "as''": "_a", "a''": "a",     "ais''": "^a", "b''": "_b", "h''": "b",

  // Oktave 6
  "c'''": "c'",  "cis'''": "^c'", "des'''": "_d'", "d'''": "d'", "dis'''": "^d'", "es'''": "_e'",
  "e'''": "e'",  "f'''": "f'",    "fis'''": "^f'", "ges'''": "_g'", "g'''": "g'",  "gis'''": "^g'",
  "as'''": "_a'", "a'''": "a'",   "ais'''": "^a'", "b'''": "_b'", "h'''": "b'"
};

const tonartMusikalischToAbcMap = {
  // ======================
  // DUR
  // ======================
  "C-Dur": "C",
  "G-Dur": "G",
  "D-Dur": "D",
  "A-Dur": "A",
  "E-Dur": "E",
  "B-Dur": "B",
  "F#-Dur": "F#",
  "C#-Dur": "C#",

  "F-Dur": "F",
  "Bb-Dur": "Bb",
  "Eb-Dur": "Eb",
  "Ab-Dur": "Ab",
  "Db-Dur": "Db",
  "Gb-Dur": "Gb",
  "Cb-Dur": "Cb",

  // ======================
  // MOLL (natürlich)
  // ======================
  "a-Moll": "Am",
  "e-Moll": "Em",
  "h-Moll": "Bm",
  "f#-Moll": "F#m",
  "c#-Moll": "C#m",
  "g#-Moll": "G#m",
  "d#-Moll": "D#m",
  "a#-Moll": "A#m",

  "d-Moll": "Dm",
  "g-Moll": "Gm",
  "c-Moll": "Cm",
  "f-Moll": "Fm",
  "bb-Moll": "Bbm",
  "eb-Moll": "Ebm",
  "ab-Moll": "Abm"
};

function getCorrectedKeySignature(tonart){
  if(tonart[1] === "s") tonart = tonart[0] + "b" + tonart.substr(2);
  if(tonart.substr(1, 2) === "es") tonart = tonart[0] + "b" + tonart.substr(3);

  return tonart;
}

function getTriadNotes(scalesMap, tonart){
	// Deutsche Notation zu englischer umwandeln, z.B. Es -> Eb
	// if(tonart[1] === "s") tonart = tonart[0] + "b" + tonart.substr(2);
	
	let tones = scalesMap[tonart];
     
	if(!tones || tones.length < 5) {
		return [];
	}
	
    let indices = [0,2,4,2,0]; // Dreiklang + kleine Bewegung
	let result = [];
	indices.forEach((i, idx) => {
		result.push(tones[i]);
	});
	
	return result;
}

function getNotesHelmholz(triadNotesScientific){
	let notes = [];
	triadNotesScientific.forEach(note => {
		notes.push(getHelmholtz(helmholtzToScientificPitchMap, note));
	});
	
	return notes;
}

function getHelmholtz(noteMap, scientific) {
  return Object.keys(noteMap).find(
    key => noteMap[key] === scientific
  );
}

/**
 * Delivers Abc notation tones. if removeAccidental is true, all prefixes ^ or _ for flat and sharp will be removed.
 * @param {*} triadNotesHelmholtz 
 * @param {*} removeAccidental 
 * @returns 
 */
function getAbcNotesFromHelmholtz(triadNotesHelmholtz, removeAccidental){
	let notes = [];
	triadNotesHelmholtz.forEach(note => {
		notes.push(getAbcFromHelmholtz(helmholtzToAbcPitchMap, note, removeAccidental));
	});
	
	return notes;
}

function getAbcFromHelmholtz(noteMap, helmholtzNote, removeAccidental) {
  let abcNote = noteMap[helmholtzNote];
  // console.log("getAbcFromHelmholtz", helmholtzNote, removeAccidental, abcNote)
  if(removeAccidental){
    abcNote = abcNote.replace('^', '');
    abcNote = abcNote.replace('_', '');
  // console.log("getAbcFromHelmholtz 2", helmholtzNote, removeAccidental, abcNote)
  }

  return abcNote;
}

function getNotesScientific(tones, raiseBassTonesOneOctaveHigher = false) {
  const rawNotes = tones.split(/\s+/); // Töne als Array
  return rawNotes.map((n, idx) => {
    const note = n.replace(/[()]/g,''); // Klammern entfernen
    let scientific = helmholtzToScientificPitchMap[note];// || note; // mapping oder unverändert
	  if(raiseBassTonesOneOctaveHigher && scientific && idx > 1){
		  let intValue = parseInt(scientific[scientific.length-1]) + 1;
		  scientific = scientific.substr(0, scientific.length - 1) + intValue;
	  }
    return scientific;
  });
}

function musikalischeTonartToAbc(tonart) {
  const abcKey = tonartMusikalischToAbcMap[tonart];

  if (!abcKey) {
    throw new Error(`Unbekannte Tonart: ${tonart}`);
  }

  return abcKey;
}
/** END tonarten_helper **/

/** START abc_natation_generator **/
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
function getSingleToneNotation(key, abcNotes, title, midiProgramNr){
    let triadLine1 = abcNotes.join('');

    return `T: ${title}
    %%MIDI program ${midiProgramNr}
    L: 1
    K: ${key}
    V: 1
    ${triadLine1}
    `;
}
//"", 0, false, false, true);
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

    if(playNotes && abcNotes){
        // notes
        triadLine1 += abcNotes.slice(0, abcNotes.length - 2).join('');
        if(abcNotes.length > 2){
          for(i=2; i < abcNotes.length; i++){
            triadLine1 += "z";
          }
        }
        triadLine1 += " | ";

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
/** END abc_natation_generator **/
 	
const radioToContainerMap = {
	dreiklang: "abc-triad-container",
	akkorddreiklang: "abc-triadwithaccord-container",
	ton: "abc-notes-container",
	akkordton: "abc-noteswithaccord-container",
	dreiklangton: "abc-triadandnotes-container",
	akkorddreiklangton: "abc-triadandnoteswithaccord-container"
};

let midiBuffer = null;
let audioContext = null;

let abcKammertonObj = null;
let abcNotationTriadObj = null;
let abcNotationTriadWithAccordObj = null;
let abcNotationNotesObj = null;
let abcNotationNotesWithAccordObj = null;
let abcNotationTriadNotesObj = null;
let abcNotationTriadNotesWithAccordObj = null;

let slider = null;

function initTonesModal() {
	console.log("initTonesModal start")

	const tonesModal = document.getElementById("tonesModal");
	const cancelBtn = document.getElementById("cancelPlayTones");

	console.log("initTonesModal document, cancelBtn, tonesModal", document, cancelBtn, tonesModal)
 	
	// Listener für Modal schließen
	cancelBtn.addEventListener("click", () => tonesModal.classList.remove("open"));
	document.addEventListener("keydown", (e) => { if(e.key === "Escape") tonesModal.classList.remove("open"); });

	document.querySelectorAll('input[name="ton_abspielen"]').forEach(radio => {
		radio.addEventListener("change", e => {
		updateVisibleAbcContainer(e.target.value);
		});
	});


	// Listener für Play/Stop Buttons **nur einmal registrieren**
	// Kammerton a
	document.getElementById("playKammerton-btn").addEventListener("click", async () => {
		if(abcKammertonObj) {
			await onAudioContextResumed(abcKammertonObj);
		}
	});


	// Triad
	document.getElementById("abc-triad-play-btn").addEventListener("click", async () => {
		if(abcNotationTriadObj) {
			await onAudioContextResumed(abcNotationTriadObj);
		}
	});
	document.getElementById("abc-triad-stop-btn").addEventListener("click", () => {
		if(midiBuffer) midiBuffer.stop();
	});
	document.getElementById("abc-triadwithaccord-play-btn").addEventListener("click", async () => {
		if(abcNotationTriadWithAccordObj) {
			await onAudioContextResumed(abcNotationTriadWithAccordObj);
		}
	});
	document.getElementById("abc-triadwithaccord-stop-btn").addEventListener("click", () => {
		if(midiBuffer) midiBuffer.stop();
	});

	// Notes
	document.getElementById("abc-notes-play-btn").addEventListener("click", async () => {
		if(abcNotationNotesObj) {
			await onAudioContextResumed(abcNotationNotesObj);
		}
	});
	document.getElementById("abc-notes-stop-btn").addEventListener("click", () => {
		if(midiBuffer) midiBuffer.stop();
	});
	document.getElementById("abc-noteswithaccord-play-btn").addEventListener("click", async () => {
		if(abcNotationNotesWithAccordObj) {
			await onAudioContextResumed(abcNotationNotesWithAccordObj);
		}
	});
	document.getElementById("abc-noteswithaccord-stop-btn").addEventListener("click", () => {
		if(midiBuffer) midiBuffer.stop();
	});

	// Triad and Notes
	document.getElementById("abc-triadandnotes-play-btn").addEventListener("click", async () => {
		if(abcNotationTriadNotesObj) {
			await onAudioContextResumed(abcNotationTriadNotesObj);
		}
	});
	document.getElementById("abc-triadandnotes-stop-btn").addEventListener("click", () => {
		if(midiBuffer) midiBuffer.stop();
	});
	document.getElementById("abc-triadandnoteswithaccord-play-btn").addEventListener("click", async () => {
		if(abcNotationTriadNotesWithAccordObj) {
			await onAudioContextResumed(abcNotationTriadNotesWithAccordObj);
		}
	});
	document.getElementById("abc-triadandnoteswithaccord-stop-btn").addEventListener("click", () => {
		if(midiBuffer) midiBuffer.stop();
	});

	slider = document.getElementById('tempoSlider');
	const display = document.getElementById('tempoValue');

	slider.addEventListener('input', () => {
		display.textContent = slider.value; // live den Wert anzeigen
	});

	console.log("initTonesModal end")
  }

  // Modal öffnen (z.B. von einem Button außerhalb)
function openTonesModal(file_id, tonartString) {
  event.preventDefault(); // verhindert Submit

    console.log("OOOOO openTonesModal start file_id, tonartString", file_id, tonartString);
    if(tonartString){
      tonartString = tonartString.replace(/__/g, '\'');
    }

    console.log("OOOOO openTonesModal file_id, tonartString", file_id, tonartString);
    const songString = tonartString;
    const song = songString.replace(/\([^)]*\)/g, "");
    var keySignature = getKeySignature(song);
    
    const tonartLabel = document.getElementById("tonart-label");
    tonartLabel.textContent = keySignature;
    var tonesUnCleared = getTones(songString);
    var tones = getTones(song, true);
    const tonartToeneLabel = document.getElementById("tonart-toene");
    tonartToeneLabel.textContent = tonesUnCleared;

    let abcNotationTriad = null;
    let abcNotationTriadWithAccord = null;
    let abcNotationNotes = null;
    let abcNotationNotesWithAccord = null;
    let abcNotationTriadAndNotes = null;
    let abcNotationTriadAndNotesWithAccord = null;
    
    abcNotationTriadObj = null;
    abcNotationTriadWithAccordObj = null;
    abcNotationNotesObj = null;
    abcNotationNotesWithAccordObj = null;
    abcNotationTriadNotesObj = null;
    abcNotationTriadNotesWithAccordObj = null;
    let abcTones = null;
    let triadNotes = null;

    try {
      let correctedKeySignature = getCorrectedKeySignature(keySignature);

      console.log("triad Notes keySignature, correctedKeySignature, keySignatureAbc", keySignature, correctedKeySignature);
      let keySignatureAbc = musikalischeTonartToAbc(correctedKeySignature);
      console.log("triad Notes keySignatureAbc", keySignatureAbc);

      triadNotes = getTriadNotes(scalesMapTonartenMusikalisch, correctedKeySignature);
      console.log("triad Notes triadNotes", triadNotes);
      let helm = getNotesHelmholz(triadNotes);
      console.log("triad Notes Helmholtz", helm);
      let triadAbcNotes = getAbcNotesFromHelmholtz(helm, true);
      console.log("triad Tones triadAbcNotes", triadAbcNotes);

      console.log("Tones", tones);
      if(tones){
        let notes = getNotesScientific(tones);
        console.log("Tones scientific", notes);
        let helmTones = getNotesHelmholz(notes);
        console.log("Tones helmNotes", helmTones);
        
        abcTones = getAbcNotesFromHelmholtz(helmTones, true);
        console.log("Tones abcTones", abcTones);
      }

      abcNotationTriad = getTriadNotation(keySignatureAbc, triadAbcNotes, abcTones, "", 0, false, true, false);
      console.log("Tones abcNotationTriad", abcNotationTriad);
      abcNotationTriadWithAccord = getTriadNotation(keySignatureAbc, triadAbcNotes, abcTones, "", 0, true, true, false);
      console.log("Tones abcNotationTriadWithAccord", abcNotationTriadWithAccord);

      abcNotationNotes = getTriadNotation(keySignatureAbc, triadAbcNotes, abcTones, "", 0, false, false, true);
      console.log("Tones abcNotationNotes", abcNotationNotes);
      abcNotationNotesWithAccord = getTriadNotation(keySignatureAbc, triadAbcNotes, abcTones, "", 0, true, false, true);
      console.log("Tones abcNotationNotesWithAccord", abcNotationNotesWithAccord);
    
      abcNotationTriadAndNotes = getTriadNotation(keySignatureAbc, triadAbcNotes, abcTones, "", 0, false, true, true);
      console.log("Tones abcNotationTriadAndNotes", abcNotationTriadAndNotes);
      abcNotationTriadAndNotesWithAccord = getTriadNotation(keySignatureAbc, triadAbcNotes, abcTones, "", 0, true, true, true);
      console.log("Tones abcNotationTriadAndNotesWithAccord", abcNotationTriadAndNotesWithAccord);
    } catch(e) {
      console.log("Exception ", e);
    }

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    let scale1 = 0.6;
    let scale2 = 0.6;
    let scale3 = 0.6;
    if(isMobile){
      scale2 = 0.5;
      scale3 = 0.4;
    }

    if(!triadNotes){
      abcNotationTriad = "";
      abcNotationTriadWithAccord = "";
      abcNotationNotes = "";
      abcNotationNotesWithAccord = "";
      abcNotationTriadAndNotes = "";
      abcNotationTriadAndNotesWithAccord = "";
    } else if(!abcTones){
      abcNotationNotes = "";
      abcNotationNotesWithAccord = "";
      abcNotationTriadAndNotes = "";
      abcNotationTriadAndNotesWithAccord = "";
    }

    abcNotationTriadObj = window.ABCJS.renderAbc("abc-triad-output", abcNotationTriad, { scale: scale1, add_classes: true })[0];
    abcNotationTriadWithAccordObj = window.ABCJS.renderAbc("abc-triadwithaccord-output", abcNotationTriadWithAccord, { scale: scale1 })[0];
    abcNotationNotesObj = window.ABCJS.renderAbc("abc-notes-output", abcNotationNotes, { scale: scale1 })[0];
    abcNotationNotesWithAccordObj = window.ABCJS.renderAbc("abc-noteswithaccord-output", abcNotationNotesWithAccord, { scale: scale1 })[0];
    abcNotationTriadNotesObj = window.ABCJS.renderAbc("abc-triadandnotes-output", abcNotationTriadAndNotes, { scale: scale2 })[0];
    abcNotationTriadNotesWithAccordObj = window.ABCJS.renderAbc("abc-triadandnoteswithaccord-output", abcNotationTriadAndNotesWithAccord, { scale: scale3 })[0];

    let abcKammerton = getSingleToneNotation("C", ["A"], "", 0);
      console.log("Tones abcKammerton", abcKammerton);
    abcKammertonObj = window.ABCJS.renderAbc("abc-kammerton-output", abcKammerton, { scale: 0.6 })[0];

    tonesModal.classList.add("open");

    setTimeout(() => {
      if(!abcTones){
        console.log("DISABLE 1", document.getElementById("akkordUndDreiKlang"))
        document.getElementById("akkordUndDreiKlang").checked = true;
        console.log("DISABLE 2", document.getElementById("akkordUndDreiKlang"))

        document.getElementById("nurTonangabe").disabled = true;
        document.getElementById("akkordUndTonangabe").disabled = true;
        document.getElementById("dreiklangUndTonangabe").disabled = true;
        document.getElementById("akkordDreiklangUndTonangabe").disabled = true;
      } else{
        console.log("Enable 1", document.getElementById("akkordUndDreiKlang"))
        document.getElementById("akkordDreiklangUndTonangabe").checked = true;
        console.log("Enable 2", document.getElementById("akkordUndDreiKlang"))

        document.getElementById("nurTonangabe").disabled = false;
        document.getElementById("akkordUndTonangabe").disabled = false;
        document.getElementById("dreiklangUndTonangabe").disabled = false;
        document.getElementById("akkordDreiklangUndTonangabe").disabled = false;
      }

      console.log("before updateVisibleAbcContainer ");
      let checked = document.querySelector('input[name="ton_abspielen"]:checked');
      updateVisibleAbcContainer(checked.value);
    }, 100);
}

function hideAllAbcContainers() {
	Object.values(radioToContainerMap).forEach(id => {
		const el = document.getElementById(id);
		if (el) el.style.display = "none";
	});
}

function updateVisibleAbcContainer(value) {
	hideAllAbcContainers();

	const containerId = radioToContainerMap[value];
	const container = document.getElementById(containerId);

	if (container) {
	container.style.display = "flex"; // wichtig: du nutzt flex!
	}
}

function closeTonesModal() {
  	document.getElementById('tonesModal').style.display = 'none';
}

function startKammerton() {
  console.log("startKammerton", abcKammertonObj);
  console.trace();    
  if(abcKammertonObj){
    onAudioContextResumed(abcKammertonObj);
  }
}

function unlockAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (audioContext.state === "suspended") {
    const buffer = audioContext.createBuffer(1, 1, 22050);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
    audioContext.resume();
  }
}

function onAudioContextResumed(visualObj) {
  console.log("onAudioContextResumed visulaObj", visualObj);

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    if (!midiBuffer) {
        midiBuffer = new ABCJS.synth.CreateSynth();
    }

    let sliderValue = 40;
    if(slider){
      sliderValue = slider.value;
    }

    midiBuffer.init({
        visualObj: visualObj,
        audioContext: audioContext,
        millisecondsPerMeasure: bpmToMs(sliderValue)
    })
    .then(() => midiBuffer.prime())
    .then(() => midiBuffer.start())
    .catch(console.warn);
}

/**
 * Wandelt BPM (Beats per Minute) in Millisekunden pro Schlag um.
 * @param {number} bpm - Geschwindigkeit in BPM
 * @returns {number} Millisekunden pro Schlag
 */
function bpmToMs(bpm) {
  if (bpm <= 0) return 0; // Sicherheitsabfrage
  return 60000 / bpm;
}

// Modal schließen
function closeTonesModal() {
  tonesModal.classList.remove("open");
}

//   // Abbrechen-Button schließt Modal
//   cancelBtn.addEventListener("click", closeTonesModal);

  // Optional: ESC-Taste
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeTonesModal();
    }
  });

  const initiallyChecked = document.querySelector('input[name="ton_abspielen"]:checked');

  if (initiallyChecked) {
	  updateVisibleAbcContainer(initiallyChecked.value);
  }  
  
function getSelectedSong(){
	const idx = document.getElementById("songSelect").value;
	return songList[idx];
}


window.openTonesModal = openTonesModal;
window.initTonesModal = initTonesModal;