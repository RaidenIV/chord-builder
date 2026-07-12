(() => {
  "use strict";

  const NOTE_NAMES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];
  const NOTE_NAMES_ASCII = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const KEY_OPTIONS = [
    { label: "C", pc: 0 }, { label: "C♯ / D♭", pc: 1 }, { label: "D", pc: 2 },
    { label: "D♯ / E♭", pc: 3 }, { label: "E", pc: 4 }, { label: "F", pc: 5 },
    { label: "F♯ / G♭", pc: 6 }, { label: "G", pc: 7 }, { label: "G♯ / A♭", pc: 8 },
    { label: "A", pc: 9 }, { label: "A♯ / B♭", pc: 10 }, { label: "B", pc: 11 }
  ];

  const SCALES = {
    major: {
      label: "MAJOR (IONIAN)", shortLabel: "MAJOR", intervals: [0, 2, 4, 5, 7, 9, 11],
      romans: ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
      functions: ["Tonic", "Predominant", "Tonic", "Predominant", "Dominant", "Tonic", "Dominant"]
    },
    minor: {
      label: "NATURAL MINOR", shortLabel: "MINOR", intervals: [0, 2, 3, 5, 7, 8, 10],
      romans: ["i", "ii°", "III", "iv", "v", "VI", "VII"],
      functions: ["Tonic", "Predominant", "Tonic", "Predominant", "Dominant", "Predominant", "Dominant"]
    },
    dorian: {
      label: "DORIAN", shortLabel: "DORIAN", intervals: [0, 2, 3, 5, 7, 9, 10],
      romans: ["i", "ii", "III", "IV", "v", "vi°", "VII"],
      functions: ["Tonic", "Predominant", "Tonic", "Predominant", "Dominant", "Predominant", "Dominant"]
    },
    phrygian: {
      label: "PHRYGIAN", shortLabel: "PHRYGIAN", intervals: [0, 1, 3, 5, 7, 8, 10],
      romans: ["i", "II", "III", "iv", "v°", "VI", "vii"],
      functions: ["Tonic", "Predominant", "Tonic", "Predominant", "Dominant", "Predominant", "Dominant"]
    },
    lydian: {
      label: "LYDIAN", shortLabel: "LYDIAN", intervals: [0, 2, 4, 6, 7, 9, 11],
      romans: ["I", "II", "iii", "iv°", "V", "vi", "vii"],
      functions: ["Tonic", "Predominant", "Tonic", "Predominant", "Dominant", "Tonic", "Dominant"]
    },
    mixolydian: {
      label: "MIXOLYDIAN", shortLabel: "MIXOLYDIAN", intervals: [0, 2, 4, 5, 7, 9, 10],
      romans: ["I", "ii", "iii°", "IV", "v", "vi", "VII"],
      functions: ["Tonic", "Predominant", "Tonic", "Predominant", "Dominant", "Tonic", "Dominant"]
    },
    locrian: {
      label: "LOCRIAN", shortLabel: "LOCRIAN", intervals: [0, 1, 3, 5, 6, 8, 10],
      romans: ["i°", "II", "iii", "iv", "V", "VI", "vii"],
      functions: ["Tonic", "Predominant", "Tonic", "Predominant", "Dominant", "Predominant", "Dominant"]
    },
    harmonicMinor: {
      label: "HARMONIC MINOR", shortLabel: "HARMONIC MINOR", intervals: [0, 2, 3, 5, 7, 8, 11],
      romans: ["i", "ii°", "III+", "iv", "V", "VI", "vii°"],
      functions: ["Tonic", "Predominant", "Tonic", "Predominant", "Dominant", "Predominant", "Dominant"]
    },
    melodicMinor: {
      label: "MELODIC MINOR", shortLabel: "MELODIC MINOR", intervals: [0, 2, 3, 5, 7, 9, 11],
      romans: ["i", "ii", "III+", "IV", "V", "vi°", "vii°"],
      functions: ["Tonic", "Predominant", "Tonic", "Predominant", "Dominant", "Predominant", "Dominant"]
    },
    pentatonicMajor: {
      label: "MAJOR PENTATONIC", shortLabel: "MAJOR PENTATONIC", intervals: [0, 2, 4, 7, 9],
      romans: ["I", "ii", "iii", "V", "vi"],
      functions: ["Tonic", "Predominant", "Tonic", "Dominant", "Tonic"]
    },
    pentatonicMinor: {
      label: "MINOR PENTATONIC", shortLabel: "MINOR PENTATONIC", intervals: [0, 3, 5, 7, 10],
      romans: ["i", "III", "iv", "v", "VII"],
      functions: ["Tonic", "Tonic", "Predominant", "Dominant", "Dominant"]
    }
  };

  const CHORD_QUALITY_NAMES = {
    "0,4,7": "major",
    "0,3,7": "minor",
    "0,3,6": "diminished",
    "0,4,8": "augmented",
    "0,2,7": "suspended 2",
    "0,5,7": "suspended 4",
    "0,4,7,11": "major 7",
    "0,3,7,10": "minor 7",
    "0,4,7,10": "dominant 7",
    "0,3,6,10": "half-diminished 7",
    "0,3,6,9": "diminished 7",
    "0,4,8,11": "augmented major 7"
  };

  const PROGRESSION_CHORD_TYPES = [
    { id: "major", label: "MAJOR", quality: "major", suffix: "", intervals: [0, 4, 7] },
    { id: "minor", label: "MINOR", quality: "minor", suffix: "m", intervals: [0, 3, 7] },
    { id: "diminished", label: "DIMINISHED", quality: "diminished", suffix: "dim", intervals: [0, 3, 6] },
    { id: "augmented", label: "AUGMENTED", quality: "augmented", suffix: "+", intervals: [0, 4, 8] },
    { id: "sus2", label: "SUS 2", quality: "suspended 2", suffix: "sus2", intervals: [0, 2, 7] },
    { id: "sus4", label: "SUS 4", quality: "suspended 4", suffix: "sus4", intervals: [0, 5, 7] },
    { id: "major7", label: "MAJOR 7", quality: "major 7", suffix: "maj7", intervals: [0, 4, 7, 11] },
    { id: "minor7", label: "MINOR 7", quality: "minor 7", suffix: "m7", intervals: [0, 3, 7, 10] },
    { id: "dominant7", label: "DOMINANT 7", quality: "dominant 7", suffix: "7", intervals: [0, 4, 7, 10] },
    { id: "halfDiminished7", label: "HALF-DIM 7", quality: "half-diminished 7", suffix: "m7♭5", intervals: [0, 3, 6, 10] },
    { id: "diminished7", label: "DIMINISHED 7", quality: "diminished 7", suffix: "dim7", intervals: [0, 3, 6, 9] }
  ];

  const ROW_HEIGHT = 18;
  const BEAT_WIDTH = 112;
  const MIN_PITCH = 36;
  const MAX_PITCH = 83;
  const TOTAL_ROWS = MAX_PITCH - MIN_PITCH + 1;
  const QUANTIZE = 0.25;
  const DEFAULT_VELOCITY = 96;
  const DEFAULT_NOTE_DURATION = 1;
  const TICKS_PER_QUARTER = 480;

  const state = {
    keyPc: 0,
    scaleId: "major",
    sound: "pad",
    voicing: "triad",
    tempo: 120,
    lengthBeats: 8,
    notes: [],
    chordEvents: [],
    selectedNoteIds: new Set(),
    insertBeat: 0,
    tool: "select",
    isPlaying: false,
    playStartedAt: 0,
    playFromBeat: 0,
    playAnimationFrame: 0,
    audioContext: null,
    activeAudioNodes: [],
    drag: null,
    metronomeEnabled: false,
    metronomeSubdivision: 1,
    loopEnabled: false,
    viewportMode: "progression",
    progressionDraft: [],
    nextDraftId: 1,
    undoStack: [],
    inspectorEditActive: false,
    nextId: 1
  };

  const elements = {};

  function cacheElements() {
    [
      "playButton", "stopButton", "tempoInput", "metronomeToggle", "metronomeDivision", "lengthSelect", "loopToggle", "importButton", "exportButton", "midiFileInput",
      "keySelect", "scaleSelect", "scaleNotes", "scaleBadge", "soundSelect", "voicingSelect", "insertBeatLabel",
      "chordGrid", "analysisCard", "selectToolButton", "drawToolButton", "undoButton", "deleteButton", "clearButton",
      "midiModeButton", "progressionModeButton", "editorEyebrow", "editorTitle", "midiEditorView", "progressionBuilderView",
      "progressionChordGrid", "progressionBuilderFooter", "timelineRuler", "pianoKeyboard", "pianoRollScroll", "pianoRoll", "gridLayer", "scaleHighlightLayer",
      "chordBandLayer", "noteLayer", "insertCursor", "playhead", "emptyInspector", "noteInspector",
      "selectedNoteName", "selectedNoteMidi", "notePitchInput", "noteStartInput", "noteDurationInput",
      "noteVelocityInput", "velocityOutput", "duplicateNoteButton", "deleteNoteInspectorButton",
      "noteCountStat", "chordCountStat", "rangeStat", "lengthStat", "toastRegion"
    ].forEach((id) => { elements[id] = document.getElementById(id); });
  }

  function init() {
    cacheElements();
    populateSelects();
    bindEvents();
    applyCssMetrics();
    renderAll();
    requestAnimationFrame(() => {
      centerPianoRollOnMiddleC();
      syncKeyboardScroll();
    });
  }

  function populateSelects() {
    elements.keySelect.innerHTML = KEY_OPTIONS.map((key) => `<option value="${key.pc}">${key.label}</option>`).join("");
    elements.keySelect.value = String(state.keyPc);

    elements.scaleSelect.innerHTML = Object.entries(SCALES)
      .map(([id, scale]) => `<option value="${id}">${scale.label}</option>`)
      .join("");
    elements.scaleSelect.value = state.scaleId;

    elements.notePitchInput.innerHTML = Array.from({ length: TOTAL_ROWS }, (_, index) => MAX_PITCH - index)
      .map((pitch) => `<option value="${pitch}">${midiToNoteName(pitch)} — MIDI ${pitch}</option>`)
      .join("");
  }

  function bindEvents() {
    elements.playButton.addEventListener("click", togglePlayback);
    elements.stopButton.addEventListener("click", stopPlayback);
    elements.metronomeToggle.addEventListener("click", () => {
      state.metronomeEnabled = !state.metronomeEnabled;
      renderMetronomeControl();
      if (state.isPlaying) {
        if (!state.metronomeEnabled && state.notes.length === 0) stopPlayback();
        else restartPlaybackAtCurrentPosition();
      }
    });
    elements.metronomeDivision.addEventListener("change", () => {
      state.metronomeSubdivision = Number(elements.metronomeDivision.value) === 0.5 ? 0.5 : 1;
      if (state.isPlaying) restartPlaybackAtCurrentPosition();
    });
    elements.loopToggle.addEventListener("click", () => {
      state.loopEnabled = !state.loopEnabled;
      renderLoopControl();
    });

    document.querySelectorAll("[data-step-target]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.stepTarget);
        const step = Number(button.dataset.step);
        const min = Number(input.min);
        const max = Number(input.max);
        input.value = String(clamp(Number(input.value) + step, min, max));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
    });

    elements.tempoInput.addEventListener("change", () => {
      state.tempo = clamp(Math.round(Number(elements.tempoInput.value) || 120), 40, 240);
      elements.tempoInput.value = String(state.tempo);
      if (state.isPlaying) restartPlaybackAtCurrentPosition();
    });

    elements.lengthSelect.addEventListener("change", () => {
      const newLength = Number(elements.lengthSelect.value);
      if (state.notes.some((note) => note.start >= newLength || note.start + note.duration > newLength)) {
        const confirmed = window.confirm("Notes beyond the new sequence length will be clipped or removed. Continue?");
        if (!confirmed) {
          elements.lengthSelect.value = String(state.lengthBeats);
          return;
        }
      }
      pushUndoState();
      state.lengthBeats = newLength;
      state.notes = state.notes
        .filter((note) => note.start < newLength)
        .map((note) => ({ ...note, duration: Math.max(QUANTIZE, Math.min(note.duration, newLength - note.start)) }));
      state.chordEvents = state.chordEvents
        .filter((chord) => chord.start < newLength)
        .map((chord) => ({ ...chord, duration: Math.min(chord.duration, newLength - chord.start) }));
      state.insertBeat = clamp(state.insertBeat, 0, newLength - QUANTIZE);
      pruneSelection();
      stopPlayback();
      renderAll();
    });

    elements.keySelect.addEventListener("change", () => {
      state.keyPc = Number(elements.keySelect.value);
      renderTheory();
      renderScaleHighlights();
      renderNotes();
      renderAnalysis();
    });

    elements.scaleSelect.addEventListener("change", () => {
      state.scaleId = elements.scaleSelect.value;
      renderTheory();
      renderScaleHighlights();
      renderNotes();
      renderAnalysis();
    });

    elements.soundSelect.addEventListener("change", () => {
      state.sound = elements.soundSelect.value;
      showToast("INSTRUMENT UPDATED", `${elements.soundSelect.options[elements.soundSelect.selectedIndex].text} is active.`);
    });

    elements.voicingSelect.addEventListener("change", () => {
      state.voicing = elements.voicingSelect.value;
      renderChordPalette();
      renderProgressionBuilder();
    });

    elements.selectToolButton.addEventListener("click", () => setTool("select"));
    elements.drawToolButton.addEventListener("click", () => setTool("draw"));
    elements.undoButton.addEventListener("click", undoLastAction);
    elements.midiModeButton.addEventListener("click", () => setViewportMode("midi"));
    elements.progressionModeButton.addEventListener("click", () => setViewportMode("progression"));
    elements.deleteButton.addEventListener("click", deleteSelectedNotes);
    elements.clearButton.addEventListener("click", clearSequence);

    elements.importButton.addEventListener("click", () => elements.midiFileInput.click());
    elements.midiFileInput.addEventListener("change", handleMidiImport);
    elements.exportButton.addEventListener("click", exportMidi);

    elements.pianoRoll.addEventListener("pointerdown", handlePianoRollPointerDown);
    elements.pianoRoll.addEventListener("dblclick", handlePianoRollDoubleClick);
    elements.pianoRoll.addEventListener("click", handlePianoRollClick);
    elements.pianoRoll.addEventListener("contextmenu", (event) => event.preventDefault());
    elements.pianoRollScroll.addEventListener("scroll", syncKeyboardScroll);

    [elements.notePitchInput, elements.noteStartInput, elements.noteDurationInput].forEach((input) => {
      input.addEventListener("change", () => {
        pushUndoState();
        updateSelectedNoteFromInspector();
      });
    });
    const beginVelocityEdit = () => {
      if (state.inspectorEditActive) return;
      pushUndoState();
      state.inspectorEditActive = true;
    };
    elements.noteVelocityInput.addEventListener("pointerdown", beginVelocityEdit);
    elements.noteVelocityInput.addEventListener("keydown", beginVelocityEdit);
    elements.noteVelocityInput.addEventListener("input", () => {
      elements.velocityOutput.value = elements.noteVelocityInput.value;
      updateSelectedNoteFromInspector();
    });
    elements.noteVelocityInput.addEventListener("change", () => { state.inspectorEditActive = false; });
    elements.noteVelocityInput.addEventListener("blur", () => { state.inspectorEditActive = false; });
    elements.duplicateNoteButton.addEventListener("click", duplicateSelectedNote);
    elements.deleteNoteInspectorButton.addEventListener("click", deleteSelectedNotes);

    document.addEventListener("keydown", handleKeyboardShortcuts);
    window.addEventListener("resize", () => {
      applyCssMetrics();
      renderTimeline();
    });
  }

  function applyCssMetrics() {
    const baseBeatWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--beat-width")) || BEAT_WIDTH;
    const availableWidth = elements.pianoRollScroll?.clientWidth || 0;
    state.beatWidth = Math.max(baseBeatWidth, availableWidth > 0 ? availableWidth / state.lengthBeats : baseBeatWidth);
    elements.pianoRoll.style.setProperty("--beat-width", `${state.beatWidth}px`);
    elements.pianoRoll.style.width = `${state.lengthBeats * state.beatWidth}px`;
    elements.pianoRoll.style.height = `${TOTAL_ROWS * ROW_HEIGHT}px`;
  }

  function renderAll() {
    applyCssMetrics();
    renderTheory();
    renderViewportMode();
    renderMetronomeControl();
    renderLoopControl();
    renderUndoState();
    renderTimeline();
    renderKeyboard();
    renderScaleHighlights();
    renderChordBands();
    renderNotes();
    renderInsertCursor();
    renderInspector();
    renderAnalysis();
    renderStats();
  }

  function renderTheory() {
    const scale = getCurrentScale();
    const notes = scale.intervals.map((interval) => NOTE_NAMES[(state.keyPc + interval) % 12]);
    elements.scaleNotes.textContent = notes.join(" · ");
    elements.scaleBadge.textContent = `${NOTE_NAMES[state.keyPc]} ${scale.shortLabel}`;
    renderChordPalette();
    renderProgressionBuilder();
  }

  function renderChordPalette() {
    const chords = buildDiatonicChords();
    elements.chordGrid.innerHTML = "";

    chords.forEach((chord) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "chord-button";
      button.title = `Add ${chord.name} (${chord.noteNames.join(", ")})`;
      button.innerHTML = `
        <span class="chord-degree">${escapeHtml(chord.roman)}</span>
        <span class="chord-info">
          <strong>${escapeHtml(chord.name)}</strong>
          <small>${escapeHtml(chord.noteNames.join(" · "))}</small>
        </span>
        <span class="chord-add" aria-hidden="true">+</span>
      `;
      button.addEventListener("click", () => insertChord(chord));
      elements.chordGrid.appendChild(button);
    });
  }

  function renderProgressionBuilder() {
    const diatonicChords = buildDiatonicChords();
    const scale = getCurrentScale();
    const columns = Array.from({ length: 7 }, (_, degree) => {
      const interval = scale.intervals[degree];
      if (interval === undefined) return null;
      return {
        degree,
        rootPc: (state.keyPc + interval) % 12,
        diatonicChord: diatonicChords[degree] || null
      };
    });
    elements.progressionChordGrid.innerHTML = "";

    columns.forEach((columnData, degree) => {
      const column = document.createElement("section");
      column.className = `progression-chord-column${degree === 0 ? " is-root" : ""}${columnData ? "" : " is-unavailable"}`;
      column.style.setProperty("--column-index", degree);

      if (!columnData) {
        column.innerHTML = `
          <div class="progression-column-header">
            <span class="progression-column-degree">${String(degree + 1).padStart(2, "0")}</span>
            <strong class="progression-root-note">—</strong>
          </div>
          <div class="progression-column-empty">NOT AVAILABLE IN THIS SCALE</div>
        `;
        elements.progressionChordGrid.appendChild(column);
        return;
      }

      const { rootPc, diatonicChord } = columnData;
      const cardList = document.createElement("div");
      cardList.className = "progression-chord-card-list";

      PROGRESSION_CHORD_TYPES.forEach((type, typeIndex) => {
        const chord = buildProgressionChord(rootPc, degree, type, diatonicChord);
        const isDiatonic = Boolean(diatonicChord) && samePitchClassSet(chord.pitchClasses, diatonicChord.pitchClasses);
        const queuedCount = state.progressionDraft.filter((item) =>
          item.rootPc === chord.rootPc && item.quality === chord.quality && item.degree === chord.degree
        ).length;
        const card = document.createElement("button");
        card.type = "button";
        card.className = `progression-chord-card${isDiatonic ? " is-diatonic" : ""}${queuedCount ? " is-selected" : ""}`;
        card.style.setProperty("--card-index", typeIndex);
        card.setAttribute("aria-pressed", String(queuedCount > 0));
        card.title = `Select ${chord.name} for the progression (${chord.noteNames.join(", ")})`;
        card.innerHTML = `
          <span class="progression-card-quality">${escapeHtml(type.label)}</span>
          <span class="progression-card-name">${escapeHtml(chord.name)}</span>
          <span class="progression-card-meta">${escapeHtml(chord.roman)}${isDiatonic ? " · DIATONIC" : ""}</span>
          ${queuedCount ? `<span class="progression-card-count" aria-label="Selected ${queuedCount} ${queuedCount === 1 ? "time" : "times"}">${queuedCount}</span>` : ""}
        `;
        card.addEventListener("click", () => queueProgressionChord(chord));
        cardList.appendChild(card);
      });

      column.innerHTML = `
        <div class="progression-column-header">
          <span class="progression-column-degree">${String(degree + 1).padStart(2, "0")}</span>
          <strong class="progression-root-note">${escapeHtml(NOTE_NAMES[rootPc])}</strong>
          <span class="progression-column-roman">${escapeHtml(scale.romans[degree] || romanNumeral(degree + 1))}</span>
          ${degree === 0 ? '<span class="progression-root-badge">ROOT</span>' : ""}
        </div>
      `;
      column.appendChild(cardList);
      elements.progressionChordGrid.appendChild(column);
    });

    renderProgressionDraft();
  }

  function queueProgressionChord(chord) {
    state.progressionDraft.push({
      ...chord,
      pitchClasses: [...chord.pitchClasses],
      noteNames: [...chord.noteNames],
      draftId: `draft-${state.nextDraftId++}`
    });
    renderProgressionBuilder();
    auditionNotes(getChordPitches(chord), 0.65);
  }

  function renderProgressionDraft() {
    if (state.progressionDraft.length === 0) {
      elements.progressionBuilderFooter.innerHTML = `
        <div class="progression-draft-summary">
          <span class="footer-label">STAGED PROGRESSION</span>
          <span class="empty-progression">Select chord cards to build a progression before adding it to MIDI.</span>
        </div>
        <button class="progression-commit-button" type="button" disabled>ADD TO MIDI</button>
      `;
      return;
    }

    elements.progressionBuilderFooter.innerHTML = `
      <div class="progression-draft-summary">
        <span class="footer-label">STAGED PROGRESSION · ${state.progressionDraft.length}</span>
        <div class="progression-draft-list">
          ${state.progressionDraft.map((chord, index) => `
            <button class="progression-draft-token" type="button" data-draft-id="${escapeHtml(chord.draftId)}" title="Remove ${escapeHtml(chord.name)} from the staged progression">
              <small>${String(index + 1).padStart(2, "0")}</small>
              <strong>${escapeHtml(chord.name)}</strong>
              <span aria-hidden="true">×</span>
            </button>
          `).join("")}
        </div>
      </div>
      <div class="progression-draft-actions">
        <button class="progression-clear-button" type="button">CLEAR</button>
        <button class="progression-commit-button" type="button">ADD TO MIDI</button>
      </div>
    `;

    elements.progressionBuilderFooter.querySelectorAll("[data-draft-id]").forEach((button) => {
      button.addEventListener("click", () => removeProgressionDraftChord(button.dataset.draftId));
    });
    elements.progressionBuilderFooter.querySelector(".progression-clear-button").addEventListener("click", clearProgressionDraft);
    elements.progressionBuilderFooter.querySelector(".progression-commit-button").addEventListener("click", commitProgressionDraft);
  }

  function removeProgressionDraftChord(draftId) {
    state.progressionDraft = state.progressionDraft.filter((chord) => chord.draftId !== draftId);
    renderProgressionBuilder();
  }

  function clearProgressionDraft() {
    state.progressionDraft = [];
    renderProgressionBuilder();
  }

  function commitProgressionDraft() {
    if (state.progressionDraft.length === 0) return;
    const queuedChords = state.progressionDraft.map((chord) => ({
      ...chord,
      pitchClasses: [...chord.pitchClasses],
      noteNames: [...chord.noteNames]
    }));
    pushUndoState();
    queuedChords.forEach((chord) => insertChord(chord, { recordUndo: false, render: false, audition: false }));
    state.progressionDraft = [];
    renderAll();
    showToast("PROGRESSION ADDED", `${queuedChords.length} ${queuedChords.length === 1 ? "chord was" : "chords were"} added to the MIDI sequence.`);
  }

  function buildProgressionChord(rootPc, degree, type, diatonicChord) {
    const pitchClasses = type.intervals.map((interval) => (rootPc + interval) % 12);
    const isDiatonic = Boolean(diatonicChord) && samePitchClassSet(pitchClasses, diatonicChord.pitchClasses);
    return {
      degree,
      rootPc,
      pitchClasses,
      roman: romanForChordType(degree, type.id),
      name: `${NOTE_NAMES[rootPc]}${type.suffix}`,
      quality: type.quality,
      function: isDiatonic ? diatonicChord.function : "Color",
      noteNames: pitchClasses.map((pc) => NOTE_NAMES[pc])
    };
  }

  function samePitchClassSet(a, b) {
    if (a.length !== b.length) return false;
    const left = [...a].sort((x, y) => x - y);
    const right = [...b].sort((x, y) => x - y);
    return left.every((value, index) => value === right[index]);
  }

  function romanForChordType(degree, typeId) {
    const upper = romanNumeral(degree + 1);
    const lower = upper.toLowerCase();
    const labels = {
      major: upper,
      minor: lower,
      diminished: `${lower}°`,
      augmented: `${upper}+`,
      sus2: `${upper}sus2`,
      sus4: `${upper}sus4`,
      major7: `${upper}maj7`,
      minor7: `${lower}7`,
      dominant7: `${upper}7`,
      halfDiminished7: `${lower}ø7`,
      diminished7: `${lower}°7`
    };
    return labels[typeId] || upper;
  }

  function setViewportMode(mode) {
    state.viewportMode = mode === "progression" ? "progression" : "midi";
    renderViewportMode();
    if (state.viewportMode === "midi") {
      requestAnimationFrame(() => {
        applyCssMetrics();
        renderTimeline();
        syncKeyboardScroll();
      });
    }
  }

  function renderViewportMode() {
    const midiMode = state.viewportMode === "midi";
    elements.midiModeButton.setAttribute("aria-pressed", String(midiMode));
    elements.progressionModeButton.setAttribute("aria-pressed", String(!midiMode));
    elements.midiEditorView.hidden = !midiMode;
    elements.progressionBuilderView.hidden = midiMode;
    elements.editorEyebrow.textContent = midiMode ? "MIDI EDITOR" : "HARMONIC WORKSPACE";
    elements.editorTitle.textContent = midiMode ? "PIANO ROLL" : "PROGRESSION BUILDER";
  }

  function renderMetronomeControl() {
    elements.metronomeToggle.setAttribute("aria-pressed", String(state.metronomeEnabled));
    elements.metronomeToggle.querySelector("span").textContent = state.metronomeEnabled ? "ON" : "OFF";
    elements.metronomeDivision.value = String(state.metronomeSubdivision);
  }

  function renderLoopControl() {
    elements.loopToggle.setAttribute("aria-pressed", String(state.loopEnabled));
    elements.loopToggle.querySelector("span").textContent = state.loopEnabled ? "ON" : "OFF";
    elements.loopToggle.title = state.loopEnabled ? "Disable sequence loop" : "Loop sequence playback";
  }

  function buildDiatonicChords() {
    const scale = getCurrentScale();
    const scaleLength = scale.intervals.length;
    const chordSize = state.voicing === "seventh" ? 4 : 3;

    return scale.intervals.map((interval, degree) => {
      const rootPc = (state.keyPc + interval) % 12;
      const pitchClasses = [];
      for (let stack = 0; stack < chordSize; stack += 1) {
        const scaleIndex = (degree + stack * 2) % scaleLength;
        pitchClasses.push((state.keyPc + scale.intervals[scaleIndex]) % 12);
      }

      const normalized = pitchClasses.map((pc) => (pc - rootPc + 12) % 12).sort((a, b) => a - b);
      const quality = CHORD_QUALITY_NAMES[normalized.join(",")] || describeChordQuality(normalized);
      const suffix = qualityToSuffix(quality);
      const noteNames = pitchClasses.map((pc) => NOTE_NAMES[pc]);

      return {
        degree,
        rootPc,
        pitchClasses,
        roman: scale.romans[degree] || romanNumeral(degree + 1),
        name: `${NOTE_NAMES[rootPc]}${suffix}`,
        quality,
        function: scale.functions[degree] || "Color",
        noteNames
      };
    });
  }

  function describeChordQuality(intervals) {
    if (intervals.length === 3) return "triad";
    if (intervals.length === 4) return "seventh";
    return "chord";
  }

  function qualityToSuffix(quality) {
    const map = {
      major: "",
      minor: "m",
      diminished: "dim",
      augmented: "+",
      "suspended 2": "sus2",
      "suspended 4": "sus4",
      "major 7": "maj7",
      "minor 7": "m7",
      "dominant 7": "7",
      "half-diminished 7": "m7♭5",
      "diminished 7": "dim7",
      "augmented major 7": "+maj7",
      triad: "",
      seventh: "7"
    };
    return map[quality] ?? "";
  }

  function insertChord(chord, options = {}) {
    const { recordUndo = true, render = true, audition = true } = options;
    if (recordUndo) pushUndoState();
    const duration = Math.min(1, state.lengthBeats - state.insertBeat);
    if (duration < QUANTIZE) {
      state.insertBeat = 0;
    }

    const start = state.insertBeat;
    const actualDuration = Math.min(1, state.lengthBeats - start);
    const chordPitches = getChordPitches(chord);

    const chordId = `chord-${state.nextId++}`;
    const noteIds = [];
    chordPitches.forEach((pitch) => {
      const note = createNote({
        pitch,
        start,
        duration: actualDuration,
        velocity: DEFAULT_VELOCITY,
        chordId
      });
      state.notes.push(note);
      noteIds.push(note.id);
    });

    state.chordEvents.push({
      id: chordId,
      start,
      duration: actualDuration,
      roman: chord.roman,
      name: chord.name,
      quality: chord.quality,
      function: chord.function,
      degree: chord.degree,
      noteIds
    });

    state.selectedNoteIds = new Set(noteIds);
    state.insertBeat = quantize(Math.min(state.lengthBeats - QUANTIZE, start + actualDuration));
    if (render) renderAll();
    if (audition) auditionNotes(chordPitches, actualDuration * 0.85);
  }

  function getChordPitches(chord) {
    const baseRoot = findPitchAtOrAbove(chord.rootPc, state.sound === "bass" ? 36 : 48);
    let chordPitches = [];
    chord.pitchClasses.forEach((pc, index) => {
      let pitch = findPitchAtOrAbove(pc, baseRoot);
      while (index > 0 && pitch <= chordPitches[index - 1]) pitch += 12;
      chordPitches.push(pitch);
    });

    if (state.voicing === "open" && chordPitches.length >= 3) {
      chordPitches[1] += 12;
      chordPitches.sort((a, b) => a - b);
    }

    while (Math.max(...chordPitches) > MAX_PITCH) {
      chordPitches = chordPitches.map((pitch) => pitch - 12);
    }
    while (Math.min(...chordPitches) < MIN_PITCH) {
      chordPitches = chordPitches.map((pitch) => pitch + 12);
    }
    return chordPitches;
  }

  function findPitchAtOrAbove(pitchClass, minimum) {
    let pitch = minimum;
    while (pitch % 12 !== pitchClass) pitch += 1;
    return pitch;
  }

  function renderTimeline() {
    const width = state.lengthBeats * state.beatWidth;
    elements.pianoRoll.style.width = `${width}px`;
    const inner = document.createElement("div");
    inner.className = "timeline-ruler-inner";
    inner.style.width = `${width}px`;

    for (let beat = 0; beat < state.lengthBeats; beat += 1) {
      const marker = document.createElement("div");
      marker.className = `timeline-beat${beat % 4 === 0 ? " is-bar" : ""}`;
      marker.style.left = `${beat * state.beatWidth}px`;
      marker.style.width = `${state.beatWidth}px`;
      marker.textContent = String(beat + 1);
      inner.appendChild(marker);
    }

    elements.timelineRuler.replaceChildren(inner);
    elements.timelineRuler.scrollLeft = elements.pianoRollScroll.scrollLeft;
  }

  function renderKeyboard() {
    const inner = document.createElement("div");
    inner.className = "piano-keyboard-inner";
    inner.style.height = `${TOTAL_ROWS * ROW_HEIGHT}px`;

    for (let pitch = MAX_PITCH; pitch >= MIN_PITCH; pitch -= 1) {
      const row = MAX_PITCH - pitch;
      const pitchClass = pitch % 12;
      const black = [1, 3, 6, 8, 10].includes(pitchClass);
      const key = document.createElement("div");
      key.className = `piano-key${black ? " black" : ""}${pitchClass === 0 ? " c-note" : ""}`;
      key.style.top = `${row * ROW_HEIGHT}px`;
      if (!black || pitchClass === 0) key.textContent = midiToNoteName(pitch);
      inner.appendChild(key);
    }

    elements.pianoKeyboard.replaceChildren(inner);
    syncKeyboardScroll();
  }

  function renderScaleHighlights() {
    elements.scaleHighlightLayer.innerHTML = "";
    const scalePcs = getScalePitchClasses();

    for (let pitch = MAX_PITCH; pitch >= MIN_PITCH; pitch -= 1) {
      const pc = pitch % 12;
      if (!scalePcs.has(pc)) continue;
      const row = document.createElement("div");
      row.className = `scale-row-highlight${pc === state.keyPc ? " root" : ""}`;
      row.style.top = `${pitchToY(pitch)}px`;
      elements.scaleHighlightLayer.appendChild(row);
    }
  }

  function renderChordBands() {
    elements.chordBandLayer.innerHTML = "";
    state.chordEvents
      .slice()
      .sort((a, b) => a.start - b.start)
      .forEach((chord) => {
        const band = document.createElement("div");
        band.className = "chord-band";
        band.style.left = `${chord.start * state.beatWidth}px`;
        band.style.width = `${chord.duration * state.beatWidth}px`;
        band.innerHTML = `<span class="chord-band-label">${escapeHtml(chord.roman)} · ${escapeHtml(chord.name)}</span>`;
        elements.chordBandLayer.appendChild(band);
      });
  }

  function renderNotes() {
    elements.noteLayer.innerHTML = "";
    const scalePcs = getScalePitchClasses();

    state.notes.forEach((note) => {
      const noteEl = document.createElement("div");
      const selected = state.selectedNoteIds.has(note.id);
      const inScale = scalePcs.has(note.pitch % 12);
      noteEl.className = `midi-note${selected ? " selected" : ""}${inScale ? "" : " out-of-scale"}`;
      noteEl.dataset.noteId = note.id;
      noteEl.style.left = `${note.start * state.beatWidth + 1}px`;
      noteEl.style.top = `${pitchToY(note.pitch) + 1}px`;
      noteEl.style.width = `${Math.max(10, note.duration * state.beatWidth - 2)}px`;
      noteEl.textContent = midiToNoteName(note.pitch);
      noteEl.title = `${midiToNoteName(note.pitch)} · Beat ${formatBeat(note.start)} · ${formatNumber(note.duration)} beat${note.duration === 1 ? "" : "s"} · Velocity ${note.velocity}`;

      const resizeHandle = document.createElement("span");
      resizeHandle.className = "note-resize-handle";
      resizeHandle.dataset.resize = "true";
      noteEl.appendChild(resizeHandle);
      elements.noteLayer.appendChild(noteEl);
    });

    elements.deleteButton.disabled = state.selectedNoteIds.size === 0;
  }

  function renderInsertCursor() {
    elements.insertCursor.style.left = `${state.insertBeat * state.beatWidth}px`;
    elements.insertBeatLabel.textContent = formatBeat(state.insertBeat);
  }

  function renderInspector() {
    const selectedNotes = getSelectedNotes();
    const single = selectedNotes.length === 1 ? selectedNotes[0] : null;
    elements.emptyInspector.hidden = Boolean(single);
    elements.noteInspector.hidden = !single;

    if (!single) {
      if (selectedNotes.length > 1) {
        elements.emptyInspector.querySelector("strong").textContent = `${selectedNotes.length} NOTES SELECTED`;
        elements.emptyInspector.querySelector("p").textContent = "Drag any selected note to move the group, or press Delete to remove all selected notes.";
      } else {
        elements.emptyInspector.querySelector("strong").textContent = "NO NOTE SELECTED";
        elements.emptyInspector.querySelector("p").textContent = "Select a note in the piano roll to edit pitch, timing, duration, and velocity.";
      }
      return;
    }

    elements.selectedNoteName.textContent = midiToNoteName(single.pitch);
    elements.selectedNoteMidi.textContent = `MIDI ${single.pitch}`;
    elements.notePitchInput.value = String(single.pitch);
    elements.noteStartInput.max = String(state.lengthBeats - QUANTIZE);
    elements.noteStartInput.value = formatNumber(single.start);
    elements.noteDurationInput.max = String(state.lengthBeats - single.start);
    elements.noteDurationInput.value = formatNumber(single.duration);
    elements.noteVelocityInput.value = String(single.velocity);
    elements.velocityOutput.value = String(single.velocity);
  }

  function renderAnalysis() {
    const validChordEvents = state.chordEvents
      .filter((chord) => chord.noteIds.some((id) => state.notes.some((note) => note.id === id)))
      .sort((a, b) => a.start - b.start);

    if (validChordEvents.length === 0) {
      elements.analysisCard.innerHTML = `
        <div class="analysis-empty">
          <span class="analysis-icon">Ⅳ</span>
          <p>Add chords to see harmonic function, Roman numeral analysis, and progression guidance.</p>
        </div>
      `;
      return;
    }

    const progression = validChordEvents.map((chord, index) => `
      ${index ? '<span class="progression-arrow">→</span>' : ""}
      <span class="progression-token"><strong>${escapeHtml(chord.roman)}</strong><small>${escapeHtml(chord.name)}</small></span>
    `).join("");

    const functions = validChordEvents.map((chord) => chord.function);
    const uniqueFunctions = [...new Set(functions)];
    const cadence = describeCadence(validChordEvents);
    const guidance = progressionGuidance(validChordEvents);

    elements.analysisCard.innerHTML = `
      <div class="analysis-content">
        <div class="progression-line">${progression}</div>
        <dl class="analysis-details">
          <div class="analysis-detail"><dt>FUNCTIONS</dt><dd>${escapeHtml(uniqueFunctions.join(" · "))}</dd></div>
          <div class="analysis-detail"><dt>CADENCE</dt><dd>${escapeHtml(cadence)}</dd></div>
          <div class="analysis-detail"><dt>GUIDANCE</dt><dd>${escapeHtml(guidance)}</dd></div>
        </dl>
      </div>
    `;
  }

  function describeCadence(chords) {
    if (chords.length < 2) return "Add another chord to reveal the harmonic motion.";
    const last = chords[chords.length - 1];
    const previous = chords[chords.length - 2];
    if (previous.function === "Dominant" && last.degree === 0) return "Strong dominant-to-tonic resolution (authentic cadence).";
    if (previous.degree === 3 && last.degree === 0) return "Predominant-to-tonic motion (plagal color).";
    if (previous.function === "Dominant" && last.degree !== 0) return "Dominant motion avoids tonic, creating a deceptive or unresolved turn.";
    if (last.function === "Dominant") return "The progression ends with tension and invites continuation.";
    if (last.degree === 0) return "The progression returns home to the tonic.";
    return "Open harmonic motion with no conventional final cadence yet.";
  }

  function progressionGuidance(chords) {
    const last = chords[chords.length - 1];
    if (last.function === "Dominant") return "Resolve to the tonic for closure, or move to another tonic-family chord for a softer release.";
    if (last.function === "Predominant") return "A dominant-function chord is a natural next step before returning to the tonic.";
    if (last.degree === 0) return "Move to a predominant chord to create forward motion, or repeat the tonic to establish the key.";
    return "Balance repetition with one contrasting function to make the progression feel intentional.";
  }

  function renderStats() {
    elements.noteCountStat.textContent = String(state.notes.length);
    elements.chordCountStat.textContent = String(state.chordEvents.filter((chord) => chord.noteIds.some((id) => state.notes.some((note) => note.id === id))).length);
    elements.lengthStat.textContent = `${state.lengthBeats} BEATS`;
    if (state.notes.length === 0) {
      elements.rangeStat.textContent = "—";
    } else {
      const pitches = state.notes.map((note) => note.pitch);
      elements.rangeStat.textContent = `${midiToNoteName(Math.min(...pitches))}–${midiToNoteName(Math.max(...pitches))}`;
    }
  }

  function setTool(tool) {
    state.tool = tool;
    elements.selectToolButton.setAttribute("aria-pressed", String(tool === "select"));
    elements.drawToolButton.setAttribute("aria-pressed", String(tool === "draw"));
    elements.pianoRoll.classList.toggle("draw-mode", tool === "draw");
  }

  function handlePianoRollClick(event) {
    if (event.target.closest(".midi-note")) return;
    if (state.drag?.didMove) return;
    const point = eventToRollPoint(event);
    state.insertBeat = clamp(quantize(point.beat), 0, state.lengthBeats - QUANTIZE);
    if (!event.shiftKey) state.selectedNoteIds.clear();
    renderInsertCursor();
    renderProgressionBuilder();
    renderNotes();
    renderInspector();
  }

  function handlePianoRollDoubleClick(event) {
    if (event.target.closest(".midi-note")) return;
    const point = eventToRollPoint(event);
    addNoteAt(point.pitch, point.beat, DEFAULT_NOTE_DURATION);
  }

  function handlePianoRollPointerDown(event) {
    if (event.button !== 0) return;
    const noteEl = event.target.closest(".midi-note");

    if (noteEl) {
      event.preventDefault();
      const noteId = noteEl.dataset.noteId;
      const note = state.notes.find((item) => item.id === noteId);
      if (!note) return;

      if (event.shiftKey) {
        if (state.selectedNoteIds.has(noteId)) state.selectedNoteIds.delete(noteId);
        else state.selectedNoteIds.add(noteId);
      } else if (!state.selectedNoteIds.has(noteId)) {
        state.selectedNoteIds = new Set([noteId]);
      }

      const selectedSnapshot = getSelectedNotes().map((selected) => ({
        id: selected.id,
        start: selected.start,
        pitch: selected.pitch,
        duration: selected.duration
      }));

      state.drag = {
        type: event.target.dataset.resize === "true" ? "resize" : "move",
        pointerId: event.pointerId,
        originX: event.clientX,
        originY: event.clientY,
        selectedSnapshot,
        anchorId: noteId,
        didMove: false
      };

      noteEl.setPointerCapture?.(event.pointerId);
      window.addEventListener("pointermove", handleNotePointerMove);
      window.addEventListener("pointerup", finishNoteDrag, { once: true });
      window.addEventListener("pointercancel", finishNoteDrag, { once: true });
      renderNotes();
      renderInspector();
      return;
    }

    if (state.tool === "draw") {
      event.preventDefault();
      const point = eventToRollPoint(event);
      addNoteAt(point.pitch, point.beat, DEFAULT_NOTE_DURATION);
    }
  }

  function handleNotePointerMove(event) {
    if (!state.drag || event.pointerId !== state.drag.pointerId) return;
    const deltaX = event.clientX - state.drag.originX;
    const deltaY = event.clientY - state.drag.originY;
    if ((Math.abs(deltaX) > 2 || Math.abs(deltaY) > 2) && !state.drag.didMove) {
      pushUndoState();
      state.drag.didMove = true;
    }

    if (state.drag.type === "resize") {
      const beatDelta = quantize(deltaX / state.beatWidth);
      const anchorSnapshot = state.drag.selectedSnapshot.find((item) => item.id === state.drag.anchorId);
      const anchor = state.notes.find((item) => item.id === state.drag.anchorId);
      if (!anchorSnapshot || !anchor) return;
      anchor.duration = clamp(quantize(anchorSnapshot.duration + beatDelta), QUANTIZE, state.lengthBeats - anchor.start);
      syncChordEventForNote(anchor.id);
    } else {
      const beatDelta = quantize(deltaX / state.beatWidth);
      const pitchDelta = -Math.round(deltaY / ROW_HEIGHT);
      const minStart = Math.min(...state.drag.selectedSnapshot.map((item) => item.start));
      const maxEnd = Math.max(...state.drag.selectedSnapshot.map((item) => item.start + item.duration));
      const minPitch = Math.min(...state.drag.selectedSnapshot.map((item) => item.pitch));
      const maxPitch = Math.max(...state.drag.selectedSnapshot.map((item) => item.pitch));
      const clampedBeatDelta = clamp(beatDelta, -minStart, state.lengthBeats - maxEnd);
      const clampedPitchDelta = clamp(pitchDelta, MIN_PITCH - minPitch, MAX_PITCH - maxPitch);

      state.drag.selectedSnapshot.forEach((snapshot) => {
        const note = state.notes.find((item) => item.id === snapshot.id);
        if (!note) return;
        note.start = quantize(snapshot.start + clampedBeatDelta);
        note.pitch = snapshot.pitch + clampedPitchDelta;
      });
      syncChordEventsForSelectedNotes();
    }

    renderNotes();
    renderChordBands();
    renderInspector();
    renderAnalysis();
    renderStats();
  }

  function finishNoteDrag() {
    window.removeEventListener("pointermove", handleNotePointerMove);
    window.removeEventListener("pointerup", finishNoteDrag);
    window.removeEventListener("pointercancel", finishNoteDrag);
    state.drag = null;
    renderAll();
  }

  function syncChordEventsForSelectedNotes() {
    const affectedChordIds = new Set(getSelectedNotes().map((note) => note.chordId).filter(Boolean));
    affectedChordIds.forEach((chordId) => {
      const chord = state.chordEvents.find((item) => item.id === chordId);
      if (!chord) return;
      const chordNotes = state.notes.filter((note) => note.chordId === chordId);
      if (chordNotes.length === 0) return;
      chord.start = Math.min(...chordNotes.map((note) => note.start));
      chord.duration = Math.max(...chordNotes.map((note) => note.start + note.duration)) - chord.start;
    });
  }

  function syncChordEventForNote(noteId) {
    const note = state.notes.find((item) => item.id === noteId);
    if (!note?.chordId) return;
    const chord = state.chordEvents.find((item) => item.id === note.chordId);
    const chordNotes = state.notes.filter((item) => item.chordId === note.chordId);
    if (!chord || chordNotes.length === 0) return;
    chord.start = Math.min(...chordNotes.map((item) => item.start));
    chord.duration = Math.max(...chordNotes.map((item) => item.start + item.duration)) - chord.start;
  }

  function addNoteAt(pitch, beat, duration) {
    pushUndoState();
    const start = clamp(quantize(beat), 0, state.lengthBeats - QUANTIZE);
    const safeDuration = clamp(quantize(duration), QUANTIZE, state.lengthBeats - start);
    const note = createNote({ pitch, start, duration: safeDuration, velocity: DEFAULT_VELOCITY });
    state.notes.push(note);
    state.selectedNoteIds = new Set([note.id]);
    state.insertBeat = start;
    renderAll();
    auditionNotes([pitch], Math.min(safeDuration, 0.7));
  }

  function createNote({ pitch, start, duration, velocity, chordId = null }) {
    return {
      id: `note-${state.nextId++}`,
      pitch: clamp(Math.round(pitch), MIN_PITCH, MAX_PITCH),
      start: clamp(quantize(start), 0, state.lengthBeats - QUANTIZE),
      duration: Math.max(QUANTIZE, quantize(duration)),
      velocity: clamp(Math.round(velocity), 1, 127),
      chordId
    };
  }

  function updateSelectedNoteFromInspector() {
    const selectedNotes = getSelectedNotes();
    if (selectedNotes.length !== 1) return;
    const note = selectedNotes[0];
    note.pitch = clamp(Number(elements.notePitchInput.value), MIN_PITCH, MAX_PITCH);
    note.start = clamp(quantize(Number(elements.noteStartInput.value) || 0), 0, state.lengthBeats - QUANTIZE);
    note.duration = clamp(quantize(Number(elements.noteDurationInput.value) || QUANTIZE), QUANTIZE, state.lengthBeats - note.start);
    note.velocity = clamp(Number(elements.noteVelocityInput.value) || DEFAULT_VELOCITY, 1, 127);
    syncChordEventForNote(note.id);
    renderAll();
  }

  function duplicateSelectedNote() {
    const selectedNotes = getSelectedNotes();
    if (selectedNotes.length !== 1) return;
    pushUndoState();
    const source = selectedNotes[0];
    const newStart = source.start + source.duration <= state.lengthBeats - QUANTIZE
      ? source.start + source.duration
      : Math.max(0, source.start - source.duration);
    const duplicate = createNote({
      pitch: source.pitch,
      start: newStart,
      duration: Math.min(source.duration, state.lengthBeats - newStart),
      velocity: source.velocity
    });
    state.notes.push(duplicate);
    state.selectedNoteIds = new Set([duplicate.id]);
    renderAll();
  }

  function deleteSelectedNotes() {
    if (state.selectedNoteIds.size === 0) return;
    pushUndoState();
    const ids = new Set(state.selectedNoteIds);
    state.notes = state.notes.filter((note) => !ids.has(note.id));
    state.chordEvents = state.chordEvents
      .map((chord) => ({ ...chord, noteIds: chord.noteIds.filter((id) => !ids.has(id)) }))
      .filter((chord) => chord.noteIds.length > 0);
    state.selectedNoteIds.clear();
    renderAll();
  }

  function clearSequence() {
    if (state.notes.length === 0) return;
    if (!window.confirm("Clear every note and chord from the sequence?")) return;
    pushUndoState();
    stopPlayback();
    state.notes = [];
    state.chordEvents = [];
    state.selectedNoteIds.clear();
    state.insertBeat = 0;
    renderAll();
  }

  function snapshotEditorState() {
    return {
      notes: state.notes.map((note) => ({ ...note })),
      chordEvents: state.chordEvents.map((chord) => ({ ...chord, noteIds: [...chord.noteIds] })),
      progressionDraft: state.progressionDraft.map((chord) => ({ ...chord, pitchClasses: [...chord.pitchClasses], noteNames: [...chord.noteNames] })),
      selectedNoteIds: [...state.selectedNoteIds],
      insertBeat: state.insertBeat,
      lengthBeats: state.lengthBeats,
      tempo: state.tempo,
      nextId: state.nextId
    };
  }

  function pushUndoState(snapshot = snapshotEditorState()) {
    state.undoStack.push(snapshot);
    if (state.undoStack.length > 50) state.undoStack.shift();
    renderUndoState();
  }

  function renderUndoState() {
    elements.undoButton.disabled = state.undoStack.length === 0;
  }

  function undoLastAction() {
    const snapshot = state.undoStack.pop();
    if (!snapshot) return;
    stopPlayback();
    state.notes = snapshot.notes.map((note) => ({ ...note }));
    state.chordEvents = snapshot.chordEvents.map((chord) => ({ ...chord, noteIds: [...chord.noteIds] }));
    state.progressionDraft = (snapshot.progressionDraft || []).map((chord) => ({ ...chord, pitchClasses: [...chord.pitchClasses], noteNames: [...chord.noteNames] }));
    state.selectedNoteIds = new Set(snapshot.selectedNoteIds);
    state.insertBeat = snapshot.insertBeat;
    state.lengthBeats = snapshot.lengthBeats;
    state.tempo = snapshot.tempo;
    state.nextId = snapshot.nextId;
    elements.lengthSelect.value = String(state.lengthBeats);
    elements.tempoInput.value = String(state.tempo);
    state.inspectorEditActive = false;
    renderAll();
    showToast("EDIT UNDONE", "The previous sequence edit was restored.");
  }

  function handleKeyboardShortcuts(event) {
    if ((event.ctrlKey || event.metaKey) && !event.shiftKey && event.key.toLowerCase() === "z") {
      event.preventDefault();
      undoLastAction();
      return;
    }

    const tag = event.target.tagName;
    const isEditingField = tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA";
    if (isEditingField) return;

    if (event.code === "Space") {
      event.preventDefault();
      togglePlayback();
    } else if (event.key === "Delete" || event.key === "Backspace") {
      event.preventDefault();
      deleteSelectedNotes();
    } else if (event.key.toLowerCase() === "d") {
      setTool("draw");
    } else if (event.key.toLowerCase() === "v") {
      setTool("select");
    } else if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
      event.preventDefault();
      state.selectedNoteIds = new Set(state.notes.map((note) => note.id));
      renderNotes();
      renderInspector();
    }
  }

  function togglePlayback() {
    if (state.isPlaying) {
      pausePlayback();
    } else {
      startPlayback(state.playFromBeat);
    }
  }

  function startPlayback(fromBeat = 0) {
    if (state.notes.length === 0 && !state.metronomeEnabled) {
      showToast("SEQUENCE EMPTY", "Add a chord or draw a note, or enable the metronome before starting playback.", "error");
      return;
    }

    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
    stopScheduledAudio();

    state.isPlaying = true;
    state.playFromBeat = clamp(fromBeat, 0, state.lengthBeats - QUANTIZE);
    state.playStartedAt = ctx.currentTime;
    const secondsPerBeat = 60 / state.tempo;

    if (state.metronomeEnabled) scheduleMetronome(ctx, state.playFromBeat);

    state.notes.forEach((note) => {
      const noteEnd = note.start + note.duration;
      if (noteEnd <= state.playFromBeat) return;
      const effectiveStartBeat = Math.max(note.start, state.playFromBeat);
      const offsetSeconds = (effectiveStartBeat - state.playFromBeat) * secondsPerBeat;
      const durationSeconds = (noteEnd - effectiveStartBeat) * secondsPerBeat;
      scheduleSynthNote(note.pitch, note.velocity, ctx.currentTime + offsetSeconds, durationSeconds);
    });

    elements.playButton.classList.add("is-playing");
    setPlayButtonIcon(true);
    elements.playButton.setAttribute("aria-label", "Pause sequence");
    elements.playhead.classList.add("visible");
    updatePlayhead();
  }

  function pausePlayback() {
    if (!state.isPlaying) return;
    const elapsed = getAudioContext().currentTime - state.playStartedAt;
    const beatElapsed = elapsed / (60 / state.tempo);
    state.playFromBeat = clamp(state.playFromBeat + beatElapsed, 0, state.lengthBeats - QUANTIZE);
    state.isPlaying = false;
    cancelAnimationFrame(state.playAnimationFrame);
    stopScheduledAudio();
    elements.playButton.classList.remove("is-playing");
    setPlayButtonIcon(false);
    elements.playButton.setAttribute("aria-label", "Play sequence");
  }

  function stopPlayback() {
    state.isPlaying = false;
    state.playFromBeat = 0;
    cancelAnimationFrame(state.playAnimationFrame);
    stopScheduledAudio();
    elements.playButton.classList.remove("is-playing");
    setPlayButtonIcon(false);
    elements.playButton.setAttribute("aria-label", "Play sequence");
    elements.playhead.classList.remove("visible");
    elements.playhead.style.left = "0px";
  }

  function restartPlaybackAtCurrentPosition() {
    if (!state.isPlaying) return;
    const elapsed = getAudioContext().currentTime - state.playStartedAt;
    const currentBeat = clamp(state.playFromBeat + elapsed / (60 / state.tempo), 0, state.lengthBeats - QUANTIZE);
    state.isPlaying = false;
    startPlayback(currentBeat);
  }

  function updatePlayhead() {
    if (!state.isPlaying) return;
    const elapsed = getAudioContext().currentTime - state.playStartedAt;
    const currentBeat = state.playFromBeat + elapsed / (60 / state.tempo);

    if (currentBeat >= state.lengthBeats) {
      if (state.loopEnabled) {
        state.isPlaying = false;
        startPlayback(0);
      } else {
        stopPlayback();
      }
      return;
    }

    elements.playhead.style.left = `${currentBeat * state.beatWidth}px`;
    state.playAnimationFrame = requestAnimationFrame(updatePlayhead);
  }

  function getAudioContext() {
    if (!state.audioContext) {
      state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return state.audioContext;
  }

  function auditionNotes(pitches, durationBeats = 0.7) {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") ctx.resume();
    const duration = durationBeats * (60 / state.tempo);
    pitches.forEach((pitch) => scheduleSynthNote(pitch, DEFAULT_VELOCITY, ctx.currentTime + 0.01, duration));
  }

  function scheduleSynthNote(pitch, velocity, startTime, duration) {
    const ctx = getAudioContext();
    const output = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    const gainScale = velocity / 127;
    const frequency = 440 * (2 ** ((pitch - 69) / 12));
    const preset = getSoundPreset(state.sound);
    const safeDuration = Math.max(0.04, duration);
    const releaseStart = Math.max(startTime + preset.attack + 0.01, startTime + safeDuration - preset.release);
    const endTime = startTime + safeDuration + preset.release + 0.05;

    filter.type = preset.filterType;
    filter.frequency.setValueAtTime(preset.filterStart, startTime);
    filter.frequency.exponentialRampToValueAtTime(Math.max(60, preset.filterEnd), Math.min(endTime, startTime + preset.filterDecay));
    filter.Q.value = preset.q;

    output.gain.setValueAtTime(0.0001, startTime);
    output.gain.exponentialRampToValueAtTime(Math.max(0.0002, preset.level * gainScale), startTime + preset.attack);
    output.gain.exponentialRampToValueAtTime(Math.max(0.0002, preset.sustain * gainScale), Math.min(releaseStart, startTime + preset.attack + preset.decay));
    output.gain.setValueAtTime(Math.max(0.0002, preset.sustain * gainScale), releaseStart);
    output.gain.exponentialRampToValueAtTime(0.0001, endTime);

    filter.connect(output);
    output.connect(ctx.destination);

    const nodes = [];
    preset.oscillators.forEach((oscConfig) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = oscConfig.type;
      osc.frequency.setValueAtTime(frequency * (2 ** (oscConfig.octave / 12)), startTime);
      osc.detune.value = oscConfig.detune;
      oscGain.gain.value = oscConfig.level;
      osc.connect(oscGain);
      oscGain.connect(filter);
      osc.start(startTime);
      osc.stop(endTime + 0.01);
      nodes.push(osc, oscGain);
    });

    if (preset.noise > 0) {
      const bufferSize = Math.ceil(ctx.sampleRate * Math.min(0.18, safeDuration));
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i += 1) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      const noise = ctx.createBufferSource();
      const noiseGain = ctx.createGain();
      noise.buffer = buffer;
      noiseGain.gain.value = preset.noise;
      noise.connect(noiseGain);
      noiseGain.connect(filter);
      noise.start(startTime);
      nodes.push(noise, noiseGain);
    }

    state.activeAudioNodes.push({ nodes: [...nodes, filter, output], endTime });
    window.setTimeout(() => {
      state.activeAudioNodes = state.activeAudioNodes.filter((entry) => entry.endTime !== endTime);
    }, Math.max(0, (endTime - ctx.currentTime) * 1000 + 100));
  }

  function scheduleMetronome(ctx, fromBeat) {
    const secondsPerBeat = 60 / state.tempo;
    const step = state.metronomeSubdivision;
    let clickBeat = Math.ceil((fromBeat - 0.0001) / step) * step;
    while (clickBeat < state.lengthBeats) {
      const offsetSeconds = (clickBeat - fromBeat) * secondsPerBeat;
      const isDownbeat = Math.abs(clickBeat % 4) < 0.0001;
      const isOffbeat = Math.abs(clickBeat % 1) > 0.0001;
      scheduleMetronomeClick(ctx, ctx.currentTime + Math.max(0, offsetSeconds), isDownbeat, isOffbeat);
      clickBeat += step;
    }
  }

  function scheduleMetronomeClick(ctx, startTime, isDownbeat, isOffbeat) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const endTime = startTime + (isDownbeat ? 0.055 : 0.04);
    osc.type = "square";
    osc.frequency.setValueAtTime(isDownbeat ? 1500 : isOffbeat ? 760 : 1050, startTime);
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(isDownbeat ? 0.18 : isOffbeat ? 0.055 : 0.1, startTime + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, endTime);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(endTime + 0.01);
    state.activeAudioNodes.push({ nodes: [osc, gain], endTime });
  }

  function getSoundPreset(sound) {
    const presets = {
      pad: {
        oscillators: [
          { type: "sawtooth", detune: -8, octave: 0, level: 0.34 },
          { type: "sawtooth", detune: 8, octave: 0, level: 0.34 },
          { type: "triangle", detune: 0, octave: -12, level: 0.22 }
        ],
        attack: 0.18, decay: 0.35, sustain: 0.14, release: 0.48, level: 0.22,
        filterType: "lowpass", filterStart: 1400, filterEnd: 420, filterDecay: 1.2, q: 0.8, noise: 0
      },
      keys: {
        oscillators: [
          { type: "sine", detune: 0, octave: 0, level: 0.7 },
          { type: "triangle", detune: 0, octave: 12, level: 0.2 }
        ],
        attack: 0.008, decay: 0.42, sustain: 0.09, release: 0.32, level: 0.28,
        filterType: "lowpass", filterStart: 3000, filterEnd: 780, filterDecay: 0.8, q: 0.4, noise: 0.015
      },
      lead: {
        oscillators: [
          { type: "sawtooth", detune: -5, octave: 0, level: 0.46 },
          { type: "square", detune: 5, octave: 0, level: 0.24 }
        ],
        attack: 0.015, decay: 0.16, sustain: 0.17, release: 0.12, level: 0.24,
        filterType: "lowpass", filterStart: 3600, filterEnd: 1500, filterDecay: 0.5, q: 2.2, noise: 0
      },
      pluck: {
        oscillators: [
          { type: "triangle", detune: 0, octave: 0, level: 0.58 },
          { type: "square", detune: 0, octave: 12, level: 0.12 }
        ],
        attack: 0.004, decay: 0.15, sustain: 0.015, release: 0.13, level: 0.34,
        filterType: "lowpass", filterStart: 5200, filterEnd: 600, filterDecay: 0.26, q: 1.4, noise: 0.025
      },
      bass: {
        oscillators: [
          { type: "sawtooth", detune: 0, octave: -12, level: 0.48 },
          { type: "sine", detune: 0, octave: -12, level: 0.35 }
        ],
        attack: 0.008, decay: 0.18, sustain: 0.18, release: 0.12, level: 0.34,
        filterType: "lowpass", filterStart: 900, filterEnd: 180, filterDecay: 0.45, q: 1.8, noise: 0
      }
    };
    return presets[sound] || presets.pad;
  }

  function stopScheduledAudio() {
    state.activeAudioNodes.forEach(({ nodes }) => {
      nodes.forEach((node) => {
        try { node.stop?.(); } catch (_) { /* node may already be stopped */ }
        try { node.disconnect?.(); } catch (_) { /* ignore disconnected node */ }
      });
    });
    state.activeAudioNodes = [];
  }

  async function handleMidiImport(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    try {
      const buffer = await file.arrayBuffer();
      const imported = parseMidiFile(buffer);
      if (imported.notes.length === 0) throw new Error("No note events were found in this MIDI file.");

      pushUndoState();
      stopPlayback();
      const maxEnd = Math.max(...imported.notes.map((note) => note.start + note.duration));
      state.lengthBeats = maxEnd <= 4 ? 4 : maxEnd <= 8 ? 8 : 16;
      elements.lengthSelect.value = String(state.lengthBeats);
      if (imported.tempo) {
        state.tempo = clamp(Math.round(imported.tempo), 40, 240);
        elements.tempoInput.value = String(state.tempo);
      }

      const pitches = imported.notes.map((note) => note.pitch);
      let octaveShift = 0;
      while (Math.max(...pitches) + octaveShift > MAX_PITCH) octaveShift -= 12;
      while (Math.min(...pitches) + octaveShift < MIN_PITCH) octaveShift += 12;

      state.notes = imported.notes
        .filter((note) => note.start < state.lengthBeats)
        .map((note) => createNote({
          pitch: clamp(note.pitch + octaveShift, MIN_PITCH, MAX_PITCH),
          start: note.start,
          duration: Math.min(note.duration, state.lengthBeats - note.start),
          velocity: note.velocity
        }));
      state.chordEvents = [];
      state.selectedNoteIds.clear();
      state.insertBeat = 0;
      renderAll();
      showToast("MIDI IMPORTED", `${state.notes.length} notes loaded from ${file.name}.`, "success");
    } catch (error) {
      console.error(error);
      showToast("IMPORT FAILED", error.message || "The selected file could not be parsed.", "error");
    }
  }

  function parseMidiFile(arrayBuffer) {
    const view = new DataView(arrayBuffer);
    let offset = 0;

    const readString = (length) => {
      let text = "";
      for (let i = 0; i < length; i += 1) text += String.fromCharCode(view.getUint8(offset + i));
      offset += length;
      return text;
    };
    const readUint32 = () => { const value = view.getUint32(offset); offset += 4; return value; };
    const readUint16 = () => { const value = view.getUint16(offset); offset += 2; return value; };

    if (readString(4) !== "MThd") throw new Error("This is not a valid Standard MIDI File.");
    const headerLength = readUint32();
    if (headerLength < 6) throw new Error("The MIDI header is invalid.");
    const format = readUint16();
    const trackCount = readUint16();
    const division = readUint16();
    offset += headerLength - 6;

    if (division & 0x8000) throw new Error("SMPTE-timed MIDI files are not supported.");
    const ticksPerQuarter = division;
    const allNotes = [];
    const tempos = [];

    for (let trackIndex = 0; trackIndex < trackCount; trackIndex += 1) {
      if (offset + 8 > view.byteLength) break;
      const chunkId = readString(4);
      const chunkLength = readUint32();
      const trackEnd = Math.min(view.byteLength, offset + chunkLength);
      if (chunkId !== "MTrk") {
        offset = trackEnd;
        continue;
      }

      let absoluteTicks = 0;
      let runningStatus = null;
      const activeNotes = new Map();

      const readVariableLength = () => {
        let value = 0;
        let byte;
        let count = 0;
        do {
          if (offset >= trackEnd || count > 3) throw new Error("Invalid variable-length MIDI value.");
          byte = view.getUint8(offset++);
          value = (value << 7) | (byte & 0x7f);
          count += 1;
        } while (byte & 0x80);
        return value;
      };

      while (offset < trackEnd) {
        absoluteTicks += readVariableLength();
        if (offset >= trackEnd) break;

        let status = view.getUint8(offset);
        if (status < 0x80) {
          if (runningStatus === null) throw new Error("Invalid running status in MIDI track.");
          status = runningStatus;
        } else {
          offset += 1;
          if (status < 0xf0) runningStatus = status;
        }

        if (status === 0xff) {
          runningStatus = null;
          if (offset >= trackEnd) break;
          const metaType = view.getUint8(offset++);
          const length = readVariableLength();
          if (metaType === 0x51 && length === 3 && offset + 3 <= trackEnd) {
            const microsecondsPerQuarter = (view.getUint8(offset) << 16) | (view.getUint8(offset + 1) << 8) | view.getUint8(offset + 2);
            tempos.push({ ticks: absoluteTicks, bpm: 60000000 / microsecondsPerQuarter });
          }
          offset = Math.min(trackEnd, offset + length);
          continue;
        }

        if (status === 0xf0 || status === 0xf7) {
          runningStatus = null;
          const length = readVariableLength();
          offset = Math.min(trackEnd, offset + length);
          continue;
        }

        const eventType = status & 0xf0;
        const channel = status & 0x0f;
        const dataLength = (eventType === 0xc0 || eventType === 0xd0) ? 1 : 2;
        if (offset + dataLength > trackEnd) break;
        const data1 = view.getUint8(offset++);
        const data2 = dataLength === 2 ? view.getUint8(offset++) : 0;

        if (eventType === 0x90 && data2 > 0) {
          const key = `${channel}:${data1}`;
          if (!activeNotes.has(key)) activeNotes.set(key, []);
          activeNotes.get(key).push({ startTicks: absoluteTicks, velocity: data2 });
        } else if (eventType === 0x80 || (eventType === 0x90 && data2 === 0)) {
          const key = `${channel}:${data1}`;
          const stack = activeNotes.get(key);
          const started = stack?.shift();
          if (started) {
            allNotes.push({
              pitch: data1,
              start: started.startTicks / ticksPerQuarter,
              duration: Math.max(QUANTIZE, (absoluteTicks - started.startTicks) / ticksPerQuarter),
              velocity: started.velocity,
              track: trackIndex
            });
          }
        }
      }

      offset = trackEnd;
    }

    return {
      format,
      tempo: tempos.sort((a, b) => a.ticks - b.ticks)[0]?.bpm || null,
      notes: allNotes
        .map((note) => ({
          ...note,
          start: quantize(note.start),
          duration: Math.max(QUANTIZE, quantize(note.duration))
        }))
        .sort((a, b) => a.start - b.start || a.pitch - b.pitch)
    };
  }

  function exportMidi() {
    if (state.notes.length === 0) {
      showToast("NOTHING TO EXPORT", "Add at least one note before exporting MIDI.", "error");
      return;
    }

    const trackEvents = [];
    const microsecondsPerQuarter = Math.round(60000000 / state.tempo);
    trackEvents.push({ tick: 0, priority: 0, bytes: [0xff, 0x51, 0x03, (microsecondsPerQuarter >> 16) & 0xff, (microsecondsPerQuarter >> 8) & 0xff, microsecondsPerQuarter & 0xff] });
    trackEvents.push({ tick: 0, priority: 1, bytes: [0xc0, generalMidiProgramForSound(state.sound)] });

    state.notes.forEach((note) => {
      const startTick = Math.round(note.start * TICKS_PER_QUARTER);
      const endTick = Math.round((note.start + note.duration) * TICKS_PER_QUARTER);
      trackEvents.push({ tick: startTick, priority: 2, bytes: [0x90, note.pitch, note.velocity] });
      trackEvents.push({ tick: endTick, priority: 1, bytes: [0x80, note.pitch, 0] });
    });

    trackEvents.sort((a, b) => a.tick - b.tick || a.priority - b.priority);
    const trackData = [];
    let lastTick = 0;
    trackEvents.forEach((event) => {
      trackData.push(...encodeVariableLength(event.tick - lastTick), ...event.bytes);
      lastTick = event.tick;
    });
    trackData.push(0x00, 0xff, 0x2f, 0x00);

    const header = [
      ...asciiBytes("MThd"),
      ...uint32Bytes(6),
      ...uint16Bytes(0),
      ...uint16Bytes(1),
      ...uint16Bytes(TICKS_PER_QUARTER)
    ];
    const track = [
      ...asciiBytes("MTrk"),
      ...uint32Bytes(trackData.length),
      ...trackData
    ];

    const blob = new Blob([new Uint8Array([...header, ...track])], { type: "audio/midi" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `chordlab-${NOTE_NAMES_ASCII[state.keyPc].toLowerCase().replace("#", "sharp")}-${state.scaleId}.mid`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showToast("MIDI EXPORTED", `${state.notes.length} notes exported at ${state.tempo} BPM.`, "success");
  }

  function generalMidiProgramForSound(sound) {
    return {
      pad: 89,
      keys: 4,
      lead: 81,
      pluck: 24,
      bass: 38
    }[sound] ?? 0;
  }

  function encodeVariableLength(value) {
    let buffer = value & 0x7f;
    const bytes = [];
    while ((value >>= 7)) {
      buffer <<= 8;
      buffer |= (value & 0x7f) | 0x80;
    }
    while (true) {
      bytes.push(buffer & 0xff);
      if (buffer & 0x80) buffer >>= 8;
      else break;
    }
    return bytes;
  }

  function asciiBytes(text) {
    return [...text].map((character) => character.charCodeAt(0));
  }

  function uint16Bytes(value) {
    return [(value >> 8) & 0xff, value & 0xff];
  }

  function uint32Bytes(value) {
    return [(value >> 24) & 0xff, (value >> 16) & 0xff, (value >> 8) & 0xff, value & 0xff];
  }

  function eventToRollPoint(event) {
    const rect = elements.pianoRoll.getBoundingClientRect();
    const x = clamp(event.clientX - rect.left, 0, state.lengthBeats * state.beatWidth - 1);
    const y = clamp(event.clientY - rect.top, 0, TOTAL_ROWS * ROW_HEIGHT - 1);
    return {
      beat: x / state.beatWidth,
      pitch: clamp(MAX_PITCH - Math.floor(y / ROW_HEIGHT), MIN_PITCH, MAX_PITCH)
    };
  }

  function centerPianoRollOnMiddleC() {
    const middleCY = pitchToY(60);
    elements.pianoRollScroll.scrollTop = Math.max(0, middleCY - elements.pianoRollScroll.clientHeight / 2);
  }

  function syncKeyboardScroll() {
    const inner = elements.pianoKeyboard.querySelector(".piano-keyboard-inner");
    if (inner) inner.style.transform = `translateY(${-elements.pianoRollScroll.scrollTop}px)`;
    const timelineInner = elements.timelineRuler.querySelector(".timeline-ruler-inner");
    if (timelineInner) timelineInner.style.transform = `translateX(${-elements.pianoRollScroll.scrollLeft}px)`;
  }

  function getCurrentScale() {
    return SCALES[state.scaleId];
  }

  function getScalePitchClasses() {
    return new Set(getCurrentScale().intervals.map((interval) => (state.keyPc + interval) % 12));
  }

  function getSelectedNotes() {
    return state.notes.filter((note) => state.selectedNoteIds.has(note.id));
  }

  function pruneSelection() {
    const validIds = new Set(state.notes.map((note) => note.id));
    state.selectedNoteIds = new Set([...state.selectedNoteIds].filter((id) => validIds.has(id)));
  }

  function pitchToY(pitch) {
    return (MAX_PITCH - pitch) * ROW_HEIGHT;
  }

  function midiToNoteName(pitch) {
    return `${NOTE_NAMES[pitch % 12]}${Math.floor(pitch / 12) - 1}`;
  }

  function formatBeat(beat) {
    const whole = Math.floor(beat);
    const subdivision = Math.round((beat - whole) / QUANTIZE) + 1;
    return `${whole + 1}.${subdivision}`;
  }

  function formatNumber(value) {
    return Number(value.toFixed(2)).toString();
  }

  function quantize(value) {
    return Math.round(value / QUANTIZE) * QUANTIZE;
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function romanNumeral(number) {
    return ["I", "II", "III", "IV", "V", "VI", "VII"][number - 1] || String(number);
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function setPlayButtonIcon(isPlaying) {
    elements.playButton.innerHTML = isPlaying
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  }

  function showToast(title, message, type = "default") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `<div class="toast-content"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(message)}</span></div>`;
    elements.toastRegion.appendChild(toast);
    window.setTimeout(() => toast.remove(), 3600);
  }

  init();
})();
