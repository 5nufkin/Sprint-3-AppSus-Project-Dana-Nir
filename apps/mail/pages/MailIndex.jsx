import { mailsService } from '../services/mail.service.js'
import { ComposeMail } from '../cmps/ComposeMail.jsx'
import { MailNav } from '../cmps/MailNav.jsx'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useLocation, Outlet, Link, useParams, useNavigate } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState([])
    const location = useLocation()
    const [isComposeOpen, setIsComposeOpen] = useState(false)

    const { mailId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadMails()
    }, [location.pathname, mails])

    function loadMails() {
        mailsService.query()
            .then (mails => {
                setMails([...mails])
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Could not get emails!')
            })
    }

    if (!mails) return <div>No emails to show</div>

    function onToggleCompose() {
        setIsComposeOpen(!isComposeOpen);
    }

    function onMoveMailToTrash(mailToMove) {
        // setIsLoading(true)
        return mailsService.save(mailToMove)
            .then(() => mailsService.query())
            .then(mails => {
                setMails([...mails])
                showSuccessMsg('Moved email to trash')
            })
            .catch(err => {
                console.log('Cannot move mail to trash!:', err)
                showErrorMsg('Cannot move mail to trash!')
            })
    }

    function markAsRead(mailToRead) {
        return mailsService.save(mailToRead)
            .then(() => mailsService.query())
            .then(mails => {
                setMails([...mails])
            })
            .catch(err => {
                console.log('Failed to mark as read:', err)
            })
    }

    return (
        <div className='mail-app grid'>
            <MailNav onToggleCompose={onToggleCompose} mails={mails} />
            {/* <MailList className="mail-list-container" mails={mails}/> */}
            <div>
            <Outlet context={{
                onMoveMailToTrash,
                markAsRead,
                ...(mailId ? {loadMails} : { mails, className: 'mail-list-container' })
            }} />
            </div>

            {isComposeOpen && <ComposeMail />}
        </div>
    )
}

