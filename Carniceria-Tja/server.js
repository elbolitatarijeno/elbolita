const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// ✅ Save contact form data to submissions.txt
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  const timestamp = new Date().toLocaleString();
  const entry = `[${timestamp}] Name: ${name} | Email: ${email} | Message: ${message}\n`;

  fs.appendFile(path.join(__dirname, 'submissions.txt'), entry, err => {
    if (err) {
      console.error('Error saving contact:', err);
      return res.status(500).send('Error saving contact');
    }
    res.status(200).send('Contact saved!');
  });
});

// ✅ Save menu orders to orders.txt
app.post('/order', (req, res) => {
  const { items, total } = req.body;
  const timestamp = new Date().toLocaleString();

  const orderText = items.map((item, index) => {
    return `  ${index + 1}. ${item.name} x${item.quantity} @ ${item.price}`;
  }).join('\n');

  const entry = `\n[${timestamp}]\nTotal: ${total}bs\nItems:\n${orderText}\n--------------------\n`;

  fs.appendFile(path.join(__dirname, 'orders.txt'), entry, err => {
    if (err) {
      console.error('Error saving order:', err);
      return res.status(500).send('Error saving order');
    }
    res.status(200).send('Order saved!');
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🍖 Server is sizzling on http://localhost:${PORT}`);
});