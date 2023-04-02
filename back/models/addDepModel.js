const mongoose = require("mongoose");
const Schema = mongoose.Schema
const taskSchema = new Schema({
    departmentName:{
        type:String
    },
    categoryName:{
        type:String
    },
    location:{
        type:String
    },
    // salary:{
    //     type:String
    // },
    // employeId:{
    //     type:String
    // },
    // userId:{
    //     type: [Schema.Types.ObjectId],
    //      ref: "users",
    // },
}, {
    timestamps: true
}
)
const taskModel = mongoose.model('dep', taskSchema);
module.exports = taskModel;