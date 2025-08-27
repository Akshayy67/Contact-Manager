// Search contacts endpoint
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

module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    const searchTerm = req.query.q || "";
    const filteredContacts = contacts.filter(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    res.json(filteredContacts.sort((a, b) => a.name.localeCompare(b.name)));
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};
