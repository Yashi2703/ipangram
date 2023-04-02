const mongoose = require("mongoose");
const Schema = mongoose.Schema
const assignSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
         ref: "users",
    },
    depId:{
        type: Schema.Types.ObjectId,
         ref: "dep",
    },
    salary:{
        type:String
    },
    employeId:{
        type:String
    },
}, {
    timestamps: true
}
)
const assignModel = mongoose.model('assign', assignSchema);
module.exports = assignModel;