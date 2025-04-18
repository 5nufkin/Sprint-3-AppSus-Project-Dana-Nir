const { Link, useNavigate } = ReactRouterDOM

export function MailHeader({ mail, onBack, onMoveMailToTrash, markAsRead }) {

    const navigate = useNavigate()

    function onRemove() {
        onMoveMailToTrash({ ...mail, removedAt: Date.now() })
        navigate('/mail')
    }

    function onUnread() {
        markAsRead({ ...mail, isRead: false })
        navigate('/mail')
    }

    return (
        <div className="mail-details-header flex space-between">
                    <div className="flex">
                        <button onClick={onBack}><img src={'/assets/img/mail/back.svg'} alt="Inbox icon" 
                        style={{ width: '20px', height: '20px' }} /></button>
                        <img src={'/assets/img/mail/archive.svg'} alt="Inbox icon" 
                        style={{ width: '20px', height: '20px' }} />
                        <img src={'/assets/img/mail/spam.svg'} alt="Inbox icon" 
                        style={{ width: '20px', height: '20px' }} />
                        <button onClick={onRemove}><img src={'/assets/img/mail/trash.svg'} alt="Inbox icon" 
                        style={{ width: '20px', height: '20px' }} /></button>
                        {/* some seperator */}
                        <button onClick={onUnread}><img src={'/assets/img/mail/unread.svg'} alt="Inbox icon" 
                        style={{ width: '20px', height: '20px' }} /></button>
                        <img src={'/assets/img/mail/snooz.svg'} alt="Inbox icon" 
                        style={{ width: '20px', height: '20px' }} />
                        {/* some seperator */}
                        <img src={'/assets/img/mail/moveto.svg'} alt="Inbox icon" 
                        style={{ width: '20px', height: '20px' }} />
                        <img src={'/assets/img/mail/labels.svg'} alt="Inbox icon" 
                        style={{ width: '20px', height: '20px' }} />
                        <img src={'/assets/img/mail/more.svg'} alt="Inbox icon" 
                        style={{ width: '20px', height: '20px' }} />

                    </div>
                    <div className="flex">
                        <p><span>index</span> of <span>length</span></p>
                        <button><Link to={`/mail/${mail.nextMailId}`}>
                            <img src={'/assets/img/mail/prevmail.svg'} alt="Inbox icon" 
                        style={{ width: '20px', height: '20px', transform: 'scaleX(-1)' }} />
                        </Link></button>

                        <button><Link to={`/mail/${mail.prevMailId}`}>
                            <img src={'/assets/img/mail/prevmail.svg'} alt="Inbox icon" 
                        style={{ width: '20px', height: '20px' }} />
                        </Link></button>
                    </div>
            </div>
    )
}