const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => 'Your notes...'

const addNote = (title, body) => {
  const notes = loadNotes()

  const duplicateNote = notes.find(note => note.title === title)

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes)
    console.log(chalk.bgGreenBright('New note added.'))
  } else {
    console.log(chalk.bgRedBright('Note title taken'))
  }
}

const removeNote = title => {
  const notes = loadNotes()

  const notesToKeep = notes.filter(note => note.title !== title)

  if (notes.length > notesToKeep.length) {
    console.log(chalk.bgGreenBright('Note Removed'))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.bgRedBright('No Note found!'))
  }
}

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

const listNotes = () => {
  const notes = loadNotes()
  console.log(chalk.bgYellowBright('List of Notes:\n'))

  notes.forEach(note => console.log(note.title))
}

const readNote = title => {
  const notes = loadNotes()

  const noteToDisplay = notes.find(note => note.title === title)

  if (noteToDisplay) {
    console.log(chalk.blueBright('Title: ' + noteToDisplay.title))
    console.log('Body: ' + noteToDisplay.body)
  } else {
    console.log(chalk.bgRedBright('Error - no note found!'))
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
