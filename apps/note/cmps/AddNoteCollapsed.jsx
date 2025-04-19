import { CheckBoxIcon, DrawIcon, ImageIcon } from "./Icons.jsx";


export function AddNoteCollapsed({ addNoteRef, isAddExpanded, newNote, handleChange, setIsAddExpanded }) {
  return (
    <section className="add-note-container" ref={addNoteRef}>

      <form>
        <input onFocus={() => setIsAddExpanded(true)} className={`input-content  ${isAddExpanded ? 'expanded' : ''}`} type="text" name="txt" value={newNote.info.txt} onChange={handleChange} placeholder="Take a note..." />

        <section className="add-note-input-btns">
          <button type="button" className="note-icon-btn" title="New list">
            <CheckBoxIcon/>
          </button>

          <button type="button" className="note-icon-btn" title="New note with drawing">
            <DrawIcon />
          </button>

          <button type="button" className="note-icon-btn" title="New note with Image">
            <ImageIcon />
          </button>
        </section>
      </form>

    </section>
  )
}