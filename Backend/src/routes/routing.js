const express = require('express');
const routing = express.Router();
const service = require('../service/data');
const date = new Date();

routing.get('/setupDB',async(req,res,next)=>{
    try{
        let data = await service.insertScript();
        if(data){
            res.status(201);
            res.json({message : data.length+" Documents Inserted"});
        }
    }catch(err){
        next(err);
    }
});


routing.post('/book',async(req,res,next)=>{
    try{
        let data = await service.bookTickets(req.body);
        if(data){
            res.status(201);
            res.json({message: 'Booking Successfull !!! Booking Id : '+data.bookingId});
        }
    }catch(error){
        next(error);
    }
});

routing.get('/getBookings',async(req,res,next)=>{
    try{
        // console.log(req.query.date);
        let data = await service.getBookingsByDate(req.query.date);
        if(data){
            res.status(201);
            res.json({message :data});
        }
    }catch(error){
        next(error);
    }
});

routing.get('/seats',async(req,res,next)=>{
    try{
        let data = await service.getSeats();
        if(data){
            res.status(201);
            res.json({message : data});
        }
    }catch(error){
        next(error);
    } 
});
module.exports = routing;