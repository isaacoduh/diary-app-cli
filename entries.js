const fs = require('fs');
const chalk = require('chalk')

const addEntry = (entryTitle, entryBody) => {
    const entries = loadEntries()
    const duplicateEntry = entries.find((entry) => entry.entryTitle === entryTitle)

    if(!duplicateEntry){
        entries.push({
            entryTitle: entryTitle,
            entryBody: entryBody
        })
        saveEntries(entries)
        console.log(chalk.green.inverse('Diary Entry added!'))
    }else{
        console.log(chalk.red.inverse('Duplicate Entry detected'))
    }
}

const removeEntry = (entryTitle) => {
    const entries = loadEntries()
    const entriesLeft = entries.filter((entry) => entry.entryTitle !== entryTitle)

    if(entries.length > entriesLeft.length){
        console.log(chalk.green.inverse('Diary Entry Removed!'))
        saveEntries(entriesLeft)
    }else{
        console.log(chalk.red.inverse('No diary entry with that title found'))
    }
}

const allEntries = () => {
    const entries = loadEntries()
    
    console.log(chalk.inverse('Your Notes'))

    entries.forEach((entry) => {
        console.log(entry.entryTitle)
    })
}

const viewEntry = (entryTitle) => {
    const entries = loadEntries()
    const entry  = entries.find((entry) => entry.entryTitle === entryTitle)

    if(entry){
        console.log(chalk.inverse(entry.entryTitle))
        console.log(entry.entryBody)
    }else{
        console.log(chalk.red.inverse('Diary Entry not found!'))
    }
}

const saveEntries = (entries) => {
    const dataJSON = JSON.stringify(entries)
    fs.writeFileSync('entries.json', dataJSON)
}

const loadEntries = () => {
    try{
        const dataBuffer = fs.readFileSync('entries.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

module.exports = {
    addEntry: addEntry,
    removeEntry: removeEntry,
    allEntries: allEntries,
    viewEntry: viewEntry
}