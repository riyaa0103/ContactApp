const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contacts");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/contacts", contactRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});


