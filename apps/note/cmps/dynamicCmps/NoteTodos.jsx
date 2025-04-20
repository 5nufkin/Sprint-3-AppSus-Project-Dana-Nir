

export function NoteTodos({ note, onToggleTodo }) {
  const { title, todos } = note.info

  return (<React.Fragment>
    <h2>{title}</h2>
    <ul className="list-todos">
      {todos.map((todo, idx) => {
        return (
          <li key={idx}>
            <label>
              <input type="checkbox" checked={todo.doneAt} onChange={() => onToggleTodo(note.id)} />
              <span className={todo.doneAt ? 'done' : ''}>{todo.txt}</span>
            </label>
          </li>
        )
      }
      )}
    </ul>
  </React.Fragment>
  )
}