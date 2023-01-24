const express = require("express");

const router = express.Router();

/** Controller */

const etablisementControllers = require("../controllers/etablismentController");
const medecinControllers = require("../controllers/medecinController");
const patientControllers = require("../controllers/patientController");
const rendezvousControllers = require("../controllers/rendezvousController");

// etablisement
router.get("/etablisements", etablisementControllers.browse);
router.get("/etablisements/:id", etablisementControllers.read);
router.put("/etablisements/:id", etablisementControllers.edit);
router.post("/etablisements", etablisementControllers.add);
router.delete("/etablisements/:id", etablisementControllers.destroy);

// medecin
router.get("/medecins", medecinControllers.browse);
router.get("/medecins/:id", medecinControllers.read);
router.put("/medecins/:id", medecinControllers.edit);
router.post("/medecins", medecinControllers.add);
router.delete("/medecins/:id", medecinControllers.destroy);

// patient
router.get("/patients", patientControllers.browse);
router.get("/patients/:id", patientControllers.read);
router.put("/patients/:id", patientControllers.edit);
router.post("/patients", patientControllers.add);
router.delete("/patients/:id", patientControllers.destroy);

// rendezvous
router.get("/rendezvous", rendezvousControllers.browse);
router.get("/rendezvous/:id", rendezvousControllers.read);
router.put("/rendezvous/:id", rendezvousControllers.edit);
router.post("/rendezvous", rendezvousControllers.add);
router.delete("/rendezvous/:id", rendezvousControllers.destroy);

module.exports = router;
