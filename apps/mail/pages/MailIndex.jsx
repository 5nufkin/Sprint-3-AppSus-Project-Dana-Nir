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
    }, [location.pathname])

    function loadMails() {
        mailsService.query()
            .then (mails => {
                setMails(mails)
                console.log(mails)
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
        mailsService.save(mailToMove)
            .then(() => {
                showSuccessMsg('Moved email to trash')
            })
            .catch(err => {
                console.log('Cannot move mail to trash!:', err)
                showErrorMsg('Cannot move mail to trash!')
            })
    }

    function markAsRead(mailToRead) {
        console.log(mailToRead)
        mailsService.save(mailToRead)
    }

    return (
        <div className='mail-app grid'>
            <MailNav onToggleCompose={onToggleCompose} />
            {/* <MailList className="mail-list-container" mails={mails}/> */}
            <div>
            <Outlet context={{
                onMoveMailToTrash,
                markAsRead,
                ...(mailId ? {} : { mails, className: 'mail-list-container' })
            }} />
            </div>

            {isComposeOpen && <ComposeMail />}
        </div>
    )
}

