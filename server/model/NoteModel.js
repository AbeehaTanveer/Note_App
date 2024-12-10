const mongoose = require("mongoose");
const Schema = mongoose.Schema; // You need to import Schema

const UserSchema = new Schema({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  tags: {
    type: [String], // Array of strings
  },
  time: {
    type: String,
    default: () => new Date().toTimeString(), // Setting a default value
  },
  isPinned: {
    type:Boolean,
    default:false
    
    },

 
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Refers to the User model to establish the relationship
  },
},
{
    timestamps: { createdAt: 'created_at' }, // Correct placement of the timestamps option
  }

);

const Note = mongoose.model("Note", UserSchema);
module.exports = Note;
