const { expect } = require('chai');
const  request = require('supertest');
const app = require('../src/app');

let bookObj1 = {
    "mobile" : 8889997777,
    "dateOfJourney" : "2030-10-20",
    "seats" : ["A177","A178","A179","A180"]
}
let bookObj2 = {
    "mobile" : 8889997777,
    "dateOfJourney" : "2030-10-20",
    "seats" : ["A177","A178","A179"]
}
describe('Testing app',()=>{
    it('Testing app get method of getBookings url for success scenario',async()=>{
        const res = await request(app).get('/getBookings?date=2030-10-20');
        expect(res.statusCode).to.equal(201);
    });
    it('Testing app get method of getBookings url for failure scenario',async()=>{
        const res = await request(app).get('/getBookings?date=2020-10-20');
        expect(res.statusCode).to.equal(404);
    });
    it('Testing app post mehtod of book url for failure scenario',async()=>{
        const res = await request(app).post('/book').send(bookObj1);
        expect(res.statusCode).to.equal(500);
    });
    it('Testing app post mehtod of book url for success scenario',async()=>{
        const res = await request(app).post('/book').send(bookObj2);
        expect(res.statusCode).to.equal(201);
    });
    it('Tesing app setupDB',async()=>{
        const res = await request(app).get('/setupDB');
        expect(res.statusCode).to.equal(201);
    });
});