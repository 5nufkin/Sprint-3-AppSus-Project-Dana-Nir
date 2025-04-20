import { DynamicCmp } from "./DynamicCmp.jsx"
import { NoteButtons } from "./NoteButtons.jsx"

const { useState } = React

export function NotePreview({ note, onTrashNote, onToggleTodo, handleColorSelect }) {
  const [cmpType, setCmpType] = useState()


  return (
    <article className="note" style={{ backgroundColor: note.style.backgroundColor }}>
      <DynamicCmp
        note={note}
        onToggleTodo={onToggleTodo}
      />
      <NoteButtons
        onTrashNote={() => onTrashNote(note.id)}
        handleColorSelect={handleColorSelect}
        note={note}
      />
    </article>
  )
}