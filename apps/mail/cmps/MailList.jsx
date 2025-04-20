import { Loader } from "../../../cmps/Loader.jsx"
import { MailPreview } from "./MailPreview.jsx"

const { useOutletContext } = ReactRouterDOM


export function MailList() {

  const context = useOutletContext()
  const { mails, markAsRead, onMoveMailToTrash, onRemoveMail, onToggleCompose } = context || {}

  // if (!mails) return <Loader />

  return (
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
  )
}
