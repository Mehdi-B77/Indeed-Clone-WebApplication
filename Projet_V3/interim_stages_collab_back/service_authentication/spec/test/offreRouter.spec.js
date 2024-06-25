const request = require('supertest');
const express = require('express');
const offreRouter = require('../../routers/offreRouter');
const {offreController} = require('../../controllers/offreController');

const app = express();
app.use(express.json());
app.use('/offres', offreRouter);

describe('GET /offres', () => {
    it('should handle internal server error', async () => {
        spyOn(offreController, 'getAllOffres').and.callFake((req, res, next) => {
            res.status(500).json({ message: 'Internal server error' });
        });

        const res = await request(app)
            .get('/offres')
            .send();

        expect(res.statusCode).toEqual(500);
       expect(res.body).toEqual(jasmine.objectContaining({ message: 'Internal server error' }));
    });
});