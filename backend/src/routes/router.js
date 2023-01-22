const express = require("express");

const router = express.Router();

const itemControllers = require("../controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// etablisement
router.get("/etablisements", (req, res) => {
  res.send("hello etablisements");
});
router.get("/etablisements/:id", (req, res) => {
  res.send("hello etablisements");
});
router.put("/etablisements/:id", (req, res) => {
  res.send("hello etablisements");
});
router.post("/etablisements", (req, res) => {
  res.send("hello etablisements");
});
router.delete("/etablisements/:id", (req, res) => {
  res.send("hello etablisements");
});

// medecin
router.get("/medecins", (req, res) => {
  res.send("hello medecin");
});
router.get("/medecins/:id", (req, res) => {
  res.send("hello medecin");
});
router.put("/medecins/:id", (req, res) => {
  res.send("hello medecin");
});
router.post("/medecins", (req, res) => {
  res.send("hello medecin");
});
router.delete("/medecins/:id", (req, res) => {
  res.send("hello medecin");
});

// patient

router.get("/patients", (req, res) => {
  res.send("hello Patient");
});
router.get("/patients/:id", (req, res) => {
  res.send("hello Patient");
});
router.put("/patients/:id", (req, res) => {
  res.send("hello Patient");
});
router.post("/patients", (req, res) => {
  res.send("hello Patient");
});
router.delete("/patients/:id", (req, res) => {
  res.send("hello Patient");
});

// rendezvous
router.get("/rendezvous", (req, res) => {
  res.send("hello rdv");
});
router.get("/rendezvous/:id", (req, res) => {
  res.send("hello rdv");
});
router.put("/rendezvous/:id", (req, res) => {
  res.send("hello rdv");
});
router.post("/rendezvous", (req, res) => {
  res.send("hello rdv");
});
router.delete("/rendezvous/:id", (req, res) => {
  res.send("hello rdv");
});

module.exports = router;
