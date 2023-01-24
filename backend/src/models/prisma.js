const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({ log: ["query"], errorFormat: "pretty" });

module.exports = prisma;
