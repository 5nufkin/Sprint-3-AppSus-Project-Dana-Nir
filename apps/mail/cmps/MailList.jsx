import { MailPreview } from "./MailPreview.jsx"
// const { Link } = ReactRouterDOM

export function MailList({ mails }) {
    return (
        <section className='mail-list'>
        <ul className=" clean-list">
            {mails.map(mail =>
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                </li>
            )}
        </ul>
    </section>
    )
}
