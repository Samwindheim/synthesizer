var sound = window.AudioContext ||
  window.webkitAudioContext;
const cxt = new sound();

// volume creation
const volume = cxt.createGain();
volume.connect(cxt.destination);
volume.gain.value = .1;

function frequency(referenceFrequency, distance) {
    return referenceFrequency * 2**(distance/12)
}

let C4 = 261.3

const Notes = [
    { name: "C4", frequency: C4 }, // C4
    { name: "C#", frequency: frequency(C4, 1) }, 
    { name: "D", frequency: frequency(C4, 2) }, 
    { name: "D#", frequency: frequency(C4, 3) }, 
    { name: "E", frequency: frequency(C4, 4) }, 
    { name: "F", frequency: frequency(C4, 5) }, 
    { name: "F#", frequency: frequency(C4, 6) },
    { name: "G", frequency: frequency(C4, 7) }, 
    { name: "G#", frequency: frequency(C4, 8) }, 
    { name: "A", frequency: frequency(C4, 9) }, 
    { name: "A#", frequency: frequency(C4, 10) }, 
    { name: "B", frequency: frequency(C4, 11) }, 
    { name: "C5", frequency: frequency(C4, 12) }, // C5
]

const Wavetypes = [
  { name: "sine"},
  { name: "triangle"},
  { name: "square"}
]

let wavetype;
let noteLength = 2.5;
let attack = 0; // shouldn't be greater than note length
let decay = .001;  // shouldn't be greater than note length
let tremoloDepth = .9; 
let tremeloFrequency = 0;

const waveType_control = document.querySelector('#waveType-control');
waveType_control.addEventListener('input', function() {
  wavetype =  Wavetypes[(this.value)].name;
});

const noteLength_control = document.querySelector('#noteLength-control');
noteLength_control.addEventListener('input', function() {
    noteLength = parseFloat(this.value);
});

const attack_control = document.querySelector('#attack-control');
attack_control.addEventListener('input', function() {
    attack = parseFloat(this.value);
});

const decay_control = document.querySelector('#decay-control');
decay_control.addEventListener('input', function() {
    decay = parseFloat(this.value);
});

const tremolo_control = document.querySelector('#tremolo-control');
tremolo_control.addEventListener('input', function() {
  tremeloFrequency = parseFloat(this.value);
});

// synth functionality
for (let i = 0; i <= Notes.length; i++) {
    window.addEventListener('keydown', function(event) {
        const key = event.key;
        let index;
        //let noteLength = length;
      
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

      
        // main note oscillator
        const osc = cxt.createOscillator();
        
        // main note gain node
        const noteVolume = cxt.createGain();
        noteVolume.gain.value = .001; // note gain starts low, but is countered with attack envelop

        // setting wavetype and pitch of note
        osc.type = wavetype; // ex: 'sine' or 'triangle'
        osc.frequency.setValueAtTime(Notes[index].frequency, cxt.currentTime); 
  
        // tremolo: down and up in volume effect
        const tremolo = cxt.createGain();  // tremolo gain node
        tremolo.gain.value = tremoloDepth; // depth of volume to tremolo
        const lfo = cxt.createOscillator(); // oscillator for tremolo

        lfo.frequency.value = tremeloFrequency; // Set the frequency of the LFO to 5 Hz
        lfo.type = 'sine';

        // gain node envelope: adjust these for attack and decay
        noteVolume.gain.exponentialRampToValueAtTime(volume.gain.value, cxt.currentTime + attack); // attack
        noteVolume.gain.exponentialRampToValueAtTime(.0001, cxt.currentTime + noteLength - decay); // decay
    
  
        // starting and stopping oscillators
        // Start the LFO
        lfo.start(0);
        lfo.stop(cxt.currentTime + noteLength);  
        osc.start(0); 
        osc.stop(cxt.currentTime + noteLength -.001); // start/stop oscillator: adjust stop time for note length

      
        // connect nodes     
        osc.connect(tremolo);
        tremolo.connect(noteVolume);
        lfo.connect(tremolo.gain); // Connect the LFO to the tremolo gain node
        
        osc.connect(noteVolume);      
        noteVolume.connect(volume);
      });
}
