const mongoose = require("mongoose");

const database='mongodb+srv://urmi05:chauhan%4023@cluster0.4tgfsm0.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(database,{ useNewUrlParser: true }).then(()=>{
    console.log("success");
})