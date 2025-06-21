import React, { useState, useEffect } from 'react';
import './notes.css';

function Notes() {
  const [note, setNote] = useState('');
  const [savedNotes, setSavedNotes] = useState(() =>
    JSON.parse(localStorage.getItem('notes')) || []
  );

  // ✅ Add Note
  const handleAddNote = () => {
    if (note.trim()) {
      const newNotes = [...savedNotes, note];
      setSavedNotes(newNotes);
      setNote('');
    }
  };

  // ✅ Delete Note
  const deleteNote = (index) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
  };

  // ✅ Save to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(savedNotes));
  }, [savedNotes]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📝 My Notes</h2>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows="10"
        cols="100"
        placeholder="Write your note here..."
        style={{ display: 'block', marginBottom: '1rem' }}
      />
      <button onClick={handleAddNote}>Save Note</button>

      <div className="notes-container" style={{ marginTop: '1rem' }}>
        {savedNotes.map((note, index) => (
          <div key={index} className="note">
            {note}
            <button onClick={() => deleteNote(index)} style={{ marginLeft: '10px' }}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;
