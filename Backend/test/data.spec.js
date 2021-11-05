const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised)
const service = require('../src/service/data');

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

describe('Testing service files',()=>{
    it('Testing getBookingsByDate method for success scenario',async()=>{
        expect(await service.getBookingsByDate("2030-10-20")).to.be.not.undefined;
    });
    it('Testing getBookingsByDate method for failue scenario',async()=>{
       await expect(service.getBookingsByDate("2020-10-20")).to.be.rejectedWith("No Bookings on given date");
    });
    it('Testing bookTickets mehtod  for failure scenario',async()=>{
        await expect(service.bookTickets(bookObj1)).to.be.rejectedWith("Tickets are not booked,You can book maximum of 6 tickets on same number");
    });
    it('Testing bookTickets mehtod  for success scenario',async()=>{
        expect(await service.bookTickets(bookObj2)).to.be.not.undefined;
    });
});