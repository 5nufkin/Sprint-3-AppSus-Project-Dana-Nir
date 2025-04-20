import { mailsService } from '../services/mail.service.js'
import { ComposeMail } from '../cmps/ComposeMail.jsx'
import { MailNav } from '../cmps/MailNav.jsx'
import { MailTxtFilter } from '../cmps/MailTxtFilter.jsx'
// import { MailOtherFilterAndSort } from '../cmps/MailOtherFilterAndSort.jsx'
import { showSuccessMsg, showErrorMsg } from '../../../services/event-bus.service.js'

const { useState, useEffect } = React
const { useLocation, Outlet, Link, useParams, useNavigate } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState([])
    const location = useLocation()
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [filterBy, setFilterBy] = useState(mailsService.getDefaultFilter())
    const [sortBy, setSortBy] = useState(mailsService.getDefaultSortBy())
    const [draftToCompose, setDraftToCompose] = useState('')

    const { mailId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadMails()
    }, [location.pathname, filterBy, sortBy])

    // useEffect(() => {
    //     loadMails()
    // }, [location.pathname, mails])

    function loadMails() {
        mailsService.query(filterBy, sortBy)
            .then (mails => {
                setMails([...mails])
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Could not get emails!')
            })
    }

    function onToggleCompose(state = false, mailId = '') {
        if (mailId){
            mailsService.get(mailId)
                .then(mail => {
                    setDraftToCompose(mail)
                    setTimeout(() => {
                        setIsComposeOpen(true)
                    }, 1000);
                })
        } 
        else if (!isComposeOpen) setIsComposeOpen(true)
        else setIsComposeOpen(state)
    }

    function onMoveMailToTrash(mailToMove) {
        // setIsLoading(true)
        return mailsService.save(mailToMove)
        .then(() => {
            setMails(mails => [...mails.map(mail => mail.id === mailToMove.id ? mailToMove : mail)])
            showSuccessMsg('Moved email to trash')
        })
            .catch(err => {
                console.log('Cannot move mail to trash!:', err)
                showErrorMsg('Cannot move mail to trash!')
            })
    }

    function onRemoveMail(mailId) {
        // setIsLoading(true)
        mailsService.remove(mailId)
            .then(() => {
                setMails((prevMails) => prevMails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`Email deleted successfully!`)
            })
            .catch(err => {
                console.log('Problem deleting email:', err)
                showErrorMsg('Problem deleting email!')
            })
            // .finally(() => setIsLoading(false))
    }

    function markAsRead(mailToRead) {
        mailsService.save(mailToRead)
            .then(setMails(mails => [...mails.map(mail => mail.id === mailToRead.id ? mailToRead : mail)]))
            .catch(err => {
                console.log('Failed to mark as read:', err)
            })
    }

    function markAsStarred(mailToStar) {
        mailToStar.isStarred = !mailToStar.isStarred
        mailsService.save(mailToStar)
            .then(setMails(mails => [...mails.map(mail => mail.id === mailToStar.id ? mailToStar : mail)]))
            .catch(err => {
                console.log('Failed to mark as read:', err)
        })
    }

    function onSetFilterBy(filterByToEdit) {
        setFilterBy(prevFilterBy => ({...prevFilterBy, ...filterByToEdit}))
    }

    function onSetSortBy(sortByToEdit) {
        setSortBy(prevSortBy => ({...sortByToEdit}))
    }

    if (!mails) return <div>No emails to show</div>


    return (
        <div className='mail-app grid'>
            <MailNav onToggleCompose={onToggleCompose} onSetFilterBy={onSetFilterBy} onSetSortBy={onSetSortBy}
            mails={mails} filterBy={filterBy} sortBy={sortBy}/>
            <MailTxtFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/>
            <div>
            {/* <MailOtherFilterAndSort onSetFilterBy={onSetFilterBy} onSetSortBy={onSetSortBy}
            filterBy={filterBy} sortBy={sortBy}/> */}
            <Outlet context={{
                onMoveMailToTrash,
                markAsRead,
                ...(mailId ? {markAsStarred, filterBy, sortBy} : { mails, onRemoveMail, onToggleCompose })
            }} />
            </div>

            {isComposeOpen && <ComposeMail onToggleCompose={onToggleCompose} draftToCompose={draftToCompose}/>}
        </div>
    )
}

