const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gestionnaireSchema = new Schema(
	{
		
		password: {
			type: String,
			required: true,
		},
		
		nom: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
const Gestionnaire = mongoose.model("Gestionnaire", gestionnaireSchema);
module.exports = Gestionnaire;
