import { AddCollaboratorIcon, AddImageIcon, ArchiveNoteIcon, MoreOptionsIcon, PaletteIcon, ReminderBellIcon } from "./Icons.jsx"


export function NoteButtons() {
  return (<section className="note-actions-container">

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

    <button className="note-btn flex align-center justify-center" title="Archive">
      <ArchiveNoteIcon />
    </button>

    <button className="note-btn flex align-center justify-center" title="More">
      <MoreOptionsIcon />
    </button>

  

  </section >
  )
}