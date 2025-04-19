import { AddCollaboratorIcon, AddImageIcon, TrashIcon, MoreOptionsIcon, PaletteIcon, ReminderBellIcon } from "./Icons.jsx"


export function NoteButtons({ onTrashNote }) {
  return (
    <section className="note-actions-container">

      <button className="note-btn flex align-center justify-center" title="Background options">
        <PaletteIcon />
      </button>

      <button className="note-btn flex align-center justify-center" title="Remind me">
        <ReminderBellIcon />
      </button>

      <button className="note-btn flex align-center justify-center" title="Collaborator">
        <AddCollaboratorIcon />
      </button>

      <button className="note-btn flex align-center justify-center" title="Add image">
        <AddImageIcon />
      </button>

      <button onClick={onTrashNote} className="note-btn flex align-center justify-center" title="Trash note">
        <TrashIcon />
      </button>

      <button className="note-btn flex align-center justify-center" title="More">
        <MoreOptionsIcon />
      </button>

    </section >
  )
}