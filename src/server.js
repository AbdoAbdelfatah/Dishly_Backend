import app from './app.js';
import { connectDB } from './config/db.config.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
