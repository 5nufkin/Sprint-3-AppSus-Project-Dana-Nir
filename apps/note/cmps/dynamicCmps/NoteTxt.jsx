

export function NoteTxt({ info }) {
  return (
    <React.Fragment>
      <h2>{info.title}</h2>
      <p>{info.txt}</p>
    </React.Fragment>
  )
}