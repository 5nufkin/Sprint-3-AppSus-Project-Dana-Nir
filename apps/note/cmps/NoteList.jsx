import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, onTrashNote }) {

  return (
    <section className="notes-container">
      {
        notes.map(note => {
          return (
            <NotePreview
              key={note.id}
              note={note}
              onTrashNote={onTrashNote}

            />
          )
        })
      }
    </section>
  )
}