import { MagnifyingGlassIcon } from "./Icons.jsx";


export function Header({ handleSearchBarChange, filterBy }) {

  return (
    <header className="header">
      <img className="logo-keep" src="../../../assets/img/note/icons/asset 0.png" alt="" />
      <h1>Keep</h1>
      <div className="search-container">
        <MagnifyingGlassIcon className="icon-magnifying-glass" />
        <input className="note-search-bar" type="text" value={filterBy.txt || ''} onChange={handleSearchBarChange} name="txt" placeholder="Search" />
      </div>
    </header>
  )
}