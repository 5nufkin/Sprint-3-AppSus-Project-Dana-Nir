import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'

var demoNotes = [
  {
    id: utilService.makeId(),
    createdAt: 1687526400000,
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#ffffff'
    },
    info: {
      title: 'Grocery List',
      txt: 'Buy groceries: eggs, almond milk, avocados, and coffee filters'
    }
  },
  {
    id: utilService.makeId(),
    createdAt: 1678560000000,
    type: 'NoteTodos',
    isPinned: false,
    style: {
      backgroundColor: '#e0f2fe'
    },
    info: {
      title: 'Weekend Chores',
      todos: [
        { txt: 'Laundry', doneAt: null },
        { txt: 'Vacuum living room', doneAt: null },
        { txt: 'Clean out fridge', doneAt: Date.now() - 86400000 }
      ]
    }
  },
  {
    id: utilService.makeId(),
    createdAt: 1670985600000,
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#ffffff'
    },
    info: {
      title: '',
      txt: 'Wi-Fi password at mom’s: sunshine2022!'
    }
  },
  {
    id: utilService.makeId(),
    createdAt: 1659235200000,
    type: 'NoteTodos',
    isPinned: false,
    style: {
      backgroundColor: '#fce7f3'
    },
    info: {
      title: 'Work Tasks',
      todos: [
        { txt: 'Finish quarterly report', doneAt: Date.now() - 172800000 },
        { txt: 'Email client feedback', doneAt: null },
        { txt: 'Prepare Monday presentation', doneAt: null }
      ]
    }
  },
  {
    id: utilService.makeId(),
    createdAt: 1656729600000,
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#ffffff'
    },
    info: {
      title: 'Packing List',
      txt: 'Things to pack: charger, toothbrush, hiking shoes, sunscreen'
    }
  },
  {
    id: utilService.makeId(),
    createdAt: 1664668800000,
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#ffffff'
    },
    info: {
      title: '',
      txt: 'Reminder: renew passport before February'
    }
  },
  {
    id: utilService.makeId(),
    createdAt: 1662067200000,
    type: 'NoteTodos',
    isPinned: false,
    style: {
      backgroundColor: '#dcfce7'
    },
    info: {
      title: 'Goals for the Month',
      todos: [
        { txt: 'Read 2 books', doneAt: null },
        { txt: 'Run 20km', doneAt: null },
        { txt: 'Meditate daily', doneAt: Date.now() - 604800000 }
      ]
    }
  },
  {
    id: utilService.makeId(),
    createdAt: 1644883200000,
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: '#ffffff'
    },
    info: {
      title: 'Book Wishlist',
      txt: 'Books to check out: “Atomic Habits”, “The Midnight Library”, “Sapiens”'
    }
  },
  {
    id: utilService.makeId(),
    createdAt: 1680355200000,
    type: 'NoteImg',
    isPinned: false,
    info: {
      title: 'Morning vibes',
      url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
    },
    style: {
      backgroundColor: '#fef3c7'
    }
  },
  {
    id: utilService.makeId(),
    createdAt: 1694457600000,
    type: 'NoteImg',
    isPinned: false,
    info: {
      title: 'Cozy afternoon coffee',
      url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93'
    },
    style: {
      backgroundColor: '#fff7ed'
    }
  },
  {
    id: utilService.makeId(),
    createdAt: 1669852800000,
    type: 'NoteImg',
    isPinned: false,
    info: {
      title: 'Dreamy mountain view',
      url: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'
    },
    style: {
      backgroundColor: '#ede9fe'
    }
  }
]

_createNotes()

export const noteService = {
  query,
  get,
  remove,
  save,
  getEmptyNote,
}

function query() {
  return storageService.query(NOTE_KEY)
    .then(notes => notes)
}

function get() {

}

function remove(noteId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
  if (note.id) {
    return storageService.put(NOTE_KEY, note)

  } else {
    return storageService.post(NOTE_KEY, note)
  }
}

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTE_KEY)
  if (!notes || !notes.length) {
    notes = demoNotes
    utilService.saveToStorage(NOTE_KEY, demoNotes)

  }
}

function getEmptyNote() {
  return {
    createdAt: null,
    type: 'NoteTxt',
    isPinned: false,
    style: {
      backgroundColor: ''
    },
    info: {
      title: '',
      txt: '',
    }
  }
}