

export function NoteImg({ info }) {
  const { url, title, txt } = info

  return (<React.Fragment>
    <img src={url} alt="" />
    <h2>{title}</h2>
    <p>{txt}</p>
  </React.Fragment>
  )
}