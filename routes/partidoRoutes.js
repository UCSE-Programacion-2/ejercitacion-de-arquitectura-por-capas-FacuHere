const express = require("express");

const router = express.Router();

const partidoController = require("../controllers/partidoController");

// Búsquedas especiales
router.get("/torneo/:torneo", partidoController.obtenerPorTorneo);

router.get("/equipo/:equipo", partidoController.obtenerPorEquipo);

router.get("/fecha/:fechaInicio-:fechaFin", partidoController.obtenerPorFechas);

// CRUD
router.get("/", partidoController.obtenerPartidos);

router.get("/:id", partidoController.obtenerPartidoPorId);

router.post("/", partidoController.crearPartido);

router.put("/:id", partidoController.actualizarPartido);

router.delete("/:id", partidoController.eliminarPartido);

module.exports = router;