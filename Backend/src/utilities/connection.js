const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
// mongoose.set('useCreateIndex',true);
const url = 'mongodb://localhost:27017/FlightDB';

let schema = {
    "bookingId":{
        type : Number,
        required : [true,'Require field'],
        unique : [true,'Unique field']
    },
    "mobile" : {
        type : Number,
        required : [true,'Require field']
    },
    "dateOfJourney" : {
        type : Date,
        required : [true,'Require field'],
        validate : [(dateOfJourney)=>new Date(dateOfJourney) >= new Date(), 'Date should be greater than today']
    },
    "seats":{
        type : [],
        required : [true,'Require field']
    }
}

let flightSchema = new Schema(schema,{collection : "Flight",timestamps:true});
let connection = {};
connection.getCollection = async()=>{
    try{
        return (await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })).model("Flight", flightSchema)
    }catch(err){
        let error = new Error("Could not connect to database");
        error.status = 500;
        throw error;
    }
}

module.exports = connection;