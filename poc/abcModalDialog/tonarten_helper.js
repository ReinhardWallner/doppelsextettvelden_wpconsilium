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

const abcNoteToPitchMap = {
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

function getTriadNotes(scalesMap, tonart){
	// Deutsche Notation zu englischer umwandeln, z.B. Es -> Eb
	if(tonart[1] === "s") tonart = tonart[0] + "b" + tonart.substr(2);
	
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
		notes.push(getHelmholtz(abcNoteToPitchMap, note));
	});
	
	return notes;
}

function getHelmholtz(noteMap, scientific) {
  return Object.keys(noteMap).find(
    key => noteMap[key] === scientific
  );
}

function getNotesScientific(tones) {
  const rawNotes = tones.split(/\s+/); // Töne als Array
  const outputDiv = document.getElementById("notesOutput");
  outputDiv.innerHTML = "";

  return rawNotes.map((n, idx) => {
    const note = n.replace(/[()]/g,''); // Klammern entfernen
    let scientific = abcNoteToPitchMap[note];// || note; // mapping oder unverändert
	if(scientific && idx > 1){
		let intValue = parseInt(scientific[scientific.length-1]) + 1;
		scientific = scientific.substr(0, scientific.length - 1) + intValue;
		console.log("InVal", intValue);
	}
    return scientific;
  });
}