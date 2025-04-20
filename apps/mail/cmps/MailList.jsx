import { Loader } from "../../../cmps/Loader.jsx"
import { MailPreview } from "./MailPreview.jsx"
import { MailOtherFilterAndSort } from '../cmps/MailOtherFilterAndSort.jsx'

const { useOutletContext } = ReactRouterDOM


export function MailList() {

  const context = useOutletContext()
  const { mails, markAsRead, onMoveMailToTrash, onRemoveMail, onToggleCompose, onSetSortBy, onSetFilterBy, filterBy, sortBy } = context || {}

  // if (!mails) return <Loader />

  return (
    <section>

      <div className="filter-container">
          <MailOtherFilterAndSort onSetFilterBy={onSetFilterBy} onSetSortBy={onSetSortBy}
            filterBy={filterBy} sortBy={sortBy} />
        </div>
    <section className='mail-list-details-container'>
      <table className="mail-list">
        <tbody>
          {mails.map(mail => (
            <MailPreview key={mail.id} mail={mail}
            markAsRead={markAsRead} onMoveMailToTrash={onMoveMailToTrash}
            onRemoveMail={onRemoveMail} onToggleCompose={onToggleCompose} />
          ))}
        </tbody>
      </table>
    </section>
    </section>
  )
}
