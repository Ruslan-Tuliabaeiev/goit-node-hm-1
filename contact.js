 const fs = require('fs/promises')
const path = require('path')
 const { randomUUID } = require('crypto')


const readContent = async () => {
    const content = await fs.readFile(path.join(__dirname,  'db', 'contact.json'), "utf8",)
    const result = JSON.parse(content)
    return result
}

async function listContacts() {
  return await readContent()
    
}

async function getContactById(contactId) {
    const contacts = await readContent()
    const [contact] = contacts.filter((c)=> c.id === contactId)
  return contact ? contact : null
}

async function removeContact(contactId) {
    const contacts = await readContent()
    const contact = contacts.findIndex((c) => c.id === contactId)
    if (contact === -1) { return null}
    const [daleteContacts] = contacts.splice(contact, 1)
    await fs.writeFile(
        path.join(__dirname, 'db', 'contact.json'),
        JSON.stringify(contacts, null, 2),
    )
    return daleteContacts
}

async function addContact(name, email, phone) {
    const contact = await readContent()
    const newContact = { id: randomUUID(), name, email, phone }
    contact.push(newContact)
    await fs.writeFile(
        path.join(__dirname, 'db', 'contact.json'),
        JSON.stringify(contact, null, 2),
    )
    return newContact
}


module.exports = { listContacts, getContactById, removeContact, addContact}
