const express = require("express");
const cors = require("cors");
const Employeur = require("../models/employeur");
const Contact = require("../models/contact");
const Chercheur = require("../models/chercheur");
const Groupe = require("../models/groupe");
const Signalement = require("../models/signalement");
const Offre = require("../models/offre");
const Avertissement = require("../models/avertissement");
const Alerte = require("../models/alerte");
const Bloque = require("../models/bloque");
const Consultation = require("../models/consultation");
const Etablissement = require("../models/etablissement");
const connectDB = require("../database/connectDB");
const bcrypt = require("bcrypt");
const { verifyAccessToken } = require("./middlewares/verifyAccessToken");
const axios = require("axios");
const moment = require("moment");
const { mailer } = require("../service_authentication/utils/mailer");
connectDB();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const service = express();
const PORT = 3006;

service.use(cors({ origin: "*" }));
service.use(express.urlencoded({ extended: true }));
service.use(express.json());

// Affichage des requetes recues
service.use((req, res, next) => {
	console.log(`Request received: ${req.method} ${req.url}`);
	next();
});

// Fonction d'enregistrement dans le service registry
const registerService = async (serviceName, serviceVersion, servicePort) => {
	try {
		const response = await axios.put(
			`http://localhost:3001/register/${serviceName}/${serviceVersion}/${servicePort}`
		);
		console.log(response.data); // Log the response from the registry service
	} catch (error) {
		console.error("Error registering service:", error);
	}
};
registerService("users", "v1", PORT);

