const prisma = require("../models/prisma");

const browse = async (req, res) => {
  const medecins = await prisma.medecin.findMany({
    include: {
      etablisement: true,
    },
  });
  res.json(medecins);
};

const read = async (req, res) => {
  const medecin = await prisma.medecin.findUnique({
    where: { id: parseInt(req.params.id, 10) },
    include: {
      etablisement: true,
    },
  });
  if (medecin) {
    res.json(medecin);
  } else {
    res.sendStatus(404);
  }
};

const edit = async (req, res) => {
  const medecin = await prisma.medecin.update({
    where: { id: parseInt(req.params.id, 10) },
    data: req.body,
  });
  res.json(medecin);
};

const add = async (req, res) => {
  const medecin = await prisma.medecin.create({
    data: req.body,
  });
  res.json(medecin);
};

const destroy = async (req, res) => {
  const medecin = await prisma.medecin.delete({
    where: { id: parseInt(req.params.id, 10) },
  });
  res.json(medecin);
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
