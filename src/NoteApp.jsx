import React, { useState } from 'react';
import './NoteApp.css';


const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [editIndex, setEditIndex] = useState(-1);

  const addNote = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      const newNote = {
        title,
        subtitle,
        description,
        date: new Date().toLocaleDateString(),
        image: image ? URL.createObjectURL(image) : null,
      };
      if (editIndex >= 0) {
        const updatedNotes = [...notes];
        updatedNotes[editIndex] = newNote;
        setNotes(updatedNotes);
        setEditIndex(-1);
      } else {
        setNotes([...notes, newNote]);
      }
      setTitle('');
      setSubtitle('');
      setDescription('');
      setDate('');
      setImage(null);
    }
  };

  const handleImageUpload = (e) => {
    const uploadedImage = e.target.files[0];
    setImage(uploadedImage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedImage = e.dataTransfer.files[0];
    setImage(droppedImage);
  };

  const startEditing = (index) => {
    const noteToEdit = notes[index];
    setTitle(noteToEdit.title);
    setSubtitle(noteToEdit.subtitle);
    setDescription(noteToEdit.description);
    setDate(noteToEdit.date);
    setEditIndex(index);
  };

  const deleteNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    if (index === editIndex) {
      setTitle('');
      setSubtitle('');
      setDescription('');
      setDate('');
      setImage(null);
      setEditIndex(-1);
    }
  };

  return (
    <div className="container">
      <h1>Albetre Note Taking App</h1>
      <div className="input-section">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="note-input"
        />
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Subtitle"
          className="note-input"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Full Description"
          className="note-textarea"
          rows={5}
        />
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Date (optional)"
          className="note-input"
        />
        <div
          className="drop-area"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <label htmlFor="fileInput" className="file-label">
            Drag & Drop or Select Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="fileInput"
            className="file-input"
          />
        </div>
        <button onClick={addNote} className="add-button">
          {editIndex >= 0 ? 'Save Note' : 'Add Note'}
        </button>
      </div>
      <div className="note-list">
        {notes.map((note, index) => (
          <div key={index} className="note-item">
            <div className="note-details">
              <h3>{note.title}</h3>
              <p>{note.subtitle}</p>
              <p>{note.description}</p>
              <p>Date: {note.date}</p>
            </div>
            {note.image && <img src={note.image} alt="Note" className="note-image" />}
            <div className="note-actions">
              <button onClick={() => startEditing(index)} className="edit-button">
                Edit
              </button>
              <button onClick={() => deleteNote(index)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteApp;
