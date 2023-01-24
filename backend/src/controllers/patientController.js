const prisma = require("../models/prisma");

const browse = async (req, res) => {
  const patients = await prisma.patient.findMany();
  res.json(patients);
};

const read = async (req, res) => {
  const patient = await prisma.patient.findUnique({
    where: { id: parseInt(req.params.id, 10) },
    include: {
      rendezVous: {
        include: {
          medecin: true,
        },
      },
    },
  });
  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
};

const edit = async (req, res) => {
  const patient = await prisma.patient.update({
    where: { id: parseInt(req.params.id, 10) },
    data: req.body,
  });
  res.json(patient);
};

const add = async (req, res) => {
  const patient = await prisma.patient.create({
    data: req.body,
  });
  res.json(patient);
};

const destroy = async (req, res) => {
  const patient = await prisma.patient.delete({
    where: { id: parseInt(req.params.id, 10) },
  });
  res.json(patient);
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
