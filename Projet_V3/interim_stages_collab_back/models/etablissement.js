const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const etablissementSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
		},
		password : {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: false,
		},
		nom: {
			type: String,
			required: true,
		},
		numero: {
			type: String,
			required: false,
		},
		adresse: {
			rue: { type: String, required: false },
			ville: { type: String, required: true },
		},
		contacts: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Contact",
			},
		],
		chercheurs: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Chercheur",
			},
		],
	},
);
const Etablissement = mongoose.model("Etablissement", etablissementSchema);
module.exports = Etablissement;