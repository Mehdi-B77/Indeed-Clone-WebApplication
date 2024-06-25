const request = require('supertest');
const express = require('express');
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createAccessToken, createRefreshToken } = require('../../utils/tokens');
const {verifyRefreshToken} = require('../../middlewares/verifyRefreshToken');
const {generateConfirmationCode} = require('../../utils/generateConfirmationCode');
const {getDestination, upload} = require('../../utils/uploadFile');



const authRouter = require('../../routers/authRouter');
const User = require('../../../models/user');
const Etablissement = require('../../../models/etablissement');
const Reponse = require('../../../models/reponse');
const {employeurController} = require('../../controllers/employeurController');
const { disconnect } = require('process');
const Employeur = require('../../../models/employeur');
const mockError = new Error("Internal Server Error");




const app = express();
app.use(express.json());
app.use('/test', verifyRefreshToken, (req, res) => res.status(200).json({ message: 'Success' }));
app.use('/auth', authRouter);

//Test du verify access token

describe('verifyRefreshToken middleware', () => {
    it('should handle missing refresh token', async () => {
        const res = await request(app).get('/test');

        expect(res.statusCode).toEqual(403);
        expect(res.body).toEqual(jasmine.objectContaining({ message: 'Refresh token is missing' }));
    });

    it('should handle invalid refresh token', async () => {
        spyOn(jwt, 'verify').and.callFake((token, secret, callback) => callback(true)); // Simulate jwt.verify error

        const res = await request(app)
            .get('/test')
            .send({ refreshToken: 'invalid_token' });

        expect(res.statusCode).toEqual(403);
        expect(res.body).toEqual(jasmine.objectContaining({ message: 'Failed to authenticate refresh token' }));
    });

    it('should handle valid refresh token', async () => {
        spyOn(jwt, 'verify').and.callFake((token, secret, callback) => callback(null, { userId: '123' })); // Simulate valid token

        const res = await request(app)
            .get('/test')
            .send({ refreshToken: 'valid_token' });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(jasmine.objectContaining({ message: 'Success' }));
    });
});

//Test des utils 
//Confirmation code
describe('generateConfirmationCode', () => {
    it('should generate a 6 character string', () => {
        const code = generateConfirmationCode();
        expect(typeof code).toBe('string');
        expect(code.length).toBe(6);
    });

    it('should generate a string in uppercase', () => {
        const code = generateConfirmationCode();
        expect(code).toBe(code.toUpperCase());
    });
});

//tokens
describe('Tokens', () => {
    it('should create an access token', () => {
        const userPayload = { userId: '123' };
        const type = 'access';
        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_ACCESS_TOKEN_EXPIRES;

        spyOn(jwt, 'sign');

        createAccessToken(type, userPayload);

        expect(jwt.sign).toHaveBeenCalledWith({ payloadAvecRole: { ...userPayload, type } }, secret, { expiresIn });
    });

    it('should create a refresh token', () => {
        const userPayload = { userId: '123' };
        const type = 'refresh';
        const secret = process.env.JWT_REFRESH_SECRET;
        const expiresIn = process.env.JWT_REFRESH_TOKEN_EXPIRES;

        spyOn(jwt, 'sign');

        createRefreshToken(type, userPayload);

        expect(jwt.sign).toHaveBeenCalledWith({ userPayload: { ...userPayload, type } }, secret, { expiresIn });
    });
});

//uploadFile
describe('getDestination', () => {
    it('should create a new directory if it does not exist', () => {
        const req = { params: { folderName: 'testFolder' } };
        const file = { fieldname: 'image' };

        spyOn(fs, 'existsSync').and.returnValue(false);
        const mkdirSyncSpy = spyOn(fs, 'mkdirSync');

        getDestination(req, file, () => {});

        expect(mkdirSyncSpy).toHaveBeenCalledWith('./public/uploads/testFolder', { recursive: true });
    });

    it('should not create a new directory if it already exists', () => {
        const req = { params: { folderName: 'testFolder' } };
        const file = { fieldname: 'image' };

        spyOn(fs, 'existsSync').and.returnValue(true);
        const mkdirSyncSpy = spyOn(fs, 'mkdirSync');

        getDestination(req, file, () => {});

        expect(mkdirSyncSpy).not.toHaveBeenCalled();
    });
});

describe('GET auth/login', () => {
    it('should return 400 if email or password is missing', async () => {
        const response = await request(app).get('/auth/login').send({ email: 'test@gmail.com' });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Email or Password missing');
    });
});

describe('GET /auth/inscriptions/:id', () => {
    it('should return 200 if the employer is found', async () => {
        const employeur = new Employeur({ _id: '123' , email: 'test@gmail.com', password: 'test' });

        spyOn(employeurController, 'getEmployeur').and.returnValue(Promise.resolve(employeur));
        const response = await request(app).get('/auth/inscriptions/123');
        expect(response.status).toBe(200);
        expect(response.body.message).toEqual("Employeur found");
    });

    // it('should return 500 if there is an internal server error', async () => {
        
    //     spyOn(employeurController, 'getEmployeur').and.returnValue(Promise.reject());

    //     const response = await request(app).get('/auth/inscriptions/123');

    //     expect(response.status).toBe(500);
    //     expect(response.body.message).toBe('Internal server error');
    // });
});

describe('POST /auth/inscriptions/contact', () => {
    it('should return 201 if the response is saved successfully', async () => {
        const reponse = new Reponse({
            type_emetteur: 'test',
            emetteur: 'test',
            type_destinataire: 'test',
            destinataire: 'test',
            titre: 'test',
            contenu: 'test',
        });

        spyOn(Reponse.prototype, 'save').and.returnValue(Promise.resolve(reponse));

        const response = await request(app)
            .post('/auth/inscriptions/contact')
            .send({
                type_emetteur: 'test',
                emetteur: 'test',
                type_destinataire: 'test',
                destinataire: 'test',
                titre: 'test',
                contenu: 'test',
            })
     
        expect(response.status).toBe(201);
        expect(response.body.type_emetteur).toBe(reponse.type_emetteur);
        expect(response.body.emetteur).toBe(reponse.emetteur);
        expect(response.body.type_destinataire).toBe(reponse.type_destinataire);
        expect(response.body.destinataire).toBe(reponse.destinataire);
        expect(response.body.titre).toBe(reponse.titre);
        expect(response.body.contenu).toBe(reponse.contenu); 

    });
});    





describe('POST /auth/inscription/reponses', () => {

    it('should return 200 and the responses if the request is valid', async () => {
        const mockResponses = [{ _id: '1', emetteur: 'testId', /* other fields */ }];
        spyOn(Reponse, 'find').and.returnValue(Promise.resolve(mockResponses));

        const response = await request(app)
            .post('/auth/inscriptions/reponses')
            .send({ _id: 'testId' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResponses);
    });
});
