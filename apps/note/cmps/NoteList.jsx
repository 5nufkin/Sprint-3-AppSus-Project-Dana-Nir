import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, onTrashNote, onToggleTodo }) {

  return (
    <section className="notes-container">
      {
        notes.map(note => {
          return (
            <NotePreview
              key={note.id}
              note={note}
              onTrashNote={onTrashNote}
              onToggleTodo={onToggleTodo}
            />
          )
        })
      }
    </section>
  )
}