const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./User'); 



const app = express();
const PORT = process.env.PORT || 3001;


app.use(bodyParser.json());


app.use(cors());


mongoose.connect('mongodb+srv://riteshsonawane622:ritesh4979@cluster0.vcbc8d0.mongodb.net/farmer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.post('/api/signup', async (req, res) => {
  try {
    
    const { firstName, lastName, email, password, userName} = req.body;
    const user = new User({ firstName, lastName, email, password, userName});

   
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.post('/api/login', async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.put('/api/update-password', async (req, res) => {
  try {
    const { userName, newPassword } = req.body;

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
