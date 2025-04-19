import { MailPreview } from "./MailPreview.jsx"

const { useOutletContext } = ReactRouterDOM


export function MailList() {
    
    const context = useOutletContext()
    const { mails, markAsRead, onMoveMailToTrash } = context || {}

    if (!mails) return <div>Loading mails...</div> //add loader

    return (
        <section className='mail-list-details-container'>
            <table className="mail-list">
                <tbody>
                    {mails.map(mail => (
                        <MailPreview key={mail.id} mail={mail} 
                        markAsRead={markAsRead} onMoveMailToTrash={onMoveMailToTrash} />
                    ))}
                </tbody>
            </table>
        </section>
    )
}
