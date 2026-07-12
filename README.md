# ChordLab — Chord Progression Builder

A dependency-free browser web app for building chord progressions, editing MIDI notes in a piano roll, previewing synthesized sounds, importing MIDI files, and exporting Standard MIDI Files.

## Run locally

Open `index.html` directly in a modern browser, or serve the folder with any static web server.

Example:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Features

- Key and scale selection with diatonic chord suggestions
- Triad, seventh-chord, and open-triad voicings
- Roman numeral and harmonic-function analysis
- Editable piano-roll MIDI viewport
- Draw, select, drag, resize, duplicate, and delete notes
- Pitch, start time, duration, and velocity note inspector
- 4-, 8-, and 16-beat sequence lengths
- 40–240 BPM tempo control
- Built-in pad, keys, lead, pluck, and bass synth previews using Web Audio
- Standard MIDI File import with note and tempo parsing
- Standard MIDI File export with tempo, program change, note-on, and note-off events
- Keyboard shortcuts for playback and editing

## Keyboard shortcuts

- `Space`: Play or pause
- `D`: Draw tool
- `V`: Select tool
- `Delete` / `Backspace`: Delete selected notes
- `Ctrl/Cmd + A`: Select all notes
