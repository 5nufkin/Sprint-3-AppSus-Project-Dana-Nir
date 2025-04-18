import { mailsService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function ComposeMail() {
    const [mail, setMail] = useState(mailsService.getEmptyMail())
    const [ mailHeader, setMailHeader] = useState('New Message')
    const [isOpen, setIsOpen ] = useState(true)

    const navigate = useNavigate()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break
        }
        
        setMail(prevMail => ({ ...prevMail, [field]: value }))
        if (field === 'subject') setMailHeader(value)
    }
    

    function onSendMail(ev) {
        ev.preventDefault()
        setMail(prevMail => ({ ...prevMail, sentAt: Date.now() }))
        mailsService.save(mail)
        .then(() => {
            console.log(mail)
            navigate('/mail')
            showSuccessMsg('Email sent successfully!')
        })
        .catch(err => {
            console.log('Cannot send mail!:', err)
            showErrorMsg('Cannot send mail!')
        })
    }

    function onSaveMail(ev) {
        if (ev) ev.preventDefault()
        if (!mail.subject && !mail.to && !mail.body) {
            navigate('/mail')
            return
        }
        mailsService.save(mail)
            .then(() => {
                navigate('/mail')
                console.log(mail)
            })
            .catch(err => {
                console.log('Cannot save mail to drafts!:', err)
                showErrorMsg('Cannot save mail to drafts!')
            })
    }

    function toggleIsOpen(ev) {
        ev.preventDefault()
        setIsOpen(!isOpen)
    }

    const { to, subject, body } = mail

    return (  
        <form className={`compose-mail flex ${isOpen ? 'open' : 'collapsed'}`}>
            <section className={`mail-header flex space-between ${isOpen ? '' : 'close-width'}`} onClick={toggleIsOpen}>
                <div>{mailHeader}</div>
                <div>
                <button onClick={toggleIsOpen}>-</button>
                <button onClick={onSaveMail}><img src={`../../../assets/img/close.svg`} alt="close icon" 
                style={{ width: '16px', height: '16px'}} /></button>
                </div>
            </section>
            {isOpen && <div className="compose-input-container flex flex-column">
                <div className="compose-input flex">
                <label htmlFor="to" style={{color: 'grey'}}>To</label>
                <input value={to} onChange={handleChange} type="email" name="to" id="to" />
                </div>
                
                <div className="compose-input">
                <input value={subject} onChange={handleChange} type="text" name="subject" id="subject"
                placeholder="Subject" />
                </div>

                <textarea name="body" id="body" value={body} onChange={handleChange}></textarea>

            <   button className="send-btn" onClick={onSendMail}>Send</button>
            </div>}


        </form>

    )
}