const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const usersFile = path.join(__dirname, 'src', 'data', 'users.json');

app.post('/api/register', (req, res) => {
  const newUser = req.body;

  fs.readFile(usersFile, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Cannot read file' });

    let users = [];
    try {
      users = JSON.parse(data || '[]');
    } catch (e) {
      return res.status(500).json({ error: 'Invalid JSON in file' });
    }

    users.push(newUser);

    fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).json({ error: 'Cannot write file' });
      res.status(200).json({ success: true });
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
