import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailsService = {
    query,
    getUser,
    // get,
    // remove,
    // save,
    // getEmptyBook,
    // getDefaultFilter,
    // saveReview,
    // removeReview,
    // getGoogleBooks,
    // addGoogleBook,
    // getEmptyReview
}

function query() {
    return storageService.query(MAIL_KEY)
}

function getUser() {
    const loggedinUser = { 
        email: 'user@appsus.com',  
        fullname: 'Mahatma Appsus' 
    }

    return loggedinUser
}


// ~~~~~~~~~~~~~~~~LOCAL FUNCTIONS~~~~~~~~~~~~~~~~~~~

function _createMails() {
    const mails = utilService.loadFromStorage(MAIL_KEY) || []

    if (mails && mails.length) return

    mails.push(
        {  
          id: utilService.makeId(),
          createdAt: 1735881600000,
          subject: "Meeting Tomorrow",
          body: "Let me know what you think.",
          isRead: false,
          sentAt: 1736054400000,
          removedAt: null,
          from: "alice@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1708387200000,
          subject: "Dinner Plans",
          body: "We should reschedule.",
          isRead: false,
          sentAt: 1708387335000,
          removedAt: null,
          from: "bob@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1707782400000,
          subject: "Check This Out!",
          body: "Here's what I found.",
          isRead: false,
          sentAt: 1707782486000,
          removedAt: null,
          from: "carol@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1707000000000,
          subject: "Weekend Plans",
          body: "Are we still on for hiking?",
          isRead: false,
          sentAt: 1707000123000,
          removedAt: null,
          from: "dave@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1706000000000,
          subject: "Invoice Attached",
          body: "Please find your invoice attached.",
          isRead: false,
          sentAt: 1706000211000,
          removedAt: null,
          from: "sales@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1741478400000,
          subject: "Update Required",
          body: "Your app needs an update.",
          isRead: false,
          sentAt: 1741977600000,
          removedAt: null,
          from: "support@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1705100000000,
          subject: "Flight Confirmation",
          body: "Your flight is confirmed.",
          isRead: false,
          sentAt: 1705100033000,
          removedAt: null,
          from: "travel@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1704900000000,
          subject: "Miss You!",
          body: "Would love to catch up sometime.",
          isRead: false,
          sentAt: 1704900155000,
          removedAt: null,
          from: "momo@momo.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1704600000000,
          subject: "Sale Ending Soon!",
          body: "Don’t miss our biggest sale!",
          isRead: false,
          sentAt: 1704600056000,
          removedAt: null,
          from: "deals@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1704300000000,
          subject: "Your Order",
          body: "Thanks for your purchase!",
          isRead: false,
          sentAt: 1704300154000,
          removedAt: null,
          from: "orders@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1704000000000,
          subject: "Upcoming Event",
          body: "Join us for an exciting event.",
          isRead: false,
          sentAt: 1704000101000,
          removedAt: null,
          from: "events@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1744243200000,
          subject: "Password Reset",
          body: "Here is your reset link.",
          isRead: false,
          sentAt: 1744608000000,
          removedAt: null,
          from: "security@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1703200000000,
          subject: "Collaboration Opportunity",
          body: "Would you like to collaborate?",
          isRead: false,
          sentAt: 1703200203000,
          removedAt: null,
          from: "partner@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1748553600000,
          subject: "New Features Released!",
          body: "Try the new features in your dashboard.",
          isRead: false,
          sentAt: 1748736000000,
          removedAt: null,
          from: "features@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1755628800000,
          subject: "Happy Birthday!",
          body: "Wishing you a wonderful day.",
          isRead: false,
          sentAt: 1755888000000,
          removedAt: null,
          from: "greetings@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1702000000000,
          subject: "Monthly Report",
          body: "Your report is now available.",
          isRead: false,
          sentAt: 1702000200000,
          removedAt: null,
          from: "reports@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1701600000000,
          subject: "Subscription Expiring",
          body: "Renew your subscription to continue.",
          isRead: false,
          sentAt: 1701600066000,
          removedAt: null,
          from: "billing@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1701200000000,
          subject: "Congrats!",
          body: "You've won a prize!",
          isRead: false,
          sentAt: 1701200123000,
          removedAt: null,
          from: "lottery@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1700800000000,
          subject: "Reminder",
          body: "Don't forget your appointment.",
          isRead: false,
          sentAt: 1700800020000,
          removedAt: null,
          from: "calendar@example.com",
          to: "user@appsus.com"
        },
        {
          id: utilService.makeId(),
          createdAt: 1700400000000,
          subject: "Feedback Request",
          body: "We'd love to hear from you!",
          isRead: false,
          sentAt: 1700400077000,
          removedAt: null,
          from: "feedback@example.com",
          to: "user@appsus.com"
        }
    )      
      
    utilService.saveToStorage(MAIL_KEY, mails)
}