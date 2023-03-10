var AudioContext = window.AudioContext ||
  window.webkitAudioContext;

const context = new AudioContext();

const volume = context.createGain();
volume.connect(context.destination);

const volumeControl = document.querySelector('#volume-control')
//const release = document.querySelector('#release')
volume.gain.value = .1;

volumeControl.addEventListener('input', changeVolume);

function changeVolume() {
    volume.gain.value = this.value;
}

// note buttons
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

// notes and their associated frequencies
// I don't ever use the name attribute but just for clarity
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

// params: frequency val, gain val
// returns the lfo
// function tremelo (frequency, gain, wavetype, oscillator, noteGain, tremolo) {
//     tremolo.gain.value = gain;

//     oscillator.connect(tremolo);
//     tremolo.connect(noteGain);

//     const lfo = context.createOscillator();
//     lfo.frequency.value = frequency; // Set the frequency of the LFO to 5 Hz
//     lfo.type = wavetype;

//     return lfo;
// }

// synth functionality
for (let i = 0; i <= Notes.length; i++) {
    window.addEventListener('keydown', function(event) {
        const key = event.key;
        let index;
        let noteLength = 5;
      
        // mapping key letters to notes by associated them with indices
        // is mapped out to have shape of piano on keyboard
        // press a key assigns index to a value for rest of the loop
        // that index corresponds to Notes list to obtain the frequency we want
        switch (key) {
          case 'a':
            index = 0;
            break;
          case 'w':
            index = 1;
            break;
          case 's':
            index = 2;
            break;
          case 'e':
            index = 3;
            break;
          case 'd':
            index = 4;
            break;
          case 'f':
            index = 5;
            break;
          case 't':
            index = 6;
            break;
          case 'g':
            index = 7;
            break;
          case 'y':
            index = 8;
            break;
          case 'h':
            index = 9;
            break;
          case 'u':
            index = 10;
            break;
          case 'j':
            index = 11;
            break;
          case 'k':
            index = 12;
            break;
          default:
            return; // Do nothing if key is not mapped to a note
        }
      
        const oscillator = context.createOscillator();
        

        const noteGain = context.createGain();
        noteGain.gain.value = .1; // note gain starts low, but is countered with attack envelop

        const tremolo = context.createGain();
        //const lfo = tremelo(1, .1, 'sine', oscillator, noteGain, myTremolo);
        
        tremolo.gain.value = .5;

        oscillator.connect(tremolo);
        tremolo.connect(noteGain);
        
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(Notes[index].frequency, context.currentTime); 
  
        // tremelo: down and up in volume quickly
        const lfo = context.createOscillator();
        lfo.frequency.value = 4; // Set the frequency of the LFO to 5 Hz
        lfo.type = 'sine';

        // gain node envelope: adjust these for attack and decay
        //noteGain.gain.linearRampToValueAtTime(.1, context.currentTime); // attack
        noteGain.gain.linearRampToValueAtTime(.0001, context.currentTime + noteLength -.1); // decay
    
  

        // starting and stoppin
        // Start the LFO
        lfo.start(0);
        lfo.stop(context.currentTime + noteLength);  
        oscillator.start(0); 
        oscillator.stop(context.currentTime + noteLength -.001); // start/stop oscillator: adjust stop time for note length

      
        // connect nodes
        //oscillator.connect(tremolo);
        // myTremolo.connect(noteGain); 
        lfo.connect(tremolo.gain); // Connect the LFO to the tremolo gain node
        oscillator.connect(noteGain);      
        noteGain.connect(volume);
      });
}