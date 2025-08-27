// Vercel API route for contacts
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

// GET /api/contacts - Get all contacts
module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    res.json(contacts.sort((a, b) => a.name.localeCompare(b.name)));
  } else if (req.method === 'POST') {
    // Add new contact
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
  } else if (req.method === 'PUT') {
    // Update contact
    const { name, phone, email } = req.body;
    const id = parseInt(req.query.id || req.body.id);
    
    if (!name || !phone || !email) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const contactIndex = contacts.findIndex(c => c.id === id);
    if (contactIndex === -1) {
      return res.status(404).json({ error: "Contact not found" });
    }

    contacts[contactIndex] = { ...contacts[contactIndex], name, phone, email };
    res.json(contacts[contactIndex]);
  } else if (req.method === 'DELETE') {
    // Delete contact
    const id = parseInt(req.query.id || req.body.id);
    const contactIndex = contacts.findIndex(c => c.id === id);
    
    if (contactIndex === -1) {
      return res.status(404).json({ error: "Contact not found" });
    }

    contacts.splice(contactIndex, 1);
    res.json({ message: "Contact deleted successfully" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
