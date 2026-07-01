const Partido = require("../models/Partido");

// GET /partidos
const obtenerPartidos = async (req, res) => {
    try {
        const partidos = await Partido.find().limit(20);
        res.json(partidos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// GET /partidos/:id
const obtenerPartidoPorId = async (req, res) => {
    try {
        const partido = await Partido.findById(req.params.id);

        if (!partido) {
            return res.status(404).json({ mensaje: "Partido no encontrado" });
        }

        res.json(partido);

    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
};

// POST
const crearPartido = async (req, res) => {

    try {

        const partido = new Partido(req.body);

        await partido.save();

        res.status(201).json(partido);

    } catch (error) {

        res.status(500).json({ mensaje: error.message });

    }

};

// PUT
const actualizarPartido = async (req, res) => {

    try {

        const partido = await Partido.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!partido) {
            return res.status(404).json({ mensaje: "Partido no encontrado" });
        }

        res.json(partido);

    } catch (error) {

        res.status(500).json({ mensaje: error.message });

    }

};

// DELETE
const eliminarPartido = async (req, res) => {

    try {

        const partido = await Partido.findByIdAndDelete(req.params.id);

        if (!partido) {
            return res.status(404).json({ mensaje: "Partido no encontrado" });
        }

        res.json({ mensaje: "Partido eliminado correctamente" });

    } catch (error) {

        res.status(500).json({ mensaje: error.message });

    }

};

// GET /partidos/torneo/:torneo
const obtenerPorTorneo = async (req, res) => {

    try {

        const partidos = await Partido.find({
            tournament: req.params.torneo
        });

        res.json(partidos);

    } catch (error) {

        res.status(500).json({ mensaje: error.message });

    }

};

// GET /partidos/equipo/:equipo
const obtenerPorEquipo = async (req, res) => {

    try {

        const partidos = await Partido.find({
            $or: [
                { home_team: req.params.equipo },
                { away_team: req.params.equipo }
            ]
        });

        res.json(partidos);

    } catch (error) {

        res.status(500).json({ mensaje: error.message });

    }

};

// GET /partidos/fecha/:fechaInicio-:fechaFin
const obtenerPorFechas = async (req, res) => {

    try {

        const { fechaInicio, fechaFin } = req.params;

        const partidos = await Partido.find({
            date: {
                $gte: new Date(fechaInicio),
                $lte: new Date(fechaFin)
            }
        });

        res.json(partidos);

    } catch (error) {

        res.status(500).json({ mensaje: error.message });

    }

};

module.exports = {

    obtenerPartidos,
    obtenerPartidoPorId,
    crearPartido,
    actualizarPartido,
    eliminarPartido,
    obtenerPorTorneo,
    obtenerPorEquipo,
    obtenerPorFechas

};