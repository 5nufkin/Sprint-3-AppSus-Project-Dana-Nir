import { mailsService } from '../services/mail.service.js'

const { useState, useEffect } = React
const { Link, useNavigate } = ReactRouterDOM

export function MailHeader({ mail, onBack, onMoveMailToTrash, markAsRead, filterBy, sortBy }) {

    const [mailIdx, setMailIdx] = useState()
    const [mailsCount, setMailsCount] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        getIndexAndLength()
    }, [])

    function onRemove() {
        onMoveMailToTrash({ ...mail, removedAt: Date.now() })
        navigate('/mail')
    }

    function onUnread() {
        markAsRead({ ...mail, isRead: false })
        navigate('/mail')
    }

    function getIndexAndLength() {
        mailsService.getMailIdx(mail.id, filterBy, sortBy)
            .then (mailIdx => setMailIdx(mailIdx + 1))
        mailsService.getMailsCount(filterBy, sortBy)
            .then (mailsCount => setMailsCount(mailsCount))
    }

    return (
        <div className="mail-details-header grid">
            <button className="back-btn" onClick={onBack} title="Back to inbox">
                <img src={'assets/img/mail/back.svg'} alt="Inbox icon" />
            </button>
            <div className="details-header flex space-between align-center">
                <div className="flex">
                    <button><img src={'assets/img/mail/archive.svg'} alt="Inbox icon" /></button>
                    <button><img src={'assets/img/mail/spam.svg'} alt="Inbox icon" /></button>
                    <button onClick={onRemove} title="Delete">
                        <img src={'assets/img/mail/trash.svg'} alt="Inbox icon" />
                    </button>
                    {/* some seperator */}
                    <button onClick={onUnread} title="Mark as unread">
                        <img src={'assets/img/mail/unread.svg'} alt="Inbox icon" />
                    </button>
                    <button><img src={'assets/img/mail/snooz.svg'} alt="Inbox icon" /></button>
                    {/* some seperator */}
                    <button><img src={'assets/img/mail/moveto.svg'} alt="Inbox icon" /></button>
                    <button><img src={'assets/img/mail/labels.svg'} alt="Inbox icon" /></button>
                    <button><img src={'assets/img/mail/more.svg'} alt="Inbox icon" /></button>

                </div>
                <div className="flex">
                    <p><span>{mailIdx}</span> of <span>{mailsCount}</span></p>
                    <button title="Newer"><Link to={`/mail/${mail.nextMailId}`}>
                        <img src={'assets/img/mail/prevmail.svg'} alt="Inbox icon" 
                    style={{ width: '20px', height: '20px', transform: 'scaleX(-1)' }} />
                    </Link></button>

                    <button title="Older"><Link to={`/mail/${mail.prevMailId}`}>
                        <img src={'assets/img/mail/prevmail.svg'} alt="Inbox icon" 
                    style={{ width: '20px', height: '20px' }} />
                    </Link></button>
                </div>
            </div>
        </div>
    )
}