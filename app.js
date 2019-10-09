const chalk = require('chalk')
const yargs = require('yargs')
const entries = require('./entries')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new diary entry',
    builder: {
        entryTitle: {
            describe: 'Diary Entry Title',
            demandOption: true,
            type: 'string'
        },
        entryBody: {
            describe: 'Diary Entry Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        entries.addEntry(argv.entryTitle, argv.entryBody)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a diary entry',
    builder: {
        entryTitle: {
            describe: 'Diary Entry Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        entries.removeEntry(argv.entryTitle)
    }
})

yargs.command({
    command: 'all',
    describe: 'Show all diary entries',
    handler(){
        entries.allEntries()
    }
})

yargs.command({
    command: 'view',
    describe: 'View a diary entry',
    builder: {
        entryTitle: {
            describe: 'Diary Entry Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        entries.viewEntry(argv.entryTitle)
    }
})
yargs.parse()