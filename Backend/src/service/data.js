const model = require('../model/data');
let service = {};

service.insertScript = async()=>{
    let data = model.insertScript();
    if(data){
        return data;
    }else{
        let error = new Error("Script Insertion Failed");
        error.status = 500;
        throw error;
    }
}

service.bookTickets = async(bookingObj)=>{
    let data = await model.bookTickets(bookingObj);
    if(data){
        return data;
    }else{
        let error = new Error("Tickets are not booked,You can book maximum of 6 tickets on same number");
        error.status=500;
        throw error;
    }
}

service.getBookingsByDate = async(date)=>{
    let bookings = await model.getBookingsByDate(date);
    if(bookings){
        return bookings;
    }else{
        let error = new Error("No Bookings on given date");
        error.status = 404;
        throw error;
    }
}

service.getSeats = async()=>{
    
    let seats = await model.getSeats();
    if(seats){
        return seats;
    }else{
        let error = new Error("No Seats available");
        error.status = 404;
        throw error;
    }
}
module.exports = service;