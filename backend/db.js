const mongoose = require('mongoose');
const URI = "mongodb://127.0.0.1:27017/inotebook"
const ConnectToMongo =()=> {
mongoose.connect(URI)
.then(console.log("Connected SuccessFully"))
.catch(err=>console.log(err));
}
module.exports = ConnectToMongo;