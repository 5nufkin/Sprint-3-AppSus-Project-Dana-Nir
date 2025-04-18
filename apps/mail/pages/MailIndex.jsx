import { mailsService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
import { MailNav } from '../cmps/MailNav.jsx'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useLocation  } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState([])
    const location = useLocation()

    useEffect(() => {
        loadMails()
    }, [[location.pathname]])

    function loadMails() {
        mailsService.query()
            .then (mails => {
                setMails(mails)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Could not get emails!')
            })
    }

    if (!mails) return <div>No emails to show</div>

    return (
        <div className='mail-app grid'>
            <MailNav />
            <MailList className="mail-list-container" mails={mails}/>
        </div>
    )
}

