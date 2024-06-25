
const {
	employeurController,
} = require("../../controllers/employeurController");
const Employeur = require("../../../models/employeur");
const Contact = require("../../../models/contact");

describe("Employeur Controller", () => {
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
		contacts: ["contactId1", "contactId2"],
	};

	const mockContact = {
		_id: "contactId1",
		nom: "Mock Contact",
		email: "contact@example.com",
		telephone: "123456789",
	};

	const mockError = new Error("Internal Server Error");

	beforeEach(() => {
		spyOn(Employeur, "findOneAndUpdate").and.returnValue(
			Promise.resolve(mockEmployeur)
		);
		spyOn(Contact, "find").and.returnValue(Promise.resolve([mockContact]));
		spyOn(Contact.prototype, "save").and.returnValue(
			Promise.resolve(mockContact)
		);
	});

	describe("getEmployeur", () => {
		it("devrait retourner un employeur existant par ID", async () => {

			spyOn(Employeur, "findById").and.returnValue(
			Promise.resolve(mockEmployeur));


			const req = { params: { id: "mockId" } };
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.getEmployeur(req, res);
			expect(Employeur.findById).toHaveBeenCalledWith("mockId");
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.status().json).toHaveBeenCalledWith(mockEmployeur);
		});

		it("devrait retourner un message d'erreur si l'employeur n'existe pas", async () => {
			spyOn(Employeur, 'findById').and.returnValue(Promise.resolve(null));
			const req = { params: { id: "mockId" } };
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.getEmployeur(req, res);
			expect(Employeur.findById).toHaveBeenCalledWith("mockId");
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.status().json).toHaveBeenCalledWith("Employeur non trouvé");
		});

		it("devrait retourner un message d'erreur si une erreur se produit", async () => {
			// const mockError = new Error("Internal Server Error");
			spyOn(Employeur, "findById").and.returnValue(Promise.reject(mockError));
			const req = { params: { id: "mockId" } };
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.getEmployeur(req, res);
			expect(Employeur.findById).toHaveBeenCalledWith("mockId");
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith("Internal Server Error");
		});

	});

	describe("getAllEmployeurs", () => {
		it("devrait retourner tous les employeurs", async () => {
			spyOn(Employeur, "find").and.returnValue(Promise.resolve([mockEmployeur]));

			const req = {};
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.getAllEmployeurs(req, res);
			expect(Employeur.find).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.status().json).toHaveBeenCalledWith([mockEmployeur]);
		});

		it("devrait retourner un message d'erreur si aucun employeur n'est disponible", async () => {
			spyOn(Employeur, "find").and.returnValue(Promise.resolve(null));
			const req = {};
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.getAllEmployeurs(req, res);
			expect(Employeur.find).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(404);
			expect(res.status().json).toHaveBeenCalledWith("Aucun employeur disponible");
		});

		it("devrait retourner un message d'erreur si une erreur se produit", async () => {
			// const mockError = new Error("Internal Server Error");
			spyOn(Employeur, "find").and.returnValue(Promise.reject(mockError));
			const req = {};
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.getAllEmployeurs(req, res);
			expect(Employeur.find).toHaveBeenCalledWith();
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith("Internal Server Error");
		});
	});

	describe("getEmployeurByEmail", () => {
		it("devrait retourner un employeur existant par email", async () => {
			spyOn(Employeur, "findOne").and.returnValue(Promise.resolve(mockEmployeur));
			const req = { body: { email: "test@example.com" } };
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.getEmployeurByEmail(req, res);
			expect(Employeur.findOne).toHaveBeenCalledWith({
				email: "test@example.com",
			});
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.status().json).toHaveBeenCalledWith(mockEmployeur);
		});
		it("devrait retourner un message d'erreur si une erreur se produit", async () => {
			// const mockError = new Error("Internal Server Error");
			spyOn(Employeur, "findOne").and.returnValue(Promise.reject(mockError));
			const req = { body: { email: "test@gmail.com" } };
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.getEmployeurByEmail(req, res);
			expect(Employeur.findOne).toHaveBeenCalledWith({ email: "test@gmail.com" });
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith("Internal Server Error");
		});


		// it("devrait retourner un message d'erreur si l'employeur n'existe pas", async () => {
		// 	spyOn(Employeur, "findOne").and.returnValue(Promise.resolve(null));
		// 	const req = {req: { body: { email: undefined } }};
		// 	const res = {
		// 		status: jasmine
		// 			.createSpy()
		// 			.and.returnValue({ json: jasmine.createSpy() }),
		// 	};

		// 	await employeurController.getEmployeurByEmail(req, res);
		// 	expect(Employeur.findOne).toHaveBeenCalledWith({email: undefined});
		// 	expect(res.status).toHaveBeenCalledWith(404);
		// 	expect(res.status().json).toHaveBeenCalledWith("Employeur non trouvé");

		// });

	});

	describe("addEmployeur", () => {
		it("devrait ajouter un nouvel employeur", async () => {
			spyOn(Employeur.prototype, "save").and.returnValue(
			Promise.resolve(mockEmployeur)
		);
			const req = {
				body: {
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
					contacts: [mockContact],
				},
			};
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.addEmployeur(req, res);
			expect(Employeur.prototype.save).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.status().json).toHaveBeenCalledWith(mockEmployeur);
		});

		it("devrait retourner un message d'erreur si une erreur se produit", async () => {
			// const mockError = new Error("Internal Server Error");
			spyOn(Employeur.prototype, "save").and.returnValue(Promise.reject(mockError));
			const req = {
				body: {
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
					contacts: [mockContact],
				},
			};
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.addEmployeur(req, res);


			expect(Employeur.prototype.save).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(500);
			expect(res.status().json).toHaveBeenCalledWith("Internal Server Error");
		});
	});
});
