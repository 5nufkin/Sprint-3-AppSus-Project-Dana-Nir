const { useState } = React

export function MailPreview({ mail }) {
    const { from, subject, body, sentAt, createdAt, isRead } = mail

    const [isMailRead, setIsMailRead] = useState(isRead)

    const dateToFormat = sentAt ? sentAt : createdAt
    const date = new Date(dateToFormat)
    const currentYear = new Date().getFullYear()

    const formattedDate = date.getFullYear() === currentYear
        ? date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).replace(' ', ', ')
        : date.getFullYear()

    const unread = isMailRead ? 'read' : 'unread'

    return (
    <tr>
        <td className={unread}>{from}</td>
        <td className={unread}>{subject}</td>
        <td className={unread === 'read' ? unread : ''} style={{
            color: 'grey',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }}>{body}</td>
        <td className={unread}>{formattedDate}</td>
    </tr>
    )

}