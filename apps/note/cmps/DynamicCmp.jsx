import { NoteImg } from "./dynamicCmps/NoteImg.jsx"
import { NoteTxt } from "./dynamicCmps/NoteTxt.jsx"


export function DynamicCmp(props) {
  switch (props.type) {
    case 'NoteTxt':
      return <NoteTxt {...props} />
    case 'NoteImg':
      return <NoteImg {...props} />
  }
}