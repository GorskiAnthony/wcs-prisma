const prisma = require("../models/prisma");

const browse = async (req, res) => {
  const etablissements = await prisma.etablisement.findMany();
  res.json(etablissements);
};

const read = async (req, res) => {
  const etablissement = await prisma.etablisement.findUnique({
    where: { id: parseInt(req.params.id, 10) },
  });
  if (etablissement) {
    res.json(etablissement);
  } else {
    res.sendStatus(404);
  }
};

const edit = async (req, res) => {
  const etablissement = await prisma.etablisement.update({
    where: { id: parseInt(req.params.id, 10) },
    data: req.body,
  });
  res.json(etablissement);
};

const add = async (req, res) => {
  const etablissement = await prisma.etablisement.create({
    data: req.body,
  });
  res.json(etablissement);
};

const destroy = async (req, res) => {
  const etablissement = await prisma.etablisement.delete({
    where: { id: parseInt(req.params.id, 10) },
  });
  res.json(etablissement);
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
