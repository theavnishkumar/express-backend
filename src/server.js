import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 4000;

// Connect to MongoDB - this is where all my precious data lives
connectDB(process.env.MONGO_URI);

// Start the server and listen on the specified port
// I bind to 0.0.0.0 so it's accessible from anywhere
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Set a generous timeout for those heavy operations
// Sometimes parsing large feeds takes time, and I don't want timeouts killing my processes
server.timeout = 160000;
