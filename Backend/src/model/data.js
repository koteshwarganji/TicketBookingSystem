const connection = require('../utilities/connection');
const data = require('../model/data.json');
let model = {}
let createCollection = async()=>{
    collection = await connection.getCollection();
}


model.insertScript = async()=>{
    await collection.deleteMany();
    let response = await collection.insertMany(data);
    if(response && response.length>0){
        return response;
    }else{
        return null;
    }
}

model.generateId = async()=>{
    let bookingIdsCount = await collection.count();
    return bookingIdsCount+1000+1;
}

model.checkNoOfTicketsBooked = async(bookingObj)=>{
    let dataObjects = await collection.find({mobile : bookingObj.mobile});//check if mobile number already in db
    console.log(dataObjects,dataObjects.seats);
    
    if(dataObjects && dataObjects.length>0){
       let noOfBookedTickets = 0;
       for(let i=0;i<dataObjects.length;i++){
           noOfBookedTickets = noOfBookedTickets+dataObjects[i].seats.length;
       }
       let bookingTicketsNow = bookingObj.seats.length;
       if(noOfBookedTickets+bookingTicketsNow>6){
           return false;
       }else{
           return true;
       }
    }else{
        return true;
    }
}

model.bookTickets = async(bookingObj)=>{

    let isEligibleForBooking = await model.checkNoOfTicketsBooked(bookingObj);
    if(isEligibleForBooking){
        let nextId = await model.generateId();
        bookingObj.bookingId = await nextId;
        // bookingObj.dateOfJourney =new Date(bookingObj.dateOfJourney).toLocaleDateString();
        let data = await collection.create(bookingObj);
        if(data){
            console.log(data);
            return data;
        }else{
           return null;
        }
    }else{
        return null;
    }
    
}

model.getBookingsByDate = async(date)=>{
    let bookings = await collection.find({},{_id:0,bookingId : 1,seats : 1,dateOfJourney : 1,mobile : 1});
    result = [];
    for(let i=0;i<bookings.length;i++){
        console.log(bookings[i],bookings[i].dateOfJourney.toLocaleDateString(),new Date(date).toLocaleDateString());
        if(bookings[i].dateOfJourney.toLocaleDateString()==new Date(date).toLocaleDateString()){
            console.log(bookings[i].dateOfJourney.toLocaleDateString())
            result.push(bookings[i]);
        }
    }
    if(result.length>0){
        return result;
    }else{
        return null;
    }

}

model.getSeats = async()=>{
    // console.log('hi')
    let seats = await collection.find({},{_id : 0, seats : 1});
    // console.log(seats);
    if(seats && seats.length > 0){
        return seats;
    }else{ 
        return null;
    }
}

createCollection();
// model.getBookingsByDate("10/29/2021")
module.exports = model;

// console.log(new Date(showDate).toLocaleDateString()>=new Date().toLocaleDateString());

