import { AddNoteCollapsed } from "./AddNoteCollapsed.jsx"
import { AddNoteExpanded } from "./AddNoteExpanded.jsx"
import { NoteImg } from "./dynamicCmps/NoteImg.jsx"
import { NoteTxt } from "./dynamicCmps/NoteTxt.jsx"


export function DynamicCmp(props) {
  if (props.type) {
    switch (props.type) {
      case 'NoteTxt':
        return <NoteTxt {...props} />
      case 'NoteImg':
        return <NoteImg {...props} />
    }
  }

  if (typeof props.isAddExpanded === 'boolean') {
    return props.isAddExpanded
      ? <AddNoteExpanded {...props} />
      : <AddNoteCollapsed {...props} />
  }
}