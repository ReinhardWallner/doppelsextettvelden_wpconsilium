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
console.log("AFTER catch ");
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

    console.log("before window.ABCJS.renderAbc ", abcNotationTriadNotesObj);
    // if(abcNotationTriad)
      abcNotationTriadObj = window.ABCJS.renderAbc("abc-triad-output", abcNotationTriad, { scale: scale1, add_classes: true })[0];
    // if(abcNotationTriadWithAccord)
      abcNotationTriadWithAccordObj = window.ABCJS.renderAbc("abc-triadwithaccord-output", abcNotationTriadWithAccord, { scale: scale1 })[0];
    // if(abcNotationNotes)
      abcNotationNotesObj = window.ABCJS.renderAbc("abc-notes-output", abcNotationNotes, { scale: scale1 })[0];
    // if(abcNotationNotesWithAccord)
      abcNotationNotesWithAccordObj = window.ABCJS.renderAbc("abc-noteswithaccord-output", abcNotationNotesWithAccord, { scale: scale1 })[0];
    // if(abcNotationTriadAndNotes)
      abcNotationTriadNotesObj = window.ABCJS.renderAbc("abc-triadandnotes-output", abcNotationTriadAndNotes, { scale: scale2 })[0];
    // if(abcNotationTriadAndNotesWithAccord)
      abcNotationTriadNotesWithAccordObj = window.ABCJS.renderAbc("abc-triadandnoteswithaccord-output", abcNotationTriadAndNotesWithAccord, { scale: scale3 })[0];

    let abcKammerton = getSingleToneNotation("C", ["A"], "", 0);
      console.log("Tones abcKammerton", abcKammerton);
    abcKammertonObj = window.ABCJS.renderAbc("abc-kammerton-output", abcKammerton, { scale: 0.6 })[0];

    // midiBuffer = new ABCJS.synth.CreateSynth();
    // audioContext = new AudioContext();
        
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