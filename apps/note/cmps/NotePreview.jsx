import { DynamicCmp } from "./DynamicCmp.jsx"
import { NoteButtons } from "./NoteButtons.jsx"

const { useState } = React

export function NotePreview({ note, onTrashNote, onToggleTodo }) {
  const [cmpType, setCmpType] = useState()


  return (
    <article className="note">
      <DynamicCmp
        note={note}
        onToggleTodo={onToggleTodo}
      />
      <NoteButtons
        onTrashNote={() => onTrashNote(note.id)}
      />
    </article>
  )
}