const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const groupSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        organizer: {
            type: String,
            required: true,
        },
        time: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

userSchema.set("collection", "group");

const Group = mongoose.model("group", groupSchema);

const groupCollection = {
    addGroup: (data) => {
        const groupData = new Group({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
          });
        return new Promise((resolve,reject)=>{
            groupData.set();
        })
    }
}

module.exports = groupCollection;