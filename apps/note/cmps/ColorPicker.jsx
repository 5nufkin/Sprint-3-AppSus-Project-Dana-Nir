

export function ColorPicker({ onSelectColor, note }) {
  const colors = ['#faafa8', '#f39f76', '#fff8b8', '#e2f6d3', '#b4ddd3', '#d4e4ed', '#aeccdc', '#d3bfdb', '#f6e2dd', '#e9e3d4', '#efeff1']
  const titles = ['Coral', 'Peach', 'Sand', 'Mint', 'Sage', 'Fog', 'Storm', 'Dusk', 'Blossom', 'Clay', 'Chalk']

  return (
    <div className="color-picker-popover flex justify-center align-center">
      {colors.map((color, idx) => <button key={idx}
        onClick={() => onSelectColor(color, note.id)}
        className="btn-color-option"
        title={titles[idx]}
        style={{ backgroundColor: color }}>
      </button>)}
    </div>
  )
}