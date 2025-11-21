import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get('/api', (req, res) => {
  res.json({ message: "Backend is working!" });
});

// temp message
app.get('/', (req, res) => {
  res.send('there is a test route, it is /api');
})

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
