import React, { useEffect, useState } from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";
import { Dialog, DialogContent } from "@mui/material";
import moment from "moment";
import axios from "axios";

const NoteCard = ({
  title,
  category,
  description,
  tags,
  updatedAt,
  isPinned, 
  noteColor,
  categoryColors,
  HandleDelete,
  notes,
  handleNoteUpdate={handleNoteUpdate},
  handlePinUpdate={handlePinUpdate}
  
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [note, setNote] = useState({
    title: "",
    category: "",
    description: "",
  });

 // Parse and format updatedAt for both date and time
 const updatedAtDate = moment(updatedAt); 
 const formattedDate = updatedAtDate.isValid() ? updatedAtDate.format('MMMM Do YYYY') : 'Invalid date';
 const formattedUpdatedTime = updatedAtDate.isValid() ? updatedAtDate.format('h:mm A') : 'Invalid time';



  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };


  const handelEdit = async (id) => {
    setIsDialogOpen(true);
    const jwt = localStorage.getItem("jwt");
    if (!jwt || !jwt.trim()) {
      console.error("Missing or invalid JWT token");
      return;
    }
    try {
      const res = await axios.get(`http://localhost:8080/note/getOne/${id}`, {
        headers: {
          Authorization: `${jwt}`,
          "Content-Type": "application/json",
        },
      });
  
      setNote({
        title: res.data.NoteBYUser.title,
        category: res.data.NoteBYUser.category,
        description: res.data.NoteBYUser.description,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateNote = async () => {
    const jwt = localStorage.getItem("jwt");
    
    // Check if JWT is missing or invalid
    if (!jwt || !jwt.trim()) {
      console.error("Missing or invalid JWT token");
      return;
    }
  
    try {
      // API call to update the note
      const res = await axios.put(
        `http://localhost:8080/note/update/${notes._id}`, 
        note, 
        {
          headers: {
            Authorization: `${jwt}`, // Added "Bearer" for standard token format
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Update Successful", res.data);
  
    
      handleNoteUpdate(res.data);
  
      // Close the dialog after successful update
      setIsDialogOpen(false);
  
    } catch (error) {
      // Improved error handling
      console.error("Error updating note:", error?.response?.data || error.message);
    }
  };
  

  const handlePinNote = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || !jwt.trim()) {
      console.error("Missing or invalid JWT token");
      return;
    }
  
    try {
      const res = await axios.put(
        `http://localhost:8080/note/pinned/${notes._id}`,
        {},
        {
          headers: {
            Authorization: `${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Pin updated successfully", res.data);
      handlePinUpdate(res.data.data); // Pass the updated note data to the parent to update the state

      const {isPinned}=res.data;
      if(isPinned){
        handlePinUpdate(res.data.data); 
      }

    } catch (error) {
      console.error("Error pinning note:", error.response?.data || error.message);
    }
  };
  




  
  return (
    <div
      className={`relative ${noteColor} w-full h-60 p-4 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300`}
    >
      {/* Pin Icon */}
      <PushPinIcon
        fontSize="medium"
        className={`absolute top-2 left-2 transition cursor-pointer ${
          isPinned ? "text-blue-400" : "text-white"
        }`}
        onClick={handlePinNote}
      />


      {/* Category Badge */}
      <div
        className={`absolute ${categoryColors} top-5 right-5 text-white text-xs font-bold uppercase rounded-full px-3 py-1 shadow-lg`}
      >
        {category}
      </div>

      {/* Note Title */}
      <div className="flex justify-between items-center mb-2 mt-5">
        <h2 className="text-lg md:text-xl font-semibold text-white">{title}</h2>
      </div>

      {/* Note Description */}
      <p className="text-sm md:text-lg text-white mb-3 line-clamp-2">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 text-slate-200 mt-3">
        {tags.map((tag, index) => (
          <span key={index} className="text-xs rounded-full px-2 py-1">
            #{tag}
          </span>
        ))}
      </div>

      {/* Time, Date, and Action Buttons */}
      <div className="flex justify-between items-center text-slate-200 mt-2">
        <span className="text-xs">{formattedUpdatedTime}</span>
        <span className="text-xs">{formattedDate}</span>
      </div>
      <div className="flex justify-end gap-2 mt-3">
        {/* Edit Icon */}
        <EditNoteIcon
          fontSize="small"
          className="mr-1 text-slate-100 hover:text-blue-500 transition cursor-pointer"
          onClick={() => handelEdit(notes._id)} 
        />

        {/* Delete Icon */}
        <DeleteIcon
          fontSize="small"
          className="mr-1 text-slate-100 hover:text-red-400 transition cursor-pointer"
          onClick={HandleDelete} // Trigger delete
        />
      </div>

      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            width: "50%",
            maxWidth: "none",
            borderRadius: "20px", // Smooth rounded edges
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
            padding: "20px",
          },
        }}
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      >
        <DialogContent>
          <div className="text-center">
            {/* Dialog Title */}
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Add New Note
            </h2>

            {/* Note Input Form */}
            <div className="editor mx-auto flex flex-col gap-4 w-full text-gray-800">
              {/* Title Input */}
              <input
                name="title"
                value={note.title}
                onChange={handleChange}
                className="title bg-gray-50 border border-gray-300 p-3 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Note Title"
                type="text"
              />

              <textarea
                name="description"
                value={note.description}
                onChange={handleChange}
                className="description bg-gray-50 border border-gray-300 p-3 rounded-lg shadow-sm h-40 outline-none resize-none focus:ring-2 focus:ring-blue-400"
                placeholder="Write your note description here..."
              ></textarea>

              <select
                name="category"
                value={note.category}
                onChange={handleChange}
                className="category bg-gray-50 border border-gray-300 p-4 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select a category</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Ideas">Ideas</option>
                <option value="Important">Important</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="buttons flex justify-end gap-4 mt-6">
              <div
                className="cursor-pointer bg-green-300 btn-cancel border border-gray-300 px-6 py-2 rounded-lg text-gray-600 hover:bg-green-400 transition"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </div>
              <div
                className="cursor-pointer btn-create bg-blue-400 px-6 py-2 rounded-lg text-white hover:bg-blue-600 transition"
                onClick={handleUpdateNote}
              >
                Update
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NoteCard;
