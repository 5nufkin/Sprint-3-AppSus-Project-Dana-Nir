import { DynamicCmp } from "./DynamicCmp.jsx";

const { useEffect, useRef } = React

export function AddNote({ newNote, handleChange, addNote, isAddExpanded, setIsAddExpanded, setNoteType }) {
  const addNoteRef = useRef()
  const contentInputRef = useRef()

  useEffect(() => {
    function handleClickOutside(ev) {
      if (addNoteRef.current && !addNoteRef.current.contains(ev.target)) {
        setIsAddExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <DynamicCmp
      {...{
        newNote,
        handleChange,
        addNote,
        isAddExpanded,
        setIsAddExpanded,
        addNoteRef,
        contentInputRef,
        setNoteType,
      }}
    />
  )
}

