const prisma = require("../models/prisma");

const browse = async (req, res) => {
  const allRendezvous = await prisma.rendezVous.findMany();
  res.json(allRendezvous);
};

const read = async (req, res) => {
  const rendezvous = await prisma.rendezVous.findUnique({
    where: { id: parseInt(req.params.id, 10) },
    include: {
      patient: true,
      medecin: true,
    },
  });
  if (rendezvous) {
    res.json(rendezvous);
  } else {
    res.sendStatus(404);
  }
};

const edit = async (req, res) => {
  const rendezvous = await prisma.rendezVous.update({
    where: { id: parseInt(req.params.id, 10) },
    data: req.body,
  });
  res.json(rendezvous);
};

const add = async (req, res) => {
  const rendezvous = await prisma.rendezVous.create({
    data: req.body,
  });
  res.json(rendezvous);
};

const destroy = async (req, res) => {
  const rendezvous = await prisma.rendezVous.delete({
    where: { id: parseInt(req.params.id, 10) },
  });
  res.json(rendezvous);
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
