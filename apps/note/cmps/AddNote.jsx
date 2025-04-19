

export function AddNote({ newNote, handleChange, addNote }) {

  return (
    <section className="add-note-container">
    <form>
      <input className="add-note-input" type="text" name="txt" value={newNote.info.txt} onChange={handleChange} placeholder="Take a note..." />
      <button onClick={addNote}>Add note</button>
    </form>
    </section>
  )
}