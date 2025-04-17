import { mailsService } from '../services/mail.service.js'
import { MailList } from '../cmps/MailList.jsx'
// import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useState, useEffect } = React
// const { Link } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

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
        <div className='mail-app'>
            <MailList mails={mails}/>
        </div>
    )
}

