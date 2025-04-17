export function MailPreview({ mail }) {
    const { from, subject, body, sentAt } = mail

    return <article className='mail-prev flex'>
        <h6>{from}</h6>
        <h6>{subject}</h6>
        <h6>{body}</h6>
        <h6>{sentAt}</h6>
    </article>

}