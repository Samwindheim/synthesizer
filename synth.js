var AudioContext = window.AudioContext ||
  window.webkitAudioContext;

const context = new AudioContext();
const volume = context.createGain();
volume.connect(context.destination);

const volumeControl = document.querySelector('#volume-control')
volume.gain.value = .08;

volumeControl.addEventListener('input', changeVolume);

function changeVolume() {
    volume.gain.value = this.value;
}

const c4_Button = document.querySelector("#C4")
const cSharp_Button = document.querySelector("#Csharp")
const d_Button = document.querySelector("#D")
const dSharp_Button = document.querySelector("#Dsharp")
const e_Button = document.querySelector("#E")
const f_Button = document.querySelector("#F")
const fSharp_Button = document.querySelector("#Fsharp")
const g_Button = document.querySelector("#G")
const gSharp_Button = document.querySelector("#Gsharp")
const a_Button = document.querySelector("#A")
const aSharp_Button = document.querySelector("#Asharp")
const b_Button = document.querySelector("#B")
const c5_Button = document.querySelector("#C5")

const noteButtons = [c4_Button, cSharp_Button, d_Button, dSharp_Button, e_Button, f_Button, fSharp_Button, g_Button, gSharp_Button, a_Button, aSharp_Button, b_Button, c5_Button]

const Notes = [
    { name: "C4", frequency: 261.63 }, // C4
    { name: "C#", frequency: 277.18 }, 
    { name: "D", frequency: 293.66 }, 
    { name: "D#", frequency: 311.13 }, 
    { name: "E", frequency: 329.63 }, 
    { name: "F", frequency: 349.23 }, 
    { name: "F#", frequency: 369.99 },
    { name: "G", frequency: 392.00 }, 
    { name: "G#", frequency: 415.30 }, 
    { name: "A", frequency: 440.00 }, 
    { name: "A#", frequency: 466.16 }, 
    { name: "B", frequency: 493.88 }, 
    { name: "C5", frequency: 523.25 }, // C5
]

for (let i = 0; i <= noteButtons.length; i++) {
    noteButtons[i].addEventListener('click', function() {
        const oscillator = context.createOscillator();
        oscillator.frequency.setValueAtTime(Notes[i].frequency, context.currentTime);
        oscillator.connect(volume);
        oscillator.start(0);
        oscillator.stop(context.currentTime + 1)
        oscillator.type = 'triangle';
        });
}