service.get("/users/profile", verifyAccessToken, async (req, res) => {
	const type = req.decoded.payloadAvecRole.type;
	const userId = req.decoded.payloadAvecRole._id;
	switch (type) {
		case "employeur":
			try {
				const employeur = await Employeur.findById(userId).populate("contacts");

				if (!employeur) {
					return res.status(404).json("Employeur non trouvé");
				}
				res.status(200).json(employeur);
				break;
			} catch (error) {
				return res.status(500).json({ message: "Internal server error" });
			}

		case "chercheur":
			try {
				const chercheur = await Chercheur.findById(userId).populate("alertes");
				if (!chercheur) {
					return res.status(404).json("Etudiant non trouvé");
				}
				res.status(200).json(chercheur);
				break;
			} catch (error) {
				return res.status(500).json({ message: "Internal server error" });
			}

			case "etablissement":
				try {
					const etablissement = await Etablissement.findById(userId).populate("contacts");
					if (!etablissement) {
						return res.status(404).json("Etablissement non trouvé");
					}
					res.status(200).json(etablissement);
					break;
				} catch (error) {
					return res.status(500).json({ message: "Internal server error" });
				}
	

}});
service.get("/users/getetablissement", async (req, res) => {
    try {
        const etablissements = await Etablissement.find();
        res.status(200).json(etablissements);
    } catch (error) {
        console.error("Erreur lors de la récupération des établissements:", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

service.put("/users/profile", verifyAccessToken, async (req, res) => {
	const userId = req.decoded.payloadAvecRole._id;
	const type = req.decoded.payloadAvecRole.type;

	switch (type) {
		case "chercheur":
			try {
				const {
					email,
					newPassword,
					oldPassword,
					nom,
					prenom,
					nationalite,
					ville,
					numero,
					cv,
				} = req.body;
				const chercheur = await Chercheur.findById(userId);
				if (!chercheur) {
					return res.status(404).json({ message: "Etudiant introuvable" });
				}
				if (email) chercheur.email = email;

				if (newPassword) {
					console.log(chercheur, newPassword);
					const isPasswordValid = await bcrypt.compare(
						oldPassword,
						chercheur.password
					);
					if (isPasswordValid) {
						chercheur.password = await bcrypt.hash(newPassword, 10);
					} else {
						return res.status(400).json({ message: "Mot de passe incorrect" });
					}
				}

				if (nom) chercheur.nom = nom;
				if (prenom) chercheur.prenom = prenom;
				if (nationalite) chercheur.nationalite = nationalite;
				if (ville) chercheur.ville = ville;
				if (numero) chercheur.numero = numero;
				if (cv) chercheur.cv = cv;

				await chercheur.save();
				return res.status(200).json({
					user: {
						type: "chercheur",
						email: chercheur.email,
						username: chercheur.nom + " " + chercheur.prenom,
						image: "",
					},
				});
			} catch (error) {
				console.error(error);
				return res.status(500).json({ message: "Internal server error" });
			}
		case "employeur":
			try {
				const {
					email,
					oldPassword,
					newPassword,
					entreprise,
					service,
					sous_service,
					numero_EDA,
					site_web,
					linkedin,
					facebook,
					rue,
					ville,
					spontanee,
					contact,
				} = req.body;
				const employeur = await Employeur.findById(userId);
				if (!employeur) {
					return res.status(404).json({ message: "Employeur introuvable" });
				}
				if (email) employeur.email = email;
				if (newPassword) {
					console.log(employeur, newPassword);
					const isPasswordValid = await bcrypt.compare(
						oldPassword,
						employeur.password
					);
					if (isPasswordValid) {
						employeur.password = await bcrypt.hash(newPassword, 10);
					} else {
						return res.status(400).json({ message: "Mot de passe incorrect" });
					}
				}

				if (entreprise) employeur.entreprise = entreprise;
				if (service) employeur.service = service;
				if (sous_service) employeur.sous_service = sous_service;
				if (numero_EDA) employeur.numero_EDA = numero_EDA;
				if (site_web) employeur.site_web = site_web;
				if (facebook) employeur.facebook = facebook;
				if (linkedin) employeur.linkedin = linkedin;
				if (rue) employeur.adresse.rue = rue;
				if (ville) employeur.adresse.ville = ville;
				if (spontanee !== null) employeur.spontanee = spontanee;

				if (contact) {
					const existingContact = await Contact.findById(contact.id);
					if (contact.nom) {
						existingContact.nom = contact.nom;
					}
					if (contact.email) {
						existingContact.email = contact.email;
					}
					if (contact.numero) {
						existingContact.numero = contact.numero;
					}
					await existingContact.save();
				}

				await employeur.save();
				return res.status(200).json({
					user: {
						type: "employeur",
						email: employeur.email,
						username: employeur.entreprise,
						image: "",
					},
				});
			} catch (error) {
				console.error(error);
				return res.status(500).json({ message: "Internal server error" });
			}
			case "etablissement":

			try {
				const {
				email,
				oldPassword,
				newPassword,
				nom,
				numero,
				type,
				rue,
				ville,
				contact,
			} = req.body;
			const etablissement = await Etablissement.findById(userId);
			if (!etatblissement) {
				return res.status(404).json({ message: "Etablissement introuvable" });
			}
			if (email) etablissement.email = email;
			if (newPassword) {
				console.log(etablissement, newPassword);
				const isPasswordValid = await bcrypt.compare(
					oldPassword,
					etablissement.password
				);
				if (isPasswordValid) {
					etablissement.password = await bcrypt.hash(newPassword, 10);
				} else {
					return res.status(400).json({ message: "Mot de passe incorrect" });
				}
			}

			if (nom) etablissement.nom =nom;
			if (type) etablissement.type = type;
			if (rue) etablissement.adresse.rue = rue;
			if (ville) etablissement.adresse.ville = ville;
			if (numero) etablissement.numero = numero;


			if (contact) {
				const existingContact = await Contact.findById(contact.id);
				if (contact.nom) {
					existingContact.nom = contact.nom;
				}
				if (contact.email) {
					existingContact.email = contact.email;
				}
				if (contact.numero) {
					existingContact.numero = contact.numero;
				}
				await existingContact.save();
			}

			await etablissement.save();
			return res.status(200).json({
				user: {
					type: "etablissement",
					email: etablissement.email,
					username: etablissement.nom,
					image: "",
				},
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
});

service.get("/users/employeurs", async (req, res) => {
	try {
		const employeurs = await Employeur.find({ valide: "Validé" });

		if (!employeurs) {
			return res.status(404).json("Employeurs introuvables");
		}
		res.status(200).json(employeurs);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.post("/users/consultations", async (req, res) => {
	const { lieu } = req.body;

	try {
		const consultation = new Consultation({
			lieu,
			IP: req.ip,
		});

		const savedConsultation = await consultation.save();

		return res.status(201).json(savedConsultation);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.get("/users/consultations", async (req, res) => {
	try {
		let { lieu } = req.query;
		let matchQuery = {};

		if (lieu) {
			matchQuery.lieu = lieu;
		} else {
			matchQuery.lieu = { $exists: true }; // Filtre les offres où le lieu est défini
		}

		// Agrégation par semaine
		const statisticsSemaine = await Consultation.aggregate([
			{
				$match: matchQuery,
			},
			{
				$project: {
					semaine: { $isoWeek: "$createdAt" },
					annee: { $isoWeekYear: "$createdAt" },
				},
			},
			{
				$group: {
					_id: {
						semaine: "$semaine",
						annee: "$annee",
					},
					total: { $sum: 1 },
				},
			},
		]);

		// Agrégation par mois
		const statisticsMois = await Consultation.aggregate([
			{
				$match: matchQuery,
			},
			{
				$project: {
					mois: { $month: "$createdAt" },
					annee: { $year: "$createdAt" },
				},
			},
			{
				$group: {
					_id: {
						mois: "$mois",
						annee: "$annee",
					},
					total: { $sum: 1 },
				},
			},
		]);

		res.status(200).json({
			statisticsSemaine,
			statisticsMois,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.post("/users/signaler", verifyAccessToken, async (req, res) => {
	const emetteur = req.decoded.payloadAvecRole._id;
	const type_emetteur = req.decoded.payloadAvecRole.type;
	const { titre, contenu, destinataire, type_destinataire } = req.body;
	try {
		const signalement = new Signalement({
			titre,
			contenu,
			type_emetteur,
			emetteur,
			type_destinataire,
			destinataire,
		});

		const savedSignalement = await signalement.save();

		const chercheur = await Chercheur.findById(destinataire);
		chercheur.signalements.push(signalement._id);
		chercheur.save();

		res.status(201).json(savedSignalement);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.post("/users/bloquer", verifyAccessToken, async (req, res) => {
	const emetteur = req.decoded.payloadAvecRole._id;
	const type_emetteur = req.decoded.payloadAvecRole.type;
	const { motif, destinataire, type_destinataire } = req.body;
	try {
		const bloque = new Bloque({
			motif,
			type_emetteur,
			emetteur,
			type_destinataire,
			destinataire,
		});

		const savedBloque = await bloque.save();

		res.status(201).json(savedBloque);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.get("/users", async (req, res) => {
	try {
		const employeurs = await Employeur.find({ valide: "Validé" });
		const chercheurs = await Chercheur.find();
		return res
			.status(200)
			.json({ employeurs: employeurs, chercheurs: chercheurs });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.post("/users/bloquerUser", async (req, res) => {
	try {
		const { type, id } = req.body;
		switch (type) {
			case "employeur":
				await Employeur.updateOne({ _id: id }, { bloque: true });
				console.log("Utilisateur bloqué");
				return res.status(200).json("Utilisateur  bloqué");
			case "chercheur":
				await Chercheur.updateOne({ _id: id }, { bloque: true });
				console.log("Utilisateur bloqué");
				return res.status(200).json("Utilisateur  bloqué");
			default:
				return res.status(400).json("Veuillez désigner le type");
		}
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.post("/users/debloquerUser", async (req, res) => {
	try {
		const { type, id } = req.body;
		switch (type) {
			case "employeur":
				await Employeur.updateOne({ _id: id }, { bloque: false });
				console.log("Utilisateur bloqué");
				return res.status(200).json("Utilisateur  débloqué");
			case "chercheur":
				await Chercheur.updateOne({ _id: id }, { bloque: false });
				console.log("Utilisateur bloqué");
				return res.status(200).json("Utilisateur  débloqué");
			default:
				return res.status(400).json("Veuillez désigner le type");
		}
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.post("/users/avertirUser", async (req, res) => {
	const emetteur = "660c0eaa42351aa9a67e559a";
	const type_emetteur = "gestionnaire";
	const { titre, contenu, destinataire, type_destinataire } = req.body;
	try {
		const avertissement = new Avertissement({
			type_emetteur,
			emetteur,
			type_destinataire,
			destinataire,
			titre,
			contenu,
		});

		const savedAvertissement = await avertissement.save();

		switch (type_destinataire) {
			case "employeur":
				const employeur = await Employeur.findById(destinataire);
				employeur.avertissements.push(savedAvertissement._id);
				employeur.save();
				break;
			case "chercheur":
				const chercheur = await Chercheur.findById(destinataire);
				chercheur.avertissements.push(savedAvertissement._id);
				chercheur.save();
				break;
		}
		res.status(201).json(savedAvertissement);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.get("/users/chercheurs/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		const chercheur = await Chercheur.findById(userId).populate(
			"avertissements signalements"
		);

		if (!chercheur) {
			return res.status(404).json("Etudiantintrouvable");
		}
		res.status(200).json(chercheur);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.get("/users/employeurs/:id", async (req, res) => {
	try {
		const userId = req.params.id;
		const employeur = await Employeur.findById(userId).populate(
			"contacts avertissements"
		);

		if (!employeur) {
			return res.status(404).json("Employeur introuvable");
		}
		res.status(200).json(employeur);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.post(
	"/users/chercheur/addGroupe",
	verifyAccessToken,
	async (req, res) => {
		try {
			const { nom, description } = req.body;
			const chercheur = req.decoded.payloadAvecRole._id;

			const groupe = new Groupe({
				nom,
				description,
				createur: chercheur,
				membres: [chercheur],
			});

			const savedGroupe = await groupe.save();

			const existingChercheur = await Chercheur.findById(chercheur);
			existingChercheur.groupes.push(savedGroupe._id);
			existingChercheur.save();

			res.status(201).json(savedGroupe);
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);

service.get("/users/chercheur/groupes", verifyAccessToken, async (req, res) => {
	try {
		const chercheur = req.decoded.payloadAvecRole._id;

		const existingChercheur = await Chercheur.findById(chercheur).populate({
			path: "groupes",
			populate: [
				{ path: "membres" },
				{ path: "createur" },
				{
					path: "offres",
					populate: [
						{ path: "offre", populate: { path: "employeur" } },
						{ path: "emetteur" },
					],
				},
			],
		});

		return res.status(200).json(existingChercheur.groupes);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.post(
	"/users/chercheur/addUserToGroupe",
	verifyAccessToken,
	async (req, res) => {
		try {
			const { id, email, numero } = req.body;
			const chercheur = req.decoded.payloadAvecRole._id;
			const chercheure = await Chercheur.findById(
				req.decoded.payloadAvecRole._id
			);
			const groupe = await Groupe.findById(id);
			if (chercheur.toString() !== groupe.createur.toString()) {
				res.status(403).json("Non autorisé");
			}

			if (email) {
				const existingChercheur = await Chercheur.findOne({ email: email });
				// Si l'utilisateur existe, l'ajouter dans le groupe
				if (existingChercheur) {
					groupe.membres.push(existingChercheur._id);
					await groupe.save();
					existingChercheur.groupes.push(groupe._id);
					await existingChercheur.save();
					res.status(200).json("Etudiantajouté");
				} else {
					// Si l'utilisateur n'existe pas envoyer un mail
					await mailer.sendMail({
						from: `${process.env.EMAIL}`,
						to: email,
						subject: "Invitation à un groupe",
						text: `${chercheure.nom} ${chercheure.prenom} veux vous ajouté au groupe ${groupe.nom} `,
					});
		
					res.status(201).json("Etudiantavec ce mail n'existe pas");
				}
			}

			if (numero) {
				const existingChercheur = await Chercheur.findOne({ numero: numero });
				// Si l'utilisateur existe, l'ajouter dans le groupe
				if (existingChercheur) {
					groupe.membres.push(existingChercheur._id);
					await groupe.save();
					existingChercheur.groupes.push(groupe._id);
					await existingChercheur.save();
					res.status(200).json("Etudiantajouté");
				} else {
					// Si l'utilisateur n'existe pas envoyer un SMS
					res.status(200).json("Etudiantavec ce numero n'existe pas");
				}
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);

service.post(
	"/users/chercheur/partagerOffreDansGroupe",
	verifyAccessToken,
	async (req, res) => {
		try {
			const { id_groupe, offre } = req.body;
			const chercheur = req.decoded.payloadAvecRole._id;

			const groupe = await Groupe.findById(id_groupe);
			groupe.offres.push({
				offre: offre,
				emetteur: chercheur,
				date: moment().format("YYYY-MM-DD à HH:mm"),
			});
			await groupe.save();
			return res
				.status(200)
				.json({ message: "Offre partagée dans le groupe avec succès" });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);

service.post("/users/chercheur/addAmi", verifyAccessToken, async (req, res) => {
	try {
		const { email, numero } = req.body;

		if (email || numero) {
			const chercheur = await Chercheur.findById(
				req.decoded.payloadAvecRole._id
			);
			let newAmis = {};
			if (email) {
				newAmis = await Chercheur.findOne({ email: email });
			} else {
				newAmis = await Chercheur.findOne({ numero: numero });
			}
			if (newAmis) {
				// Vérifier si l'utilisateur est déjà dans le tableau des amis
				const amiExistant = chercheur.amis.some((ami) =>
					ami.ami.equals(newAmis._id)
				);
				if (amiExistant) {
					return res
						.status(400)
						.json("L'utilisateur est déjà dans votre liste d'amis");
				}

				const nouvelAmi = {
					ami: newAmis,
				};
				const nouvelAmi1 = {
					ami: chercheur,
				};
				chercheur.amis.push(nouvelAmi);
				newAmis.amis.push(nouvelAmi1);

				await chercheur.save();
				await newAmis.save();

				return res.status(201).json("Ami ajouté");
			} else {
				await mailer.sendMail({
					from: `${process.env.EMAIL}`,
					to: email,
					subject: "Demande d'ami",
					text: `${chercheur.nom} ${chercheur.prenom} veux vous ajouté en ami `,
				});
				return res.status(202).json("Utilisateur introuvable");
			}
		} else {
			res.status(400).json("Email manquant");
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.get("/users/chercheur/amis", verifyAccessToken, async (req, res) => {
	try {
		const chercheur = req.decoded.payloadAvecRole._id;

		const existingChercheur = await Chercheur.findById(chercheur).populate({
			path: "amis",
			populate: [
				{ path: "ami" },
				{ path: "offresPartagees.offre", populate: { path: "employeur" } },
				{ path: "offresPartagees.emetteur" },
			],
		});

		return res.status(200).json(existingChercheur.amis);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.post(
	"/users/chercheur/partagerAmi",
	verifyAccessToken,
	async (req, res) => {
		try {
			const { id_ami, offre } = req.body;
			const chercheur = await Chercheur.findById(
				req.decoded.payloadAvecRole._id
			);
			const ami = await Chercheur.findById(id_ami);

			if (!ami) {
				return res.status(404).json({ message: "L'ami spécifié n'existe pas" });
			}
			const offreExistante = await Offre.findById(offre);
			if (!offreExistante) {
				return res
					.status(404)
					.json({ message: "L'offre spécifiée n'existe pas" });
			}

			const indexAmi = chercheur.amis.findIndex((ami) =>
				ami.ami.equals(id_ami)
			);
			const indexAmi1 = ami.amis.findIndex((ami) =>
				ami.ami.equals(chercheur._id)
			);

			const Partage = {
				offre: offre,
				emetteur: chercheur,
				date: moment().format("YYYY-MM-DD à HH:mm"),
			};

			chercheur.amis[indexAmi].offresPartagees.push(Partage);
			ami.amis[indexAmi1].offresPartagees.push(Partage);

			await ami.save();
			await chercheur.save();

			return res
				.status(200)
				.json({ message: "Offre partagée avec votre amis avec succès" });
		} catch (error) {
			console.log(error);
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);

service.get("/users/statistics", async (req, res) => {
	try {
		const nombreEmployeurs = (await Employeur.find()).length;
		const nombreChercheurs = (await Chercheur.find()).length;
		const nombreEtablissements = (await Etablissement.find()).length;
		const nombreInscrits = nombreEmployeurs + nombreChercheurs;

		res.status(200).json({
			inscrits: nombreInscrits,
			employeurs: nombreEmployeurs,
			chercheurs: nombreChercheurs,
			etablissement: nombreEtablissements,

		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.listen(PORT, () => {
	console.log(`service running on port ${PORT}`);
});
