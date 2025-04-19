import { noteService } from "../services/note.service.js"
import { DynamicCmp } from "./DynamicCmp.jsx"
import { NoteImg } from "./dynamicCmps/NoteImg.jsx"
import { NoteTxt } from "./dynamicCmps/NoteTxt.jsx"
import { NoteButtons } from "./NoteButtons.jsx"

const { useState } = React

export function NotePreview({ note, onTrashNote }) {
  const [cmpType, setCmpType] = useState()





  return (
    <article className="note">
      <DynamicCmp {...note} />
      <NoteButtons
        onTrashNote={() => onTrashNote(note.id)}
      />
    </article>
  )
}