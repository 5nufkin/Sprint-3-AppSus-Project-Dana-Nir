import { AddCollaboratorIcon, TrashIcon, MoreOptionsIcon, PaletteIcon, AddReminderBellIcon, ImageIcon } from "./Icons.jsx"


export function NoteButtons({ onTrashNote, className = '' }) {
  return (
    <section className={`note-actions-container ${className}`} >

      <button className="note-icon-btn" title="Background options">
        <PaletteIcon />
      </button>

      <button className="note-icon-btn" title="Remind me">
        <AddReminderBellIcon />
      </button>

      <button className="note-icon-btn" title="Collaborator">
        <AddCollaboratorIcon />
      </button>

      <button className="note-icon-btn" title="Add image">
        <ImageIcon />
      </button>

      <button onClick={onTrashNote} className="note-icon-btn" title="Trash note">
        <TrashIcon />
      </button>

      <button className="note-icon-btn" title="More">
        <MoreOptionsIcon />
      </button>

    </section >
  )
}