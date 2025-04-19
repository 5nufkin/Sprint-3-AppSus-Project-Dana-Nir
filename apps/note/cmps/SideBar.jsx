import { ArchiveIcon, LabelIcon, LightBulbIcon, PencilIcon, ReminderBellIcon, TrashIcon } from "./Icons.jsx";


export function SideBar() {
  return (
    <aside className="side-bar">

      <button className="side-bar-icon selected">
        <LightBulbIcon />
      </button>

      <button className="side-bar-icon">
        <ReminderBellIcon />
      </button>

      <button className="side-bar-icon">
        <LabelIcon />
      </button>

      <button className="side-bar-icon">
        <PencilIcon />
      </button>

      <button className="side-bar-icon">
        <ArchiveIcon />
      </button>

      <button className="side-bar-icon">
        <TrashIcon />
      </button>

    </aside>
  )
}