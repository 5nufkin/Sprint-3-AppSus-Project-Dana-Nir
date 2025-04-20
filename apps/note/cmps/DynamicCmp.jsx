import { AddNoteCollapsed } from "./dynamicCmps/AddNoteCollapsed.jsx"
import { AddNoteExpanded } from "./dynamicCmps/AddNoteExpanded.jsx"
import { NoteImg } from "./dynamicCmps/NoteImg.jsx"
import { NoteTodos } from "./dynamicCmps/NoteTodos.jsx"
import { NoteTxt } from "./dynamicCmps/NoteTxt.jsx"


export function DynamicCmp(props) {

  if (props.note) {
    switch (props.note.type) {
      case 'NoteTxt':
        return <NoteTxt {...props} />
      case 'NoteImg':
        return <NoteImg {...props} />
      case 'NoteTodos':
        return <NoteTodos {...props} />
    }
  }

  if (typeof props.isAddExpanded === 'boolean') {
    return props.isAddExpanded
      ? <AddNoteExpanded {...props} />
      : <AddNoteCollapsed {...props} />
  }
}