import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailsService = {
    query,
    getUser,
    getUnreadCount,
    getEmptyMail,
    save,
    get,
    remove,
    getMailIdx,
    getMailsCount,
    getDefaultFilter,
    getDefaultSortBy,
}

function query(filterBy = getDefaultFilter(), sortBy = getDefaultSortBy()) {
  return storageService.query(MAIL_KEY)
    .then(mails => {
      switch (filterBy.status) {
        case 'inbox':
            mails = mails.filter(mail => mail.to === getUser().email && !mail.removedAt && mail.sentAt)
            break
        case 'sent':
            mails = mails.filter(mail => mail.from === getUser().email && !mail.removedAt && mail.sentAt)
            break
        case 'starred':
            mails = mails.filter(mail => mail.isStarred === true && !mail.removedAt && mail.sentAt)
            break
          case 'trash':
            mails = mails.filter(mail => mail.removedAt)
            break
        case 'draft':
            mails = mails.filter(mail => !mail.sentAt)
            break
      }
      if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        mails = mails.filter(mail => regex.test(mail.subject) || regex.test(mail.body))
      }

      if (filterBy.isRead) {
        mails = mails.filter(mail => !mail.isRead)
      }

      return mails
    })
      .then(mails => {

      if (sortBy.type) {
        mails.sort((p1, p2) => (p1[sortBy.type] - p2[sortBy.type]) * sortBy.sortDir)
      }
      else {
        mails.sort((p1, p2) => (p1.createdAt - p2.createdAt ) * sortBy.sortDir)
      }

      return mails
  
      })

}

function getUser() {
    const loggedinUser = { 
        email: 'user@appsus.com',  
        fullname: 'Mahatma Appsus' 
    }

    return loggedinUser
}

function getUnreadCount() {
  return query(getDefaultFilter())
    .then (mails => {
      return mails.filter(mail => !mail.isRead).length})
}

function getMailsCount(filterBy, sortBy) {
  return query(filterBy, sortBy)
    .then (mails => {
      return mails.length})
}

function getEmptyMail() {
  return {
    id: '',
    createdAt: Date.now(),
    subject: '',
    body: '',
    isRead: true,
    sentAt: '',
    removedAt: null,
    from: 'user@appsus.com',
    to: ''}
}

function save(mail) {
  if (mail.id) {
      return storageService.put(MAIL_KEY, mail)
  } else {
      return storageService.post(MAIL_KEY, mail)
  }
}

