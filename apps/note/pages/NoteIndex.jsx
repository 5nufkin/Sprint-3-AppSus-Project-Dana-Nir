import { showErrorMsg } from "../../../services/event-bus.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React

export function NoteIndex() {
  const [notes, setNotes] = useState(null)

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
        showErrorMsg('Could not get notes!')
      })
  }

  if (!notes) return <div>Loading notes...</div>

  return (
    <section className="note-index">
      <NoteList notes={notes} />
    </section>
  )
}
