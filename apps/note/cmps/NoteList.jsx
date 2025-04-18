import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes }) {

  console.log(notes)

  return (
    <section className="notes-container">
      {
        notes.map(note => {
          return (
            <NotePreview key={note.id} note={note} />
          )
        })
      }
    </section>
  )
}