function get(mailId, filterBy, sortBy) {
  return storageService.get(MAIL_KEY, mailId)
    .then(mail => _setNextPrevMailId(mail, filterBy, sortBy))
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function getMailIdx(mailId, filterBy, sortBy) {
  return query(filterBy, sortBy)
    .then (mails => {
      return mails.findIndex(mail => mail.id === mailId)})
}

function getDefaultFilter() {
  return { 
    status: 'inbox', 
    txt: '', 
    isRead: false,
    lables: []
    }
}

function getDefaultSortBy() {
  return {
    type: 'sentAt',
    sortDir: -1
  }
}

// ~~~~~~~~~~~~~~~~LOCAL FUNCTIONS~~~~~~~~~~~~~~~~~~~

function _createMails() {
    const mails = utilService.loadFromStorage(MAIL_KEY) || []

    if (mails && mails.length) return

    mails.push(
      {
        "id": "c30383f8",
        "createdAt": 1684315298199,
        "subject": "Holiday Plans",
        "body": "Don't miss out on this deal!",
        "isRead": true,
        "sentAt": null,
        "removedAt": null,
        "isStarred": false,
        "from": "support@example.com",
        "to": "user@appsus.com"
      },
      {
        "id": "16004cb9",
        "createdAt": 1684713043198,
        "subject": "Family Reunion",
        "body": "Here's the latest update.",
        "isRead": false,
        "sentAt": null,
        "removedAt": null,
        "isStarred": false,
        "from": "user@appsus.com",
        "to": "friend@example.com"
      },
      {
        "id": "573b1613",
        "createdAt": 1685171840198,
        "subject": "Meeting Reminder",
        "body": "Don't miss out on this deal!",
        "isRead": false,
        "sentAt": null,
        "removedAt": null,
        "isStarred": true,
        "from": "user@appsus.com",
        "to": "info@example.com"
      },
      {
        "id": "26cbcdf1",
        "createdAt": 1686867356198,
        "subject": "Sale Alert",
        "body": "Our office will be closed.",
        "isRead": true,
        "sentAt": null,
        "removedAt": null,
        "isStarred": true,
        "from": "user@appsus.com",
        "to": "info@example.com"
      },
      {
        "id": "77aafd9b",
        "createdAt": 1690022983198,
        "subject": "Invoice #12345",
        "body": "Suspicious login attempt detected.",
        "isRead": true,
        "sentAt": 1690023228577,
        "removedAt": null,
        "isStarred": false,
        "from": "user@appsus.com",
        "to": "friend@example.com"
      },
      {
        "id": "89a5354a",
        "createdAt": 1702299457199,
        "subject": "Family Reunion",
        "body": "Your appointment is confirmed.",
        "isRead": true,
        "sentAt": 1702299570923,
        "removedAt": null,
        "isStarred": false,
        "from": "user@appsus.com",
        "to": "contact@example.com"
      },
      {
        "id": "c7cf06dd",
        "createdAt": 1702391335199,
        "subject": "Family Reunion",
        "body": "Please confirm your availability.",
        "isRead": false,
        "sentAt": null,
        "removedAt": 1702391519422,
        "isStarred": false,
        "from": "team@example.com",
        "to": "user@appsus.com"
      },
      {
        "id": "5138d385",
        "createdAt": 1704659437198,
        "subject": "Weekly Newsletter",
        "body": "Thank you for your payment.",
        "isRead": true,
        "sentAt": 1704659572388,
        "removedAt": null,
        "isStarred": true,
        "from": "user@appsus.com",
        "to": "contact@example.com"
      },
      {
        "id": "332c7733",
        "createdAt": 1707707109199,
        "subject": "Invoice #12345",
        "body": "Your appointment is confirmed.",
        "isRead": false,
        "sentAt": 1707707393877,
        "removedAt": null,
        "isStarred": true,
        "from": "team@example.com",
        "to": "user@appsus.com"
      },
      {
        "id": "d6b82161",
        "createdAt": 1710989637199,
        "subject": "Security Alert",
        "body": "Suspicious login attempt detected.",
        "isRead": true,
        "sentAt": 1710989787368,
        "removedAt": null,
        "isStarred": true,
        "from": "user@appsus.com",
        "to": "friend@example.com"
      },
      {
        "id": "041c0564",
        "createdAt": 1718494988198,
        "subject": "Meeting Reminder",
        "body": "Don't miss out on this deal!",
        "isRead": true,
        "sentAt": null,
        "removedAt": null,
        "isStarred": false,
        "from": "team@example.com",
        "to": "user@appsus.com"
      },
      {
        "id": "4c481892",
        "createdAt": 1720061140199,
        "subject": "Invoice #12345",
        "body": "Here's the latest update.",
        "isRead": false,
        "sentAt": null,
        "removedAt": null,
        "isStarred": true,
        "from": "user@appsus.com",
        "to": "contact@example.com"
      },
      {
        "id": "750ba745",
        "createdAt": 1722239957198,
        "subject": "Urgent Notice",
        "body": "Looking forward to seeing you.",
        "isRead": false,
        "sentAt": 1722240076268,
        "removedAt": null,
        "isStarred": false,
        "from": "user@appsus.com",
        "to": "contact@example.com"
      },
      {
        "id": "6c0c24c8",
        "createdAt": 1723039266199,
        "subject": "Sale Alert",
        "body": "Here's the latest update.",
        "isRead": false,
        "sentAt": 1723039450979,
        "removedAt": null,
        "isStarred": true,
        "from": "user@appsus.com",
        "to": "contact@example.com"
      },
      {
        "id": "87bd6aff",
        "createdAt": 1724372802197,
        "subject": "Security Alert",
        "body": "Don't miss out on this deal!",
        "isRead": true,
        "sentAt": 1724372918108,
        "removedAt": null,
        "isStarred": false,
        "from": "user@appsus.com",
        "to": "contact@example.com"
      },
      {
        "id": "867c19d3",
        "createdAt": 1724576303198,
        "subject": "Weekly Newsletter",
        "body": "Enjoy your weekend!",
        "isRead": true,
        "sentAt": null,
        "removedAt": null,
        "isStarred": true,
        "from": "user@appsus.com",
        "to": "contact@example.com"
      },
      {
        "id": "c1e7c116",
        "createdAt": 1731417009198,
        "subject": "Project Update",
        "body": "Don't miss out on this deal!",
        "isRead": false,
        "sentAt": 1731417237826,
        "removedAt": null,
        "isStarred": true,
        "from": "user@appsus.com",
        "to": "info@example.com"
      },
      {
        "id": "ee77c2eb",
        "createdAt": 1732493048199,
        "subject": "Security Alert",
        "body": "Don't miss out on this deal!",
        "isRead": true,
        "sentAt": 1732493160118,
        "removedAt": null,
        "isStarred": true,
        "from": "user@appsus.com",
        "to": "info@example.com"
      },
      {
        "id": "ec1b6ef8",
        "createdAt": 1732850052199,
        "subject": "Weekly Newsletter",
        "body": "Thank you for your payment.",
        "isRead": true,
        "sentAt": 1732850290781,
        "removedAt": null,
        "isStarred": false,
        "from": "noreply@example.com",
        "to": "user@appsus.com"
      },
      {
        "id": "0c6b0c1a",
        "createdAt": 1735771784198,
        "subject": "Meeting Reminder",
        "body": "Here's the latest update.",
        "isRead": false,
        "sentAt": 1735771979606,
        "removedAt": 1735772080332,
        "isStarred": true,
        "from": "support@example.com",
        "to": "user@appsus.com"
      },
      {
        "id": "7fe30594",
        "createdAt": 1737733821199,
        "subject": "Appointment Confirmation",
        "body": "Thank you for your payment.",
        "isRead": false,
        "sentAt": null,
        "removedAt": null,
        "isStarred": true,
        "from": "user@appsus.com",
        "to": "friend@example.com"
      },
      {
        "id": "08349aaa",
        "createdAt": 1741960972198,
        "subject": "Security Alert",
        "body": "Your appointment is confirmed.",
        "isRead": true,
        "sentAt": 1741961200213,
        "removedAt": null,
        "isStarred": true,
        "from": "noreply@example.com",
        "to": "user@appsus.com"
      },
      {
        "id": "225c4f27",
        "createdAt": 1742232359199,
        "subject": "Project Update",
        "body": "Looking forward to seeing you.",
        "isRead": true,
        "sentAt": null,
        "removedAt": null,
        "isStarred": true,
        "from": "user@appsus.com",
        "to": "contact@example.com"
      },
      {
        "id": "ab67fe70",
        "createdAt": 1742796540199,
        "subject": "Holiday Plans",
        "body": "Please confirm your availability.",
        "isRead": false,
        "sentAt": 1742796835973,
        "removedAt": null,
        "isStarred": true,
        "from": "user@appsus.com",
        "to": "friend@example.com"
      },
      {
        "id": "ae57790d",
        "createdAt": 1743461346198,
        "subject": "Project Update",
        "body": "Looking forward to seeing you.",
        "isRead": true,
        "sentAt": 1743461478374,
        "removedAt": null,
        "isStarred": true,
        "from": "noreply@example.com",
        "to": "user@appsus.com"
      },
      {
        "id": "157bddc8",
        "createdAt": 1744820566199,
        "subject": "Sale Alert",
        "body": "Here's the latest update.",
        "isRead": true,
        "sentAt": null,
        "removedAt": null,
        "isStarred": false,
        "from": "user@appsus.com",
        "to": "friend@example.com"
      },
      {
        "id": "b7ffea6d",
        "createdAt": 1744899149199,
        "subject": "Project Update",
        "body": "Enjoy your weekend!",
        "isRead": true,
        "sentAt": 1744899315573,
        "removedAt": null,
        "isStarred": true,
        "from": "support@example.com",
        "to": "user@appsus.com"
      },
      {
        "id": "9e475adc",
        "createdAt": 1744932557199,
        "subject": "Urgent Notice",
        "body": "Suspicious login attempt detected.",
        "isRead": true,
        "sentAt": 1744932707908,
        "removedAt": null,
        "isStarred": false,
        "from": "support@example.com",
        "to": "user@appsus.com"
      },
      {
        "id": "abe14ed3",
        "createdAt": 1745056083199,
        "subject": "Sale Alert",
        "body": "Suspicious login attempt detected.",
        "isRead": true,
        "sentAt": null,
        "removedAt": null,
        "isStarred": false,
        "from": "noreply@example.com",
        "to": "user@appsus.com"
      },
      {
        "id": "88af616d",
        "createdAt": 1745130230199,
        "subject": "Project Update",
        "body": "Suspicious login attempt detected.",
        "isRead": true,
        "sentAt": null,
        "removedAt": null,
        "isStarred": false,
        "from": "team@example.com",
        "to": "user@appsus.com"
      }     
    )      
      
    utilService.saveToStorage(MAIL_KEY, mails)
}

function _setNextPrevMailId(mail, filterBy, sortBy) {
  return query(filterBy, sortBy).then((mails) => {
      const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
      const prevMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
      const nextMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
      mail.nextMailId = nextMail.id
      mail.prevMailId = prevMail.id
      return mail
  })
}