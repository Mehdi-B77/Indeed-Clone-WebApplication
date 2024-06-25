const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conventionSchema = new Schema(
	{
		description : {
			type: String,
			required: false,
		},
		etablissement: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Etablissement",
		},
		chercheur: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chercheur",
		},
        employeur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employeur",
        },
		candidature: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Candidature",
		},
		offre: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Offre",
		},
		status: {
			type: String,
			required: true,
		},
        pdf : {
            type: Buffer,
            required: false,
        },
	},
	{ timestamps: true }
);
const Convention = mongoose.model("Convention", conventionSchema);
module.exports = Convention;