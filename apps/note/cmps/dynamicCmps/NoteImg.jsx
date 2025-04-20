

export function NoteImg({ note }) {
  const { url, title, txt } = note.info

  return (<React.Fragment>
    <img src={url} alt="" />
    <h2>{title}</h2>
    <p>{txt}</p>
  </React.Fragment>
  )
}