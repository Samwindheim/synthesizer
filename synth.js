var AudioContext = window.AudioContext ||
  window.webkitAudioContext;

const context = new AudioContext();
const volume = context.createGain();
volume.connect(context.destination);

// simple button to play middle c note
const cButton = document.querySelector("#C")
const volumeControl = document.querySelector('#volume-control')
volume.gain.value = .08;

volumeControl.addEventListener('input', changeVolume);

function changeVolume() {
	volume.gain.value = this.value;
}

cButton.addEventListener('click', function() {
    const oscillator = context.createOscillator();
    oscillator.frequency.setValueAtTime(261.63, 0);
    oscillator.connect(volume);
    oscillator.start(0);
    oscillator.type = 'triangle';
    });

// // list of notes and there associated frequencies
// const Notes = [
//     { name: "C", frequency: 261.63 }, 
//     { name: "C#", frequency: 261.63 }, 
//     { name: "D", frequency: 261.63 }, 
//     { name: "D#", frequency: 261.63 }, 
//     { name: "E", frequency: 261.63 }, 
//     { name: "F", frequency: 261.63 }, 
//     { name: "F#", frequency: 261.63 }, 
//     { name: "G", frequency: 261.63 }, 
//     { name: "G#", frequency: 261.63 }, 
//     { name: "A", frequency: 261.63 }, 
//     { name: "A#", frequency: 261.63 }, 
//     { name: "B", frequency: 261.63 }, 
//     { name: "C", frequency: 261.63 }, 
// ]