import { mailsService } from '../services/mail.service.js'

const { useState, useEffect } = React
const { Outlet, Link } = ReactRouterDOM

export function MailNav() {

    const [unreadCount, setUnreadCount] = useState()

    useEffect(() => {
        getUnreadCount()
    }, [])

    function getUnreadCount() {
        mailsService.getUnreadCount()
            .then (count => setUnreadCount(count))
    }

    const isSelected = ''

    return (
        <nav>
            <button className="compose-btn">
                <Link to="/mail/compose">Compose</Link>
            </button>
            <div className="mail-boxes">
            <button>
                <span><img src={`../../../assets/img/inbox${isSelected}.svg`} alt="Inbox icon" 
                style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                Inbox</span><span>{unreadCount}</span>
            </button>
            <button>
                <span><img src={`../../../assets/img/starred${isSelected}.svg`} alt="Starred icon" 
                style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                Starred</span><span></span>
            </button>
            <button>
                <span><img src={`../../../assets/img/sent${isSelected}.svg`} alt="Sent icon" 
                style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                Sent</span><span></span>
            </button>
            <button>
                <span><img src={`../../../assets/img/draft${isSelected}.svg`} alt="Draft icon" 
                style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                Draft</span><span></span>
            </button>
            <button>
                <span><img src={`../../../assets/img/trash${isSelected}.svg`} alt="Trash icon" 
                style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                Trash</span><span></span>
            </button>
            </div>
            <Outlet />
        </nav>
    )
}