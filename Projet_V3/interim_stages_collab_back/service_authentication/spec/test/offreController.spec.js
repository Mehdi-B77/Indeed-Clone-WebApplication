const { offreController } = require("../../controllers/offreController");
const Offre = require("../../../models/offre");
const Employeur = require("../../../models/employeur");
const mongoose = require("mongoose");

describe("Offre Controller", () => {
	const mockEmployeur = {
		_id: "mockId",
		email: "test@example.com",
		password: "test123",
		entreprise: "Mock Entreprise",
		service: "Mock Service",
		sous_service: "Mock Sous-Service",
		numero_EDA: "123456",
		site_web: "http://mocksite.com",
		linkedin: "http://linkedin.com/mock",
		facebook: "http://facebook.com/mock",
		adresse: "Mock Address",
		contacts: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
	};
	const mockOffre = {
		_id: "id_offre",
		employeur: mockEmployeur,
	};

	beforeEach(() => {
		
		spyOn(Offre.prototype, "save").and.returnValue(Promise.resolve(mockOffre));
	});

	describe("getOffre", () => {
		it("devrait retourner une offre existante par ID", async () => {
            spyOn(Offre, "findById").and.returnValue(Promise.resolve(mockOffre));
            spyOn(Employeur, "findById").and.returnValue(Promise.resolve(mockEmployeur));
			const req = { params: { id: "offre_id" } };
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await offreController.getOffre(req, res);

			expect(Offre.findById).toHaveBeenCalledWith("offre_id");
            expect(Employeur.findById).toHaveBeenCalledWith(mockOffre.employeur);
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.status().json).toHaveBeenCalledWith(mockOffre);
		});

        it("devrait retourner une erreur 404 si l'offre n'existe pas", async () => {
            spyOn(Offre, "findById").and.returnValue(Promise.resolve(null));
            const req = { params: { id: "offre_id" } };
            const res = {
                status: jasmine
                    .createSpy()
                    .and.returnValue({ json: jasmine.createSpy() }),
            };

            await offreController.getOffre(req, res);

            expect(Offre.findById).toHaveBeenCalledWith("offre_id");
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.status().json).toHaveBeenCalledWith("Offre non trouvée");
        });

});    

        it("devrait retourner une erreur 500 si une erreur se produit", async () => {
            spyOn(Offre, "findById").and.throwError("Erreur");
            const req = { params: { id: "offre_id" } };
            const res = {
                status: jasmine
                    .createSpy()
                    .and.returnValue({ json: jasmine.createSpy() }),
            };

            await offreController.getOffre(req, res);

            expect(Offre.findById).toHaveBeenCalledWith("offre_id");
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.status().json).toHaveBeenCalledWith("Internal Server Error");
        });
    describe("getAllOffres", () => {
        it("devrait retourner toutes les offres avec les informations sur les employeurs", async () => {   
            spyOn(Offre, "find").and.returnValue(Promise.resolve([mockOffre]));
            spyOn(Employeur, "findById").and.returnValue(Promise.resolve(mockEmployeur));
            const req = {};
            const res = {
                status: jasmine
                    .createSpy()
                    .and.returnValue({ json: jasmine.createSpy() }),
            };

            await offreController.getAllOffres(req, res);

            expect(Offre.find).toHaveBeenCalled();
            expect(Employeur.findById).toHaveBeenCalledWith(mockOffre.employeur);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.status().json).toHaveBeenCalledWith([mockOffre]);
    });
});

});
