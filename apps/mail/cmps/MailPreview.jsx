const { useState } = React
const { useNavigate } = ReactRouterDOM


export function MailPreview({ mail, markAsRead, onMoveMailToTrash, onRemoveMail, onToggleCompose }) {
    const { from, subject, body, sentAt, createdAt, isRead } = mail

    const [isMailRead, setIsMailRead] = useState(isRead)
    const navigate = useNavigate()

    const dateToFormat = sentAt ? sentAt : createdAt
    const date = new Date(dateToFormat)
    const now = new Date()
    const currentYear = new Date().getFullYear()
    const isToday = date.toDateString() === now.toDateString()

    function onShowMail() {
        if(!mail.sentAt) onToggleCompose(false, mail.id)
            else {
        markAsRead({ ...mail, isRead: true })
        navigate(`/mail/${mail.id}`)
        }
    }

    function toggleIsDeleted(ev) {
        ev.preventDefault()
        ev.stopPropagation()
        if (mail.removedAt || !mail.sentAt) onRemoveMail(mail.id)
            else onMoveMailToTrash({ ...mail, removedAt: Date.now() })
    }

    function toggleIsRead(ev) { 
        ev.preventDefault()
        ev.stopPropagation()
        markAsRead({ ...mail, isRead: !isMailRead })
        setIsMailRead(!isMailRead)
    }

    const formattedDate = isToday
        ? date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
        : date.getFullYear() === currentYear
            ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            : date.getFullYear()

    const unread = isMailRead ? 'read' : 'unread'

    return (
            <tr onClick={onShowMail} style={{ cursor: 'pointer' }}>
                <td className={unread}>{from}</td>

                <td className={unread} ><span className={unread}>{subject}</span> <span className="not-bold" style={{
                    color: 'grey', }}>{body}</span></td>
                
                <td className={unread}>
                    <span className="date">{formattedDate}</span>
                    <span className="actions">
                        <button onClick ={toggleIsDeleted}>
                            {mail.removedAt ? <img src={`assets/img/mail/trash_selected.svg`} alt="Trash icon" />
                                : <img src={`assets/img/mail/trash.svg`} alt="Trash icon" />}
                            
                        </button>
                        <button onClick ={toggleIsRead}>
                            {isMailRead ? <img src={'assets/img/mail/read.svg'} alt="Inbox icon" /> : <img src={'/assets/img/mail/unread.svg'} alt="Inbox icon" />}
                        </button>
                    </span>
                </td>
            </tr>
    )

}