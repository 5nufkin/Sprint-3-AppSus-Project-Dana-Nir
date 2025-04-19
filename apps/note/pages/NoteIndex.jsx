import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { AddNote } from "../cmps/AddNote.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState(noteService.getEmptyNote())

  useEffect(() => {
    loadNotes()
  }, [])

  function loadNotes() {
    noteService.query()
      .then(notes => {
        setNotes(notes)
      })
      .catch(err => {
        console.log('err:', err)
        showErrorMsg('Error! Could not get notes.')
      })
  }

  function handleChange({ target }) {
    let { value, name: field, type } = target

    setNewNote(prevNote => ({ ...prevNote, info: { ...prevNote.info, [field]: value } }))
  }

  function addNote(ev) {
    ev.preventDefault()
    const noteToSave = { ...newNote, createdAt: Date.now() }
    noteService.save(noteToSave)
      .then(note => {
        setNotes(prevNotes => [note, ...prevNotes])
        showSuccessMsg('Note added successfully.')
        setNewNote(noteService.getEmptyNote())
      })
      .catch(err => {
        console.log('err', err)
        showErrorMsg('Error! Could not save note.')
      })
  }

  function onTrashNote(noteId) {
    noteService.remove(noteId)
      .then(() => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
        showSuccessMsg('Note trashed')
      })
      .catch(err => {
        console.log('err', err)
        showErrorMsg('Error! Could not trash note.')
      })
  }

  if (!notes) return <div>Loading notes...</div>

  return (
    <section className="note-index">
      <AddNote
        newNote={newNote}
        handleChange={handleChange}
        addNote={addNote} />

      <NoteList
        notes={notes}
        onTrashNote={onTrashNote}
      />
    </section>
  )
}
