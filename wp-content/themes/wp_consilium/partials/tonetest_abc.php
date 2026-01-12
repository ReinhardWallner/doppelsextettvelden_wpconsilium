<?php

echo '<div id="tonesModal" class="modal">
  <div class="modal-content">
	<div class="modal-header">
		<span class="modal-title">Tonangabe</span>
		<button class="modal-close" onclick="closeTonesModal()">
			<span class="x-symbol">×</span>
		</button>
	</div>	

	<div class="modal-body">	
		<div>
			<div class="modal-header-container">
				<div class="modal-header-left">
				<b>Tonart:</b> <label id="tonart-label"> </label>
				</div>
				<div class="modal-header-right" style="display: flex; justify-content: flex-end;">
					<div class="player-btn-wrap">
						<button id="playKammerton-btn" class="player-btn" title="Kammerton a (440Hz)" >
							<svg width="10" height="10" viewBox="0 0 10 10" fill="white" xmlns="http://www.w3.org/2000/svg">
								<polygon points="0,0 10,5 0,10"/>
							</svg>
						</button>
					</div>
					<span class="label-text">Kammerton a (440 Hz)</span>
					<div id="abc-kammerton-output" style="display: none;"> </div>					
				</div>
			</div>
			<div class="modal-header-container">
				<b>Tonangabe:</b> <label id="tonart-toene"> </label>
			</div>
		</div>

		<div class="modal-header-container">
			<div class="radio-group modal-header-left2">
				<label class="radio-options" id="label-nurDreiKlang">
					<input type="radio" id="nurDreiKlang" name="ton_abspielen" value="dreiklang">
					<span class="label-text">Nur Dreiklang</span>
				</label>

				<label class="radio-options" id="label-akkordUndDreiKlang">
					<input type="radio" id="akkordUndDreiKlang" name="ton_abspielen" value="akkorddreiklang">
					<span class="label-text">Akkord und Dreiklang</span>
				</label>

				<label class="radio-line" id="label-nurTonangabe">
					<input type="radio" id="nurTonangabe" name="ton_abspielen" value="ton">
					<span class="label-text">Nur Tonangabe</span>
				</label>

				<label class="radio-line" id="label-akkordUndTonangabe">
					<input type="radio" id="akkordUndTonangabe" name="ton_abspielen" value="akkordton">
					<span class="label-text">Akkord und Tonangabe</span>
				</label>		

				<label class="radio-line" id="label-dreiklangUndTonangabe">
					<input type="radio" id="dreiklangUndTonangabe" name="ton_abspielen" value="dreiklangton">
					<span class="label-text">Dreiklang und Tonangabe</span>
				</label>

				<label class="radio-line" id="label-akkordDreiklangUndTonangabe">
					<input type="radio" id="akkordDreiklangUndTonangabe" name="ton_abspielen" value="akkorddreiklangton" checked>
					<span class="label-text">Akkord, Dreiklang und Tonangabe</span>
				</label>		
			</div>
			
			<div class="modal-header-right2">
				<div class="modal-header-bottom">
					<label for="tempoSlider"><b>Tempo:</b> <span id="tempoValue">40</span> BPM</label><br>
					<input type="range" id="tempoSlider" min="20" max="70" value="40" step="1" >
				</div>
			</div>
		</div>

		<div id="abc-triad-container" style="display: flex; align-items: center; gap: 10px;">
			<div id="abc-triad-controls" style="display: flex; flex-direction: column; gap: 5px;">
				<div class="player-btn-wrap">
					<button id="abc-triad-play-btn" class="player-btn" title="Play" >
						<svg width="10" height="10" viewBox="0 0 10 10" fill="white" xmlns="http://www.w3.org/2000/svg">
							<polygon points="0,0 10,5 0,10"/>
						</svg>
					</button>
				</div>
				<div class="player-btn-wrap">
					<button id="abc-triad-stop-btn" class="player-btn" title="Stop" >
						<svg width="8" height="8" viewBox="0 0 8 8" fill="white" xmlns="http://www.w3.org/2000/svg">
							<polygon points="0,0 0,8 8,8 8,0, 0,0"/>
						</svg>
					</button>
				</div>
			</div>
			<div id="abc-triad-output"> </div>
		</div>

		<div id="abc-triadwithaccord-container" style="display: flex; align-items: center; gap: 10px;">
			<div id="abc-triadwithaccord-controls" style="display: flex; flex-direction: flex-direction; gap: 5px;">
				<div class="player-btn-wrap">
					<button id="abc-triadwithaccord-play-btn" class="player-btn" title="Play" >
						<svg width="10" height="10" viewBox="0 0 10 10" fill="white" xmlns="http://www.w3.org/2000/svg">
							<polygon points="0,0 10,5 0,10"/>
						</svg>
					</button>
				</div>
				<div class="player-btn-wrap">
					<button id="abc-triadwithaccord-stop-btn" class="player-btn" title="Stop" >
						<svg width="8" height="8" viewBox="0 0 8 8" fill="white" xmlns="http://www.w3.org/2000/svg">
							<polygon points="0,0 0,8 8,8 8,0, 0,0"/>
						</svg>
					</button>
				</div>
			</div>
			<div id="abc-triadwithaccord-output"></div>
		</div>

		<div id="abc-notes-container" style="display: flex; align-items: center; gap: 10px;">
			<div id="abc-notes-controls" style="display: flex; flex-direction: flex-direction; gap: 5px;">
				<div class="player-btn-wrap">
					<button id="abc-notes-play-btn" class="player-btn" title="Play" >
						<svg width="10" height="10" viewBox="0 0 10 10" fill="white" xmlns="http://www.w3.org/2000/svg">
							<polygon points="0,0 10,5 0,10"/>
						</svg>
					</button>
				</div>
				<div class="player-btn-wrap">
					<button id="abc-notes-stop-btn" class="player-btn" title="Stop" >
						<svg width="8" height="8" viewBox="0 0 8 8" fill="white" xmlns="http://www.w3.org/2000/svg">
							<polygon points="0,0 0,8 8,8 8,0, 0,0"/>
						</svg>
					</button>
				</div>				
			</div>
			<div id="abc-notes-output"> </div>
		</div>

		<div id="abc-noteswithaccord-container" style="display: flex; align-items: center; gap: 10px;">
			<div id="abc-noteswithaccord-controls" style="display: flex; flex-direction: flex-direction; gap: 5px;">
				<div class="player-btn-wrap">
					<button id="abc-noteswithaccord-play-btn" class="player-btn" title="Play" >
						<svg width="10" height="10" viewBox="0 0 10 10" fill="white" xmlns="http://www.w3.org/2000/svg">
							<polygon points="0,0 10,5 0,10"/>
						</svg>
					</button>
				</div>
				<div class="player-btn-wrap">
					<button id="abc-noteswithaccord-stop-btn" class="player-btn" title="Stop" >
						<svg width="8" height="8" viewBox="0 0 8 8" fill="white" xmlns="http://www.w3.org/2000/svg">
							<polygon points="0,0 0,8 8,8 8,0, 0,0"/>
						</svg>
					</button>
				</div>				
			</div>
			<div id="abc-noteswithaccord-output"> </div>
		</div>

		<div id="abc-triadandnotes-container" style="display: flex; align-items: center; gap: 10px;">
			<div id="abc-triadandnotes-controls" style="display: flex; flex-direction: flex-direction; gap: 5px;">
				<div class="player-btn-wrap">
					<button id="abc-triadandnotes-play-btn" class="player-btn" title="Play" >
						<svg width="10" height="10" viewBox="0 0 10 10" fill="white" xmlns="http://www.w3.org/2000/svg">
							<polygon points="0,0 10,5 0,10"/>
						</svg>
					</button>
				</div>
				<div class="player-btn-wrap">
					<button id="abc-triadandnotes-stop-btn" class="player-btn" title="Stop" >
						<svg width="8" height="8" viewBox="0 0 8 8" fill="white" xmlns="http://www.w3.org/2000/svg">
							<polygon points="0,0 0,8 8,8 8,0, 0,0"/>
						</svg>
					</button>
				</div>				
			</div>
			<div id="abc-triadandnotes-output"> </div>
		</div>

		<div id="abc-triadandnoteswithaccord-container" style="display: flex; align-items: center; gap: 10px;">
			<div id="abc-triadandnoteswithaccord-controls" style="display: flex; flex-direction: flex-direction; gap: 5px;">
				<div class="player-btn-wrap">
					<button id="abc-triadandnoteswithaccord-play-btn" class="player-btn" title="Play" >
						<svg width="10" height="10" viewBox="0 0 10 10" fill="white" xmlns="http://www.w3.org/2000/svg">
							<polygon points="0,0 10,5 0,10"/>
						</svg>
					</button>
				</div>
				<div class="player-btn-wrap">
					<button id="abc-triadandnoteswithaccord-stop-btn" class="player-btn" title="Stop" >
						<svg width="8" height="8" viewBox="0 0 8 8" fill="white" xmlns="http://www.w3.org/2000/svg">
							<polygon points="0,0 0,8 8,8 8,0, 0,0"/>
						</svg>
					</button>
				</div>				
			</div>
			<div id="abc-triadandnoteswithaccord-output"> </div>
		</div>	

		<div class="modal-actions" style="display: flex; justify-content: flex-end; margin: 10px;">
			<button id="cancelPlayTones" class="button">Schließen</button>
		</div>
	</div>
  </div>
</div>';

?>