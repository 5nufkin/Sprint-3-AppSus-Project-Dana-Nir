import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const NOTE_KEY = 'noteDB'

const demoNotes = [
  {
    id: "BkISPH",
    createdAt: 1744331100884,
    type: "NoteTxt",
    isPinned: false,
    style: { backgroundColor: "#fff8b8" },
    info: {
      title: "Maccabi Game Plan",
      txt: "Check Euroleague stats before Thursday."
    }
  },
  {
    id: "GlxoPD",
    createdAt: 1744331100885,
    type: "NoteTxt",
    isPinned: false,
    style: { backgroundColor: "#efeff1" },
    info: {
      title: "Celtics Recap",
      txt: "Tatum had 40 points in the comeback win!"
    }
  },
  {
    id: "Ptgs7A",
    createdAt: 1744331100886,
    type: "NoteImg",
    isPinned: false,
    style: { backgroundColor: "#f6e2dd" },
    info: {
      title: "Yad Eliyahu Arena",
      url: "https://images.unsplash.com/photo-1580741315300-c99c5278ee07"
    }
  },
  {
    id: "Y6uB5h",
    createdAt: 1744331100887,
    type: "NoteImg",
    isPinned: false,
    style: { backgroundColor: "#d4e4ed" },
    info: {
      title: "Celtics Fans",
      url: "https://images.unsplash.com/photo-1558807012-d2e3c4e86ef4"
    }
  },
  {
    id: "Jgxo44",
    createdAt: 1744331100888,
    type: "NoteTodos",
    isPinned: false,
    style: { backgroundColor: "#fff8b8" },
    info: {
      title: "Grocery Shopping",
      todos: [
        { txt: "Milk", doneAt: 1745171898055 },
        { txt: "Eggs", doneAt: null },
        { txt: "Cheese", doneAt: 1745171898055 },
        { txt: "Spinach", doneAt: null },
        { txt: "Tofu", doneAt: 1745171898055 },
        { txt: "Almond Butter", doneAt: null }
      ]
    }
  },
  {
    id: "TdoR8P",
    createdAt: 1744331100889,
    type: "NoteTodos",
    isPinned: false,
    style: { backgroundColor: "#faafa8" },
    info: {
      title: "Weekend Chores",
      todos: [
        { txt: "Laundry", doneAt: 1745171898055 },
        { txt: "Dishes", doneAt: null },
        { txt: "Groceries", doneAt: 1745171898055 },
        { txt: "Clean car", doneAt: null }
      ]
    }
  },
  {
    id: "Uxr91A",
    createdAt: 1744331100890,
    type: "NoteTodos",
    isPinned: false,
    style: { backgroundColor: "#b4ddd3" },
    info: {
      title: "React Study Plan",
      todos: [
        { txt: "useState recap", doneAt: 1745171898055 },
        { txt: "Build Todo App", doneAt: 1745171898055 },
        { txt: "Context API", doneAt: null },
        { txt: "Router basics", doneAt: null }
      ]
    }
  },
  {
    id: "KwR7r1",
    createdAt: 1744331100891,
    type: "NoteTodos",
    isPinned: false,
    style: { backgroundColor: "#d3bfdb" },
    info: {
      title: "Books To Read",
      todos: [
        { txt: "Atomic Habits", doneAt: 1745171898055 },
        { txt: "The Midnight Library", doneAt: null },
        { txt: "Sapiens", doneAt: 1745171898055 }
      ]
    }
  },
  {
    id: "gTeuaR",
    createdAt: 1744331100892,
    type: "NoteTxt",
    isPinned: false,
    style: { backgroundColor: "#aeccdc" },
    info: {
      title: "WiFi",
      txt: "Mom's WiFi password: sunshine2024"
    }
  },
  {
    id: "xp9KvQ",
    createdAt: 1744331100893,
    type: "NoteTxt",
    isPinned: false,
    style: { backgroundColor: "#efeff1" },
    info: {
      title: "Dream trip ✈️",
      txt: "Japan itinerary ideas: Tokyo → Kyoto → Nara"
    }
  },
  {
    id: "Aqz4pX",
    createdAt: 1744331100894,
    type: "NoteTxt",
    isPinned: false,
    style: { backgroundColor: "#e9e3d4" },
    info: {
      title: "Ideas",
      txt: "Open a weekend café with books and vinyl"
    }
  },
  {
    id: "Pxr1Ln",
    createdAt: 1744331100895,
    type: "NoteTxt",
    isPinned: false,
    style: { backgroundColor: "#f39f76" },
    info: {
      title: "Maccabi Mood",
      txt: "🏀 Feels like 2004 again 🔥"
    }
  },
  {
    id: "xZrgqx",
    createdAt: 1744331100896,
    type: "NoteImg",
    isPinned: false,
    style: { backgroundColor: "#fef3c7" },
    info: {
      title: "Quiet morning",
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    }
  },
  {
    id: "rPUJ2n",
    createdAt: 1744331100897,
    type: "NoteImg",
    isPinned: false,
    style: { backgroundColor: "#f39f76" },
    info: {
      title: "Coffee corner",
      url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
    }
  },
  {
    id: "ewpR5j",
    createdAt: 1744331100898,
    type: "NoteImg",
    isPinned: false,
    style: { backgroundColor: "#ede9fe" },
    info: {
      title: "Peaceful hike",
      url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d"
    }
  },
  {
    id: "JekD8y",
    createdAt: 1744331100899,
    type: "NoteTxt",
    isPinned: false,
    style: { backgroundColor: "#f6e2dd" },
    info: {
      title: "רשימת קניות",
      txt: "חלב, גבינה, פסטה, לחם, אבוקדו"
    }
  },
  {
    id: "PAkeq7",
    createdAt: 1744331100900,
    type: "NoteTodos",
    isPinned: false,
    style: { backgroundColor: "#e2f6d3" },
    info: {
      title: "To-do בערב",
      todos: [
        { txt: "לבדוק מיילים", doneAt: 1745171898055 },
        { txt: "לקרוא ספר", doneAt: null },
        { txt: "לאכול משהו בריא", doneAt: null }
      ]
    }
  },
  {
    id: "YbR6pK",
    createdAt: 1744331100901,
    type: "NoteTxt",
    isPinned: false,
    style: { backgroundColor: "#faafa8" },
    info: {
      title: "Quote I liked",
      txt: "“Discipline equals freedom.” – Jocko Willink"
    }
  },
  {
    id: "WqlFpt",
    createdAt: 1744331100902,
    type: "NoteTxt",
    isPinned: false,
    style: { backgroundColor: "#d4e4ed" },
    info: {
      title: "App ideas",
      txt: "Budget tracker with receipts scan and smart labels"
    }
  },
  {
    id: "Xumg2R",
    createdAt: 1744331100903,
    type: "NoteTxt",
    isPinned: false,
    style: { backgroundColor: "#fff8b8" },
    info: {
      title: "Birthday gift for Dana",
      txt: "Maybe a Kindle? Or concert tickets?"
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

function query(filterBy = {}) {
  return storageService.query(NOTE_KEY)
    .then(notes => {
      if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        notes = notes.filter(note => regExp.test(note.info.txt) || regExp.test(note.info.title))
      }
      return notes
    })
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

function getEmptyNote(type = 'NoteTxt') {
  const info = {
    title: '',
    txt: ''
  }

  if (type === 'NoteImg') info.url = ''

  return {
    createdAt: null,
    type,
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