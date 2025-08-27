// Vercel API route for contacts
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8000',
    'http://localhost:3000',
    'https://contact-manager-git-main-akshays-projects-06aa4db7.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// In-memory storage for demo (replace with real database in production)
let contacts = [
  {
    id: 1,
    name: "John Doe",
    phone: "+1-555-0123",
    email: "john@example.com",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "+1-555-0456",
    email: "jane@example.com",
    created_at: new Date().toISOString()
  }
];

let nextId = 3;

// Get all contacts
app.get('/api/contacts', (req, res) => {
  res.json(contacts.sort((a, b) => a.name.localeCompare(b.name)));
});

// Add a new contact
app.post('/api/contacts', (req, res) => {
  const { name, phone, email } = req.body;
  
  if (!name || !phone || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newContact = {
    id: nextId++,
    name,
    phone,
    email,
    created_at: new Date().toISOString()
  };

  contacts.push(newContact);
  res.json(newContact);
});

// Update a contact
app.put('/api/contacts/:id', (req, res) => {
  const { name, phone, email } = req.body;
  const id = parseInt(req.params.id);
  
  if (!name || !phone || !email) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const contactIndex = contacts.findIndex(c => c.id === id);
  if (contactIndex === -1) {
    return res.status(404).json({ error: "Contact not found" });
  }

  contacts[contactIndex] = { ...contacts[contactIndex], name, phone, email };
  res.json(contacts[contactIndex]);
});

// Delete a contact
app.delete('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const contactIndex = contacts.findIndex(c => c.id === id);
  
  if (contactIndex === -1) {
    return res.status(404).json({ error: "Contact not found" });
  }

  contacts.splice(contactIndex, 1);
  res.json({ message: "Contact deleted successfully" });
});

// Search contacts
app.get('/api/contacts/search', (req, res) => {
  const searchTerm = req.query.q || "";
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.json(filteredContacts.sort((a, b) => a.name.localeCompare(b.name)));
});

// Export for Vercel
module.exports = app;
