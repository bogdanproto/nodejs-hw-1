const { Command } = require("commander");
const API = require("./contacts");

const program = new Command();
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const listContacts = await API.listContacts();
      console.table(listContacts);
      break;

    case "get":
      const contactById = await API.getContactById(id);
      console.table(contactById);
      break;

    case "add":
      const newContact = await API.addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const removedContact = await API.removeContact(id);
      console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
