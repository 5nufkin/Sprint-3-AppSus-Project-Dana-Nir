import { mailsService } from '../services/mail.service.js'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

export function ComposeMail({ onToggleCompose, draftToCompose }) {
    const [mail, setMail] = useState(draftToCompose ? draftToCompose : mailsService.getEmptyMail())
    const [ mailHeader, setMailHeader] = useState('New Message')
    const [isOpen, setIsOpen ] = useState(true)
    // const [isMinimize, setIsMinimize ] = useState(false)

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
            onToggleCompose(false)
            showSuccessMsg('Email sent successfully!')
        })
        .catch(err => {
            console.log('Cannot send mail!:', err)
            showErrorMsg('Cannot send mail!')
        })
    }

    function onSaveMail(ev, shouldMinimize = false) {
        if (ev) {
            ev.preventDefault()
            ev.stopPropagation()
        }
        if (!mail.subject && !mail.to && !mail.body) {
            onToggleCompose(false)
            return
        }
        setIsOpen(false)
        
        mailsService.save(mail)
            .then((mail) => {
                if (!shouldMinimize){
                    onToggleCompose(false)
                    setMail(mailsService.getEmptyMail())
                } else {
                    setMail({...mail})
                }
                showSuccessMsg('Email saved to drafts!')
            })
            .catch(err => {
                console.log('Cannot save mail to drafts!:', err)
                showErrorMsg('Cannot save mail to drafts!')
            })
    }

    function toggleIsOpen(ev) {
        ev.preventDefault()
        console.log('before change: ', isOpen)
        if (isOpen) {
            // setIsMinimize(true)
            onSaveMail(ev, true)
        } else {
            setIsOpen(true)
            // setIsMinimize(false)
        }
    }

    const { to, subject, body } = mail

    return (  
        <form className={`compose-mail flex ${isOpen ? 'open' : 'collapsed' }`}>
            <section className={`mail-header flex space-between ${isOpen ? '' : 'close-width' }`} onClick={toggleIsOpen}>
                <div>{mailHeader}</div>
                <div>
                <button onClick={toggleIsOpen}>-</button>
                <button onClick={onSaveMail}><img src={'assets/img/mail/close.svg'} alt="close icon" 
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

                <button className="send-btn" onClick={onSendMail}>Send</button>
            </div>}


        </form>
    )
}