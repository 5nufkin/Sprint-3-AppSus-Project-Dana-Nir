import { PinIcon } from "../Icons.jsx";
import { NoteButtons } from "../NoteButtons.jsx";

const { useEffect } = React


export function AddNoteExpanded({ addNoteRef, isAddExpanded, newNote, handleChange, addNote, contentInputRef }) {

  useEffect(() => {
    if (isAddExpanded && contentInputRef.current) {
      contentInputRef.current.focus()
    }
  }, [])



  return (
    <section className="add-note-container" ref={addNoteRef}>

      <form>

        <input className="input-title" type="text" name="title" value={newNote.info.title} onChange={handleChange} placeholder="Title" ></input>

        <input ref={contentInputRef} className="input-content expanded" type="text" name="txt" value={newNote.info.txt} onChange={handleChange} placeholder="Take a note..." />

        {newNote.type === 'NoteImg' &&
          <input className="input-url" type="txt" name="url" value={newNote.info.url || ''} onChange={handleChange} placeholder="Enter image url"></input>
        }

        <button className="note-icon-btn note-pin" title="Pin note">
          <PinIcon />
        </button>

        <section className="action-buttons flex align-center space-between">
          <NoteButtons
            className={'add-action-btns'}
          />
          <button className="note-close-btn note-icon-btn" onClick={addNote}>Close</button>
        </section>

      </form>

    </section>
  )
}