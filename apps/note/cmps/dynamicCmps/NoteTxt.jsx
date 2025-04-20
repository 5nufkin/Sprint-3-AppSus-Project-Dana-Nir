

export function NoteTxt({ note }) {
  const { info } = note
  
  return (
    <React.Fragment>
      <h2>{info.title}</h2>
      <p>{info.txt}</p>
    </React.Fragment>
  )
}