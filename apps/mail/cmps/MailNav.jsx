import { mailsService } from '../services/mail.service.js'

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function MailNav({ onToggleCompose, onSetFilterBy, mails, filterBy }) {

    const [unreadCount, setUnreadCount] = useState()
    const pageFlags = markCurrPage(filterBy)
    const navigate = useNavigate()

    useEffect(() => {
        getUnreadCount()
        markCurrPage()
    }, [mails])

    function getUnreadCount() {
        mailsService.getUnreadCount()
            .then (count => setUnreadCount(count))
    }

    function markCurrPage() {
        switch (filterBy.status) {
            case 'inbox':
                return { 
                    inbox: true,
                    sent: false,
                    starred: false,
                    trash: false,
                    draft: false
                 }
            case 'sent':
                return { 
                    inbox: false,
                    sent: true,
                    starred: false,
                    trash: false,
                    draft: false
                 }
            case 'starred':
                return { 
                    inbox: false,
                    sent: false,
                    starred: true,
                    trash: false,
                    draft: false
                 }
            case 'trash':
                return { 
                    inbox: false,
                    sent: false,
                    starred: false,
                    trash: true,
                    draft: false
                 }
            case 'draft':
                return { 
                    inbox: false,
                    sent: false,
                    starred: false,
                    trash: false,
                    draft: true
                 }
            default:
                return {}
        }
    }

    function onChangePage(page) {
        onSetFilterBy({ ...filterBy, status: page })
        navigate('/mail')
    }


    return (
        <nav className="mail-nav">
            <button className="compose-btn flex align-items" onClick={onToggleCompose}><img src="/assets/img/mail/compose.png"/>
                Compose</button>
            <div className="mail-boxes">
            
            {pageFlags.inbox ? (
                <button onClick={() => onChangePage('inbox')} className="active"><span className="selected"><img src={`/assets/img/mail/inbox_selected.svg`} />
                Inbox</span><span className="selected">{unreadCount}</span></button>) : 
                (<button onClick={() => onChangePage('inbox')}><span><img src={`/assets/img/mail/inbox.svg`} />
                Inbox</span><span>{unreadCount}</span></button>)}
            
            {pageFlags.starred ? (
                <button onClick={() => onChangePage('starred')} className="active"><span className="selected"><img src={`/assets/img/mail/starred_selected.svg`} />
                Starred</span><span></span></button> ) :
                (<button onClick={() => onChangePage('starred')}><span><img src={`/assets/img/mail/starred.svg`} />Starred</span><span></span></button>)}

            {pageFlags.sent ? (
                <button onClick={() => onChangePage('sent')} className="active"><span className="selected"><img src={`/assets/img/mail/sent_selected.svg`} />
                Sent</span><span></span></button> ) :
                (<button onClick={() => onChangePage('sent')}><span><img src={`/assets/img/mail/sent.svg`} />Sent</span><span></span></button>)}
            
            {pageFlags.draft ? (
                <button onClick={() => onChangePage('draft')} className="active"><span className="selected"><img src={`/assets/img/mail/draft_selected.svg`} />
                Draft</span><span></span></button> ) :
                (<button onClick={() => onChangePage('draft')}><span><img src={`/assets/img/mail/draft.svg`} />Draft</span><span></span></button>)}
            
            {pageFlags.trash ? (
                <button onClick={() => onChangePage('trash')} className="active"><span className="selected"><img src={`/assets/img/mail/trash_selected.svg`} />
                Trash</span><span></span></button> ) :
                (<button onClick={() => onChangePage('trash')}><span><img src={`/assets/img/mail/trash.svg`} />Trash</span><span></span></button>)}

            </div>
        </nav>
    )
}