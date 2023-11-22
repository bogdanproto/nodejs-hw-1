const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const objById = data.find(({ id }) => id === contactId);

  return objById ?? null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const idxEl = data.findIndex(({ id }) => id === contactId);

  if (idxEl < 0) {
    return null;
  }

  const removedEl = data.splice(idxEl, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return removedEl;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newEl = { id: nanoid(), name, email, phone };

  data.push(newEl);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return newEl;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
