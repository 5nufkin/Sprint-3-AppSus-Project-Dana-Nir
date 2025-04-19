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
    const { onMoveMailToTrash, markAsRead, markAsStarred } = useOutletContext() || {}
    
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
        
          const { id, subject, from, to, sentAt, body } = mail

          if (!mail.id) return <div>Loading mail...</div> //add loader
          
    return (
        <section className='mail-details mail-list-details-container'>
            <MailHeader key={mail.id} mail={mail} onBack={onBack} 
            onMoveMailToTrash={onMoveMailToTrash} markAsRead={markAsRead}/>
            
            <section className="mail-content grid">
                <div className="empty"></div>
                <div className="mail-subject flex space-between align-center">
                    <div className="flex align-center" style={{ gap: '10px' }}>
                        <h1>{subject}</h1>
                        <p className="folder-tag">update with filter by!!!</p> {/* this needs to be updated with filter */}
                    </div>
                    <div className="flex">
                    <button><img src={'/assets/img/mail/print.svg'} alt="Inbox icon" /></button>
                    <button><img src={'/assets/img/mail/new_window.svg'} alt="Inbox icon" /></button>
                    </div>
                </div>
                    <img className="avatar" src={'/assets/img/mail/user_img.png'} alt=""  style={{ width: '32px', height: '32px', borderRadius: '50%' }}/>
                    <div className="mail-recipients flex space-between align-center">
                        <div>
                            <p>{from === user ? 'from me' : from}</p>
                            <p>{to === user ? 'to me' : to}</p>
                        </div>
                        <div className="flex align-center">
                            <p className="sent-at">{formatSentAt(sentAt)}</p>
                            <button title={mail.isStarred ? 'Starred' : 'Not starred'} 
                            className={`star-btn ${mail.isStarred ? 'starred' : ''}`}
                            onClick={() => markAsStarred(mail)}>
                                <svg className="star-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" strokeWidth="2"
                                    strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 1 14 9 22 9 16 14 18 22 12 18 6 22 8 14 2 9 10 9" />
                                </svg>
                            </button>
                            <button><img src={'/assets/img/mail/reply.svg'} alt="Inbox icon" /></button>
                            <button><img src={'/assets/img/mail/more.svg'} alt="Inbox icon" /></button>
                        </div>
                    </div>
                    <textarea className="body" name="body" id="body" defaultValue={body}></textarea>
                    <div className="send-options">
                        <button><img src={'/assets/img/mail/reply.svg'} alt="Inbox icon" /> Reply</button>
                        <button><img src={'/assets/img/mail/reply.svg'} alt="Inbox icon" 
                            style={{ transform: 'scaleX(-1)' }} /> Forward</button>
                    </div>
            </section>
        </section>
    )
}