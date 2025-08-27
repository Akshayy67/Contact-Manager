// Root API route for testing
module.exports = (req, res) => {
  res.json({ 
    message: "Contact Manager API is running!",
    endpoints: [
      "GET /api/contacts - Get all contacts",
      "POST /api/contacts - Add new contact",
      "PUT /api/contacts/:id - Update contact",
      "DELETE /api/contacts/:id - Delete contact",
      "GET /api/contacts/search?q=term - Search contacts"
    ]
  });
};
