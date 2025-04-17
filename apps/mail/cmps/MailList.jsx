import { MailPreview } from "./MailPreview.jsx"
// const { Link } = ReactRouterDOM

export function MailList({ mails }) {
    return (
        <section className='mail-list-container'>
            <table className="mail-list">
                <tbody>
                    {mails.map(mail => (
                        <MailPreview key={mail.id} mail={mail} />
                    ))}
                </tbody>
            </table>
        </section>
    )
}
