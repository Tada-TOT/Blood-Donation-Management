import express from "express";
import path from "path"
import { fileURLToPath } from 'url';

// Import required modules
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});


app.listen(process.env.PORT || 9001, () => {
  console.log("Server Started");
});


