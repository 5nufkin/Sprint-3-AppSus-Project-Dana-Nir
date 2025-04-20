import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { AddNote } from "../cmps/AddNote.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { SideBar } from "../cmps/SideBar.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState(noteService.getEmptyNote())
  const [isAddExpanded, setIsAddExpanded] = useState(false)

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
    setIsAddExpanded(false)
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

  function onToggleTodo(noteId, todoIdx) {
    const updatedNotes = notes.map(note => {
      if (note.id !== noteId) return note

      const updatedTodos = note.info.todos.map((todo, idx) =>
        idx === todoIdx
          ? { ...todo, doneAt: todo.doneAt ? null : Date.now() }
          : todo
      )

      return {
        ...note,
        info: {
          ...note.info,
          todos: updatedTodos
        }
      }
    })

    const updatedNote = updatedNotes.find(note => note.id === noteId)

    noteService.save(updatedNote)
      .then(() => setNotes(updatedNotes))
      .catch(err => console.log('err', err))
  }

  function setNoteType(type) {
    setNewNote(noteService.getEmptyNote(type))
    setIsAddExpanded(true)
  }

  function handleColorSelect(colorCode, noteId) {
    const notesCopy = notes.slice()
    const noteToUpdate = notesCopy.find(note => note.id === noteId)

    noteToUpdate.style.backgroundColor = colorCode

    noteService.save(noteToUpdate)
      .then(() => setNotes(notesCopy))
      .catch(err => {
        console.log('err', err)
        showErrorMsg('Error! Could not update note.')
      })
  }

  if (!notes) return <div>Loading notes...</div>

  return (
    <section className="note-index">
      <SideBar />

      <AddNote
        newNote={newNote}
        handleChange={handleChange}
        addNote={addNote}
        isAddExpanded={isAddExpanded}
        setIsAddExpanded={setIsAddExpanded}
        setNoteType={setNoteType}
      />

      <NoteList
        notes={notes}
        onTrashNote={onTrashNote}
        onToggleTodo={onToggleTodo}
        handleColorSelect={handleColorSelect}
      />
    </section>
  )
}
