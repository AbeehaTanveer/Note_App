import React, { useContext, useEffect, useState } from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import NoteCard from "./NoteCard";
import { Dialog, DialogContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Nav from "./Nav";
import axios from "axios";
import { SearchValueContext } from "../context/SearchContext";

const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { search } = useContext(SearchValueContext);

  const colors = ["bg-pink-300", "bg-red-300", "bg-blue-300", "bg-[#74ebd5]","bg-[#ACB6E5]"];
  const categoryColors = {
    Personal: "bg-blue-500",
    Work: "bg-green-600",
    Ideas: "bg-yellow-600",
    Important: "bg-red-600",
  };

  // const notes = [
  //   {
  //     title: "Client Meeting Review",
  //     category: "Personal",
  //     description:
  //       "Reviewed our progress and discussed next steps for the ongoing project.",
  //     tags: "#meeting #review",
  //     time: "9:20 PM",
  //     date: "07-June-2024",
  //   },
  //   {
  //     title: "Client Meeting Review",
  //     category: "Important",
  //     description:
  //       "Reviewed our progress and discussed next steps for the ongoing project.",
  //     tags: "#meeting #review",
  //     time: "9:20 PM",
  //     date: "07-June-2024",
  //   },
  //   {
  //     title: "Client Meeting Review",
  //     category: "Work",
  //     description:
  //       "Reviewed our progress and discussed next steps for the ongoing project.",
  //     tags: "#meeting #review",
  //     time: "9:20 PM",
  //     date: "07-June-2024",
  //   },
  // ];
const [notes,setNotes]=useState([])
const [loading,setLoading]=useState()
  const [note, setNote] = useState({
    title: "",
    category: "",
    description: "",
    tags: [""],
    // isPinned:true,
  
  });

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleTag = () => {
    setNote((prevNote) => ({
      ...prevNote,
      tags: [...(prevNote.tags || []), ""], // Add an empty tag
    }));
  };

  const handleTagChange = (e, index) => {
    const { value } = e.target;
    setNote((prevNote) => {
      const newTags =  [...(prevNote.tags || [])];;
      newTags[index] = value; // Update the specific tag
      return { ...prevNote, tags: newTags };
    });
  };

  const handleCreateNote = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || !jwt.trim()) {
      console.error("Missing or invalid JWT token");
      return;
    }
  
    try {
      const res = await axios.post("http://localhost:8080/note/create", note, {
        headers: {
          Authorization: `${jwt}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
  
      // Clear form and close dialog
      setIsDialogOpen(false);
      setNote("");
  
      // Fetch the updated notes list
      await GetAllNotes(); // Ensure notes are re-fetched and state updates
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };
  
  

  const GetAllNotes = async () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt || !jwt.trim()) {
      console.error("Missing or invalid JWT token");
      return;
    }
  
    try {
      const res = await axios.get("http://localhost:8080/note/getall", {
        headers: {
          Authorization: `${jwt}`,
          "Content-Type": "application/json",
        },
      });
  
      if (res.data?.DataStore) {
        console.log(res.data)
        setNotes(res.data.DataStore); // Corrected to use `DataStore` as per the API response
        setIsDialogOpen(false);
        setLoading(false)
      } else {
        console.error("Unexpected response structure:", res.data);
      }
    } catch (error) {
      console.error("Failed to fetch notes:", error.message);
      setLoading(false)
      setNote([])
      
    }
  };
  

  useEffect(() => {
    GetAllNotes();
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }


  
const HandleDelete=async(id)=>{
  const jwt = localStorage.getItem("jwt");
  if (!jwt || !jwt.trim()) {
    console.error("Missing or invalid JWT token");
    return;
  }
  try {
    
    
   await axios.delete(`http://localhost:8080/note/delete/${id}`,{
      headers: {
        Authorization: `${jwt}`,
        "Content-Type": "application/json",
      },
    })
    setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
  
  } catch (error) {
    console.log(error)
  }
  
  }


  const handleNoteUpdate = (updatedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === updatedNote._id ? { ...note, ...updatedNote } : note
      )
    );
  }



  const handlePinUpdate = (updatedNote) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note._id === updatedNote._id
          ? { ...note, isPinned: true }
          : { ...note, isPinned: false }
      );
      return updatedNotes;
    });
  };


  return (
    <>
      <Nav  />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 mt-6">
      {notes.length > 0 ? (
  notes
    .filter((note) => 
      note.title.toLowerCase().includes(search.toLowerCase()) // Filter notes by title
    )
    .map((note, index) => (
      <NoteCard
        key={note._id} // Use `_id` if available for unique keys
        title={note.title}
        time={note.time}
        notes={note}
        updatedAt={note.updatedAt}
        category={note.category}
        description={note.description || "No description available"}
        tags={note.tags || []} // Provide a default value for `tags` if missing
        noteColor={colors[index % colors.length]}
        categoryColors={categoryColors[note.category] || "bg-gray-700"}
        HandleDelete={() => HandleDelete(note._id)}
        handleNoteUpdate={handleNoteUpdate}
        isPinned={note.isPinned} 
        handlePinUpdate={handlePinUpdate}
        
      />
    ))
) : (
  <p className="text-gray-500">No notes available.</p> // Graceful fallback
)}



        <div className="fixed bottom-5 right-5 sm:right-10">
          <button
            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-transform transform hover:scale-110"
            onClick={() => setIsDialogOpen(true)}
          >
            <NoteAddIcon fontSize="large" className="text-white" />
          </button>
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

                {/* Description Input */}
                <textarea
                  name="description"
                  value={note.description}
                  onChange={handleChange}
                  className="description bg-gray-50 border border-gray-300 p-3 rounded-lg shadow-sm h-40 outline-none resize-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Write your note description here..."
                ></textarea>

                {/* Category Dropdown */}
                <div className="flex flex-col gap-2">
                  {/* <label className="text-sm text-gray-600 font-medium">Category</label> */}
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

                {/* Tags Section */}
                <div className="flex flex-col gap-4">
                  {/* Tag Inputs */}
                  <div className="flex flex-wrap items-center gap-4">
                  {
  note.tags ? (
    note.tags.map((tag, index) => (
      <input
        key={index}
        value={tag}
        name="tags"
        onChange={(e) => handleTagChange(e, index)}
        className="tag-input bg-gray-50 border border-gray-300 p-2 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-400 w-32"
        placeholder="#AddTag"
        type="text"
      />
    ))
  ) : null // Return null if no tags
}

                    {/* Add Tag Button */}

                    <AddIcon
                      className="flex items-center justify-center w-10 h-10 bg-gray-200 hover:bg-blue-400 text-gray-600 hover:text-white rounded-full transition duration-300 shadow"
                      onClick={handleTag}
                    />
                  </div>

                  {/* Displaying Existing Tags */}
                  <div className="flex flex-wrap gap-2">
                  {
  note.tags && note.tags.length > 0 ? (
    note.tags.filter(tag => tag).map((tag, index) => (
      <span
        key={index}
        className="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full shadow cursor-pointer"
      >
        {tag}
      </span>
    ))
  ) : (
    <p>No tags available</p> // Optional fallback in case of empty or invalid tags
  )
}


                  </div>
                </div>
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
                  onClick={handleCreateNote}
                  className="cursor-pointer btn-create bg-blue-400 px-6 py-2 rounded-lg text-white hover:bg-blue-600 transition"
                >
                  Create
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Home;
