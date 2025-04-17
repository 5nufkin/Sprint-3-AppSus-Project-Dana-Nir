const { useState } = React

export function MailPreview({ mail }) {
    const { from, subject, body, sentAt, isRead } = mail

    const [isMailRead, setIsMailRead] = useState(isRead)


    const date = new Date(sentAt)
    const currentYear = new Date().getFullYear()

    const formattedDate = date.getFullYear() === currentYear
        ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).replace(' ', ', ')
        : date.getFullYear()

    const unread = isMailRead ? '' : 'unread'

    return (
    <tr>
        <td className={unread}>{from}</td>
        <td className={unread}>{subject}</td>
        <td style={{ color: 'grey' }}>{body}</td>
        <td className={unread}>{formattedDate}</td>
    </tr>
    )

}