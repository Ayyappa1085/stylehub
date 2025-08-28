const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// CORS setup
app.use(cors({
  origin: 'https://stylehub-bs8f.vercel.app',
  credentials: true
}));
// For Vercel deployment:
// 1. Add all secrets to Vercel dashboard (Environment Variables)
// 2. Remove hardcoded localhost URLs in productions
// 3. Use process.env for all secrets

app.use(express.json());


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/users', require('./routes/users'));

app.get('/', (req, res) => {
  res.send('StyleHub backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
