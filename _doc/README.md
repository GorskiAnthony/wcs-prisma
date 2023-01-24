# Documentation

## Introduction

Nous allons ensemble, apprendre prisma 🎊 !

Vous allez voir, c'est beaucoup plus simple que ce que vous pensez!

Déjà, c'est quoi prisma?

Prisma est un ORM (Object Relational Mapping) qui permet de faire le lien entre votre base de données et votre code.

![prisma](./PRISMA.png)

En gros, prisma va vous permettre de faire des requêtes SQL sans avoir à écrire de requêtes SQL

![mindblown](https://media.giphy.com/media/lXu72d4iKwqek/giphy.gif)

## Installation

Pour commencer, il faut installer prisma dans votre projet.

```bash
npm install prisma
```

<details>
<summary>Pshit ! Tu veux de la doc' ?</summary>

[Start from scratch with relational databases (15 min) | node-mysql](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-node-mysql)

</details>

Ensuite, il faut initialiser prisma dans votre projet.

```bash
npx prisma init
```

Une fois que c'est fait, vous allez avoir un dossier prisma qui va contenir un fichier prisma.schema ainsi qu'un fichier .env qui va contenir les informations de connexion à votre base de données.

### Et voilà ! Vous êtes prêt à commencer à utiliser prisma 🎉

## Création d'une base de données

Nous allons créer la base de données, avec laquelle nous allons travailler.

Pour cela, nous allons nous intéresser à la méthode MERISE qui va nous aider à créer notre base de données.

-   Un medecin peut avoir plusieurs patients
-   Un patient doit avoir au moins un medecin
-   Un patient peut avoir plusieurs rendez-vous
-   Un rendez-vous ne peut avoir qu'un seul patient
-   Un rendez-vous ne peut avoir qu'un seul medecin
-   Un medecin ne peut avoir qu'un seul etablissement
-   Un établissement peut avoir plusieurs medecins

<details>
<summary>Voilà le code pour l'avoir sur le site mocodo.net</summary>

Travaille, 0N Etablissement, 11 Medecin
Medecin: id, name, specialite
:

Etablissement: id, name
RendezVous, 1N Patient, 0N Medecin: Date
Patient: id, name, email

</details>

![MERISE](./mcd.png)

Maintenant que nous avons le modèle de notre base de données, nous allons pouvoir la créer.

## Création des tables

Voilà le modèle de notre base de données

```js
// prisma/schema.prisma

model Patient {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  name      String
  email     String   @unique
}

model Medecin {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  name      String
  email     String   @unique
  specialite String
}

model Etablisement {
  id        Int      @id @default(autoincrement())
  name      String
}

model RendezVous {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  date      DateTime
}
```

Mais il manque les relations entre les tables.

```js
// Avec les relations
model Patient {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  name      String
  email     String   @unique
  // relation avec rendezVous
  rendezVous RendezVous[]
}

model Medecin {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  name      String
  email     String   @unique
  specialite String
  // relation avec etablissement (FK)
  etablisementId Int
  etablisement Etablisement @relation(fields: [etablisementId], references: [id])
    // relation avec rendezVous
  rendezVous RendezVous[]
}

model Etablisement {
  id        Int      @id @default(autoincrement())
  name      String
  // relation avec medecin
  medecins  Medecin[]
}

model RendezVous {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  date      DateTime
  // relation avec patient (FK)
  patientId Int
  patient   Patient  @relation(fields: [patientId], references: [id])
  // relation avec medecin (FK)
  medecinId Int
  medecin   Medecin  @relation(fields: [medecinId], references: [id])
}
```

## Nos controlleurs

Nous allons le faire simple, un `CRUD` complet sur établissement, et un `Create` pour les autres, Toute façon, la doc est la pour nous au besoin !

Nous allons donc déplacer le fichier `router` dans le dossier `routes` et ajouter nos 4 routes.

Une fois cette chose faite, nous allons nous interesser aux controlleurs, tout ça on sait faire normalement;

Voilà le fichier une fois fini:

```js
// etablisement
router.get("/etablisements", etablisementControllers.browse);
router.get("/etablisements/:id", etablisementControllers.read);
router.put("/etablisements/:id", etablisementControllers.edit);
router.post("/etablisements", etablisementControllers.add);
router.delete("/etablisements/:id", etablisementControllers.destroy);

// la même pour tout le monde :joy:
```

## Installation de prisma client

Nous allons maintenant installer prisma client, pour cela, nous allons utiliser la commande `npm install @prisma/client`

Je vais l'installer dans le dossier models, comme précédemment, mais vous pouvez l'installer où vous voulez.

![prisma client](https://res.cloudinary.com/prismaio/image/upload/v1628761155/docs/FensWfo.png)

```js
const { PrismaClient } = require("@prisma/client");

// Nous rajoutons le log pour voir les requêtes SQL, mais vous pouvez le supprimer
const prisma = new PrismaClient({ log: ["query"] });

module.exports = prisma;
```

## Retour sur nos controlleurs

Voilà un exemple d'un crud complet sur établissement
Ici, nous n'avons pas de relation; Donc c'est facile, maintenant, nous allons voir comment faire avec des relations.

<details>
<summary>Détail Etablisement</summary>

```js
// Il faut require prisma
const prisma = require("../models/prisma");

const browse = async (req, res) => {
	// On utilise la méthode findMany() de prisma pour récupérer tous les établissements
	// doc: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
	const etablissements = await prisma.etablisement.findMany();
	console.log(etablissements);
	res.json(etablissements);
};

const read = async (req, res) => {
	// On utilise la méthode findUnique() de prisma pour récupérer un établissement
	// doc: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findunique
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
	// On utilise la méthode update() de prisma pour modifier un établissement
	// doc: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#update
	const etablissement = await prisma.etablisement.update({
		where: { id: parseInt(req.params.id, 10) },
		data: req.body,
	});
	res.json(etablissement);
};

const add = async (req, res) => {
	// On utilise la méthode create() de prisma pour créer un établissement
	// doc: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#create
	const etablissement = await prisma.etablisement.create({
		data: req.body,
	});
	res.json(etablissement);
};

const destroy = async (req, res) => {
	// On utilise la méthode delete() de prisma pour supprimer un établissement
	// doc: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#delete
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
```

</details>

Sans trop de problème en théorie, on copie colle pour les autres, mais il ne faut pas oublier de faire les requêtes avec les relations.

Mais si j'appel ça :

```url
http://localhost:5000/api/medecins/2
```

Je reçoit ça:

```js
{
	"id": 2,
	"createdAt": "2023-01-24T10:18:55.851Z",
	"name": "Vandanjon Benoît",
	"email": "benoît@medecin.com",
	"specialite": "code",
	"etablisementId": 3
}
```

Et si je veux mon établissement avec le médecin, je fais comment ?

## Les relations

Pour les relations, il faut utiliser la méthode `include` de prisma.

```js
const browse = async (req, res) => {
	// On utilise la méthode findMany() de prisma pour récupérer tous les établissements
	// doc: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#findmany
	const medecins = await prisma.medecin.findMany({
		include: {
			etablisement: true,
		},
	});
	res.json(medecins);
};
```

Puis je fait pareil pour les autres méthodes.

Si je souhaite détailler un médecin dans mon controller rendez vous par exemple, je peux faire comme ça :

```js
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
```

## Et voilà
