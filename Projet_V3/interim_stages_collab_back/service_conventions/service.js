const express = require("express");
const cors = require("cors");
const Offre = require("../models/offre");
const Candidature = require("../models/candidature");
const Dossier = require("../models/dossier");
const Chercheur = require("../models/chercheur");
const Reponse = require("../models/reponse");
const Emploi = require("../models/emploi");
const Notification = require("../models/notification");
const Employeur = require("../models/employeur");
const Etablissement = require("../models/etablissement");

const Probleme = require("../models/probleme");
const Convention = require("../models/convention");
const connectDB = require("../database/connectDB");
const { verifyAccessToken } = require("./middlewares/verifyAccessToken");
const axios = require("axios");
const moment = require("moment");
const multer = require('multer');
const upload = multer();
const service = express();
const PORT = 3010;

service.use(cors({ origin: "*" }));
service.use(express.urlencoded({ extended: true, limit: "50mb" }));
service.use(express.json({ limit: "50mb" }));

service.use(express.static("public"));

connectDB();

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
registerService("conventions", "v1", PORT);

service.get("/conventions/chercheur", verifyAccessToken, async (req, res) => {
	try {
		const userId = req.decoded.payloadAvecRole._id;
		const conventions = await Convention.find({ chercheur: userId })
    .populate('chercheur', 'nom') // Remplacez 'nom' par les champs pertinents de l'entité Chercheur
    .populate('employeur', 'entreprise') // Remplacez 'nom' par les champs pertinents de l'entité Employeur
   // .populate('etablissement', 'nom');
		return res.status(200).json(conventions);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});
service.get("/conventions/etablissement", verifyAccessToken, async (req, res) => {
	try {
		const userId = req.decoded.payloadAvecRole._id;
		const conventions = await Convention.find({ etablissement: userId })
    .populate('chercheur', 'nom') // Remplacez 'nom' par les champs pertinents de l'entité Chercheur
    .populate('employeur', 'entreprise') // Remplacez 'nom' par les champs pertinents de l'entité Employeur
    .populate('etablissement', 'nom');
		return res.status(200).json(conventions);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});
service.get("/conventions/employeur", verifyAccessToken, async (req, res) => {
	try {
		const userId = req.decoded.payloadAvecRole._id;
		const conventions = await Convention.find({ employeur: userId })
    .populate('chercheur', 'nom') // Remplacez 'nom' par les champs pertinents de l'entité Chercheur
    .populate('employeur', 'entreprise') // Remplacez 'nom' par les champs pertinents de l'entité Employeur
    .populate('etablissement', 'nom');
		return res.status(200).json(conventions);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.post("/conventions/etablissement/add", verifyAccessToken, async (req, res) => {
	try {
        const pdfData = req.body.pdfData; 
		const etablissement = req.decoded.payloadAvecRole._id;
		const chercheur =req.body.selectedChercheur;
		const employeur =req.body.selectedEmployeur;
        const pdfBuffer = Buffer.from(pdfData, 'base64');
		console.log(req.body.selectedId);
		await Convention.updateOne(
			{ _id: req.body.selectedId },
			{ status: "Attente employeur" ,
			 pdf: pdfBuffer }
		);

		let notification = new Notification({
			type: "Convention Ajouté",
			contenu: "L'etablissement a ajouté une convention",
			lien: "/conventions/chercheur" + req.body.selectedId,
			date_creation: moment().format("YYYY-MM-DD"),
			date_lecture: "",
			statut: "non lu",
			type_recepteur: "chercheur",
			recepteur: chercheur,
		});
		let notification1 = new Notification({
			type: "Convention Ajouté",
			contenu: "L'etablissement a ajouté une convention",
			lien: "/conventions/employeur" + req.body.selectedId,
			date_creation: moment().format("YYYY-MM-DD"),
			date_lecture: "",
			statut: "non lu",
			type_recepteur: "employeur",
			recepteur: employeur,
		});
		await notification.save();
		await notification1.save();

		return res.status(200).json();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});
service.post("/conventions/chercheur/add", verifyAccessToken, async (req, res) => {
	try {
        const pdfData = req.body.pdfData; 
        const chercheur = req.decoded.payloadAvecRole._id;
        const etablissement = req.body.selectedEtablissement;
        const employeur = req.body.selectedEmployeur;

        const pdfBuffer = Buffer.from(pdfData, 'base64');
        await Convention.updateOne(
            { _id: req.body.selectedId },
            { pdf: pdfBuffer }
        );

        return res.status(200).json({ message: 'Fichier PDF ajouté avec succès !' });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du fichier PDF :', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
service.post("/conventions/employeur/add", verifyAccessToken, async (req, res) => {
	try {
		const pdfData = req.body.pdfData; 
		const employeur = req.decoded.payloadAvecRole._id;
		const etablissement =req.body.selectedEtablissement;
		const chercheur=req.body.selectedChercheur;
        const pdfBuffer = Buffer.from(pdfData, 'base64');
        await Convention.updateOne(
            { _id: req.body.selectedId },
            { pdf: pdfBuffer }
        );
        return res.status(200).json({ message: 'Fichier PDF ajouté avec succès !' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});
service.post("/conventions/chercheur/valide", verifyAccessToken, async (req, res) => {
	try {
		const stagiaire = req.decoded.payloadAvecRole._id;
		const etablissement = req.body.selectedEtablissement;
		const employeur = req.body.selectedEmployeur;
		const selectedId = req.body.selectedId;
		const conventionv =  await Convention.findById(selectedId);

		let statusToUpdate;
		let notificationContenu;
		let lienNotificationEtablissement;
		let lienNotificationEmployeur;

		if (conventionv.status === "Attente stagiaire") {
			statusToUpdate = "procédure terminée";
			notificationContenu = "La convention est terminée.";
			lienNotificationEtablissement = "/conventions/etablissement" + selectedId;
			lienNotificationEmployeur = "/conventions/employeur" + selectedId;
		
		} else {
			return res.status(400).json({ message: "Invalid convention status" });
		}

		await Convention.updateOne(
			{ _id: selectedId },
			{ status: statusToUpdate }
		);

		let notificationEmployeur = new Notification({
			type: "Convention Validé",
			contenu: notificationContenu,
			lien: lienNotificationEmployeur,
			date_creation: moment().format("YYYY-MM-DD"),
			date_lecture: "",
			statut: "non lu",
			type_recepteur: "employeur",
			recepteur: employeur,
		});

		await notificationEmployeur.save();

		if (lienNotificationEtablissement) {
			let notificationEtablissement = new Notification({
				type: "Convention Validé",
				contenu: notificationContenu,
				lien: lienNotificationEtablissement,
				date_creation: moment().format("YYYY-MM-DD"),
				date_lecture: "",
				statut: "non lu",
				type_recepteur: "etablissement",
				recepteur: etablissement,
			});
			await notificationEtablissement.save();
		}
		if (statusToUpdate == "procédure terminée"){
			// Création de l'emploi pour le chercheur
			const agenda = false;
			const chercheur = conventionv.chercheur;
			const offre = conventionv.offre;
			const emploi = new Emploi({ agenda, chercheur, offre });
			emploi.save();
			
		}
		return res.status(200).json();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

service.post("/conventions/employeur/valide", verifyAccessToken, async (req, res) => {
	try {
		const employeur = req.decoded.payloadAvecRole._id;
		const etablissement = req.body.selectedEtablissement;
		const stagiaire = req.body.selectedChercheur;
		const selectedId = req.body.selectedId;
		const conventionv =  await Convention.findById(selectedId);
		let statusToUpdate;
		let notificationContenu;
		let lienNotificationEtablissement;
		let lienNotificationChercheur;

		if (conventionv.status === "Attente employeur") {
			statusToUpdate = "Attente stagiaire";
			notificationContenu = "Un employeur a validé une convention.";
			lienNotificationChercheur = "/conventions/chercheur" + selectedId;
		} else {
			return res.status(400).json({ message: "Invalid convention status" });
		}

		await Convention.updateOne(
			{ _id: selectedId },
			{ status: statusToUpdate }
		);

		let notificationEmployeur = new Notification({
			type: "Convention Validé",
			contenu: notificationContenu,
			lien: lienNotificationChercheur,
			date_creation: moment().format("YYYY-MM-DD"),
			date_lecture: "",
			statut: "non lu",
			type_recepteur: "chercheur",
			recepteur: stagiaire,
		});

		await notificationEmployeur.save();
		return res.status(200).json();
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});


service.post(
	"/conventions/chercheur/annule",
	verifyAccessToken,
	async (req, res) => {
		const id_convention = req.body.id;
		const updatedCandidature = await Convention.findById(id_convention);

		try {
			await Convention.updateOne(
				{ _id: id_convention },
				{ status: "Annulé par stagiaire" }
			);
			let notification = new Notification({
				type: "Convention Annulé",
				contenu: "Un etudiant a annulé une convention",
				lien: "/conventions/etablissement" + req.body.selectedId,
				date_creation: moment().format("YYYY-MM-DD"),
				date_lecture: "",
				statut: "non lu",
				type_recepteur: "etablissement",
				recepteur: updatedCandidature.etablissement,
			});
			let notification1 = new Notification({
				type: "Convention Annulé",
				contenu: "Un etudiant a annulé une convention",
				lien: "/conventions/employeur" + req.body.selectedId,
				date_creation: moment().format("YYYY-MM-DD"),
				date_lecture: "",
				statut: "non lu",
				type_recepteur: "employeur",
				recepteur: updatedCandidature.employeur,
			});
			await notification.save();
			await notification1.save();

			console.log("Convention annulé");
			return res.status(200).json(updatedCandidature);
		} catch (error) {
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);
service.post(
	"/conventions/employeur/annule",
	verifyAccessToken,
	async (req, res) => {
		const id_convention = req.body.id;
		const updatedCandidature = await Convention.findById(id_convention);
		try {
			await Convention.updateOne(
				{ _id: id_convention },
				{ status: "Annulé par employeur" }
			);
			let notification = new Notification({
				type: "Convention Annulé",
				contenu: "Un employeur a annulé une convention",
				lien: "/conventions/etablissement" + req.body.selectedId,
				date_creation: moment().format("YYYY-MM-DD"),
				date_lecture: "",
				statut: "non lu",
				type_recepteur: "etablissement",
				recepteur: updatedCandidature.etablissement,
			});
			let notification1 = new Notification({
				type: "Convention Annulé",
				contenu: "Un employeur a annulé une convention",
				lien: "/conventions/chercheur" + req.body.selectedId,
				date_creation: moment().format("YYYY-MM-DD"),
				date_lecture: "",
				statut: "non lu",
				type_recepteur: "chercheur",
				recepteur: updatedCandidature.chercheur,
			});
			await notification.save();
			await notification1.save();

			console.log("Convention annulé");
			return res.status(200).json(updatedCandidature);
		} catch (error) {
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);
service.post(
	"/conventions/etablissement/annule",
	verifyAccessToken,
	async (req, res) => {
		const id_convention = req.body.id;
		const updatedCandidature = await Convention.findById(id_convention);

		try {
			await Convention.updateOne(
				{ _id: id_convention },
				{ status: "Annulé par etablissement" }
			);
			let notification = new Notification({
				type: "Convention Annulé",
				contenu: "Un etablissement a annulé une convention",
				lien: "/conventions/employeur" + req.body.selectedId,
				date_creation: moment().format("YYYY-MM-DD"),
				date_lecture: "",
				statut: "non lu",
				type_recepteur: "employeur",
				recepteur: updatedCandidature.employeur,
			});
			let notification1 = new Notification({
				type: "Convention Annulé",
				contenu: "Un etablissement a annulé une convention",
				lien: "/conventions/chercheur" + req.body.selectedId,
				date_creation: moment().format("YYYY-MM-DD"),
				date_lecture: "",
				statut: "non lu",
				type_recepteur: "chercheur",
				recepteur: updatedCandidature.chercheur,
			});
			await notification.save();
			await notification1.save();

			console.log("Convention annulé");
			return res.status(200).json(updatedCandidature);
		} catch (error) {
			return res.status(500).json({ message: "Internal server error" });
		}
	}
);


service.get("/conventions/:id/pdf", async (req, res) => {
    try {
        // Trouvez la convention dans la base de données
        const convention = await Convention.findById(req.params.id);

        // Vérifiez si la convention existe et si elle contient des données PDF
        if (!convention || !convention.pdf) {
            return res.status(404).json({ message: "Convention non trouvée ou PDF non disponible" });
        }

        // Décoder les données PDF encodées en base64 en données binaires
        const pdfBinaryData = Buffer.from(convention.pdf, 'base64');

        // Définissez le type de contenu de la réponse comme PDF
        res.setHeader('Content-Type', 'application/pdf');

        // Envoyez les données binaires du PDF dans la réponse
        res.send(pdfBinaryData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur interne du serveur" });
    }
});

service.listen(PORT, () => {
	console.log(`service running on port ${PORT}`);
});

