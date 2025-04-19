import { mailsService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'
import { MailHeader } from './MailHeader.jsx'

const { useState, useEffect } = React
const { useParams, useOutletContext, useNavigate } = ReactRouterDOM


export function MailDetails() {

    const [mail, setMail] = useState({})
    const { mailId } = useParams()

    const user = mailsService.getUser().email
    const navigate = useNavigate()
    const { onMoveMailToTrash, markAsRead, loadMails } = useOutletContext() || {}
    
    useEffect(() => {
        loadMail()
    },[mailId])

    function loadMail() {
        mailsService.get(mailId)
            .then (mail => {
                setMail(mail)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Could not get email!')
            })
        }

        function onBack() {
            navigate('/mail')
        }
        
        function formatSentAt(sentAt) {
            const date = new Date(sentAt)
            const now = new Date()
          
            const diffMs = now - date
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
          
            const isToday = now.toDateString() === date.toDateString()
            const isThisYear = now.getFullYear() === date.getFullYear()
          
            const options = { day: '2-digit', month: 'short' }
            const dateStr = date.toLocaleDateString('en-GB', options)
          
            if (isToday) {
              return `${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} (${diffHours}h ago)`
            } else if (diffDays < 14) {
              return `${dateStr} (${diffDays} day${diffDays !== 1 ? 's' : ''} ago)`
            } else if (isThisYear) {
              return `${dateStr}`
            } else {
              return `${dateStr} ${date.getFullYear()}`
            }
          }
        
          const { subject, from, to, sentAt, body } = mail

          if (!mail.id) return <div>Loading mail...</div> //add loader
          
    return (
        <section className="mail-details">
            <MailHeader key={mail.id} mail={mail} onBack={onBack} 
            onMoveMailToTrash={onMoveMailToTrash} markAsRead={markAsRead}/>

            <div className="mail-subject flex space-between">
                <div className="flex">
                    <h1>{subject}</h1>
                    <p>inbox</p> {/* this needs to be updated with filter */}
                </div>
                <div className="flex">
                    <img src={'/assets/img/mail/print.svg'} alt="Inbox icon" 
                    style={{ width: '20px', height: '20px' }} />
                    <img src={'/assets/img/mail/new_window.svg'} alt="Inbox icon" 
                    style={{ width: '20px', height: '20px' }} />
                </div>
            </div>

            <div className="mail-recipients flex space-between">
                <div className="grid">
                    <p>{from === user ? 'from me' : from}</p>
                    <p>{to === user ? 'to me' : to}</p>
                </div>
                <div className="flex">
                    <p>{formatSentAt(sentAt)}</p>
                    <button><img src={'/assets/img/mail/starred.svg'} alt="Inbox icon" 
                    style={{ width: '20px', height: '20px' }} /></button>
                    <img src={'/assets/img/mail/reply.svg'} alt="Inbox icon" 
                    style={{ width: '20px', height: '20px' }} />
                    <img src={'/assets/img/mail/more.svg'} alt="Inbox icon" 
                    style={{ width: '20px', height: '20px' }} />
                </div>
            </div>
            <textarea name="body" id="body" defaultValue={body}></textarea>
            <div>
                <button><img src={'/assets/img/mail/reply.svg'} alt="Inbox icon" 
                    style={{ width: '20px', height: '20px' }} /> Reply</button>
                <button><img src={'/assets/img/mail/reply.svg'} alt="Inbox icon" 
                    style={{ width: '20px', height: '20px', transform: 'scaleX(-1)' }} /> Forward</button>
            </div>
        </section>
    )
}