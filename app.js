const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
var cors = require('cors');

var app = express();
app.use(cors())
let Schema = mongoose.Schema;
// const studentModel = mongoose.model("students", {

const logSchema = new Schema({
    firstname: String,
    lastname: String,
    purpose: String,
    whomToMeet: String,
    date: {
        type: Date,
        default: () => {
            const now = new Date();
            const offset = 5.5 * 60 * 60 * 1000; // GMT+5:30 offset in milliseconds
            return new Date(now.getTime() + offset);
        }
    }
});


var visitorModel = mongoose.model('visitors', logSchema);




app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//mongodb+srv://anishsnair:<password>@cluster0-rqfpy.mongodb.net/test?retryWrites=true&w=majority
//mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true });
mongoose.connect("mongodb+srv://anishpdm:anishpdm@cluster0.cp5gozh.mongodb.net/visitordb?retryWrites=true&w=majority&appName=Cluster0");


app.get("/getvistors", async(request, response) => {

    try {
        var result = await visitorModel.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
});




app.post("/addvisitor", async(request, response) => {
    try {
        var visitorData = new visitorModel(request.body);
        var result = await visitorData.save();
        response.json({"status":"success"});
        
    } catch (error) {
        console.log(error)

        response.status(500).send(error);
    }
});



app.listen(process.env.PORT || 4057, function() {
    console.log('Your node js server is running at http://localhost:3000');
});