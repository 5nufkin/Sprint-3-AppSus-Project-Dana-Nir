import { useToggle } from "../../../custom hooks/useToggle.js"
import { ColorPicker } from "./ColorPicker.jsx"
import { AddCollaboratorIcon, TrashIcon, MoreOptionsIcon, PaletteIcon, AddReminderBellIcon, ImageIcon } from "./Icons.jsx"


export function NoteButtons({ onTrashNote, className = '', handleColorSelect, note }) {
  const [isColorPickerOpen, toggleIsColorPickerOpen] = useToggle(false)

  return (
    <section className={`note-actions-container ${className}`} >

      <div className="btn-color-palette-container">
        <button onClick={() => toggleIsColorPickerOpen()} className="note-icon-btn" title="Background options">
          <PaletteIcon />
        </button>

        {isColorPickerOpen && (
          <ColorPicker
            onSelectColor={handleColorSelect}
            note={note}
          />
        )}
      </div>

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