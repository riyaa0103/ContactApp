const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { name, phone, email } = req.body;
  db.query(
    "INSERT INTO contacts (name,email,phone) VALUES (?, ?, ?)",
    [name, phone, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId, name, phone, email });
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM contacts", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

router.put("/:id", (req, res) => {
  const {name,email,phone } = req.body;
  db.query(
    "UPDATE contacts SET name=?, phone=?, email=? WHERE id=?",
    [name,email,phone, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: req.params.id, name, phone, email });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM contacts WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: req.params.id });
  });
});

module.exports = router;