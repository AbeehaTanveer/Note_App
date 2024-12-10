const Note = require("../model/NoteModel");

const handleCreateNote = async (req, res) => {
  const { userId } = req.user;
  const { title, category, description, tags } = req.body;

  if (!title || !category || !description) {
    return res.status(400).json({ msg: "Incomplete data in body" });
  }
  
  try {
    // Check for duplicate titles
    const existingNote = await Note.findOne({ title, userId });
    if (existingNote) {
      return res
        .status(409)
        .json({ success: false, msg: "Title already exists" });
    }

    const newNote = new Note({
      title,
      category,
      description,
      tags,
      userId,
    });

    const savedNote = await newNote.save();
    await savedNote.populate("userId");

    res.status(201).json({
      Note: savedNote,
      msg: "Note created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const GetAll = async (req, res) => {
  try {
    const DataStore = await Note.find({ userId: req.user.userId })

      .sort({
        isPinned: -1, // Pinned notes first
        updatedAt: -1, // Recently updated notes next
      })
      .lean(); // Convert Mongoose documents to plain objects

    if (!DataStore.length) {
      return res.status(404).json({ msg: "No notes found for the user" });
    }
  
    res.status(200).json({
      DataStore,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const GetOne = async (req, res) => {
  const { id } = req.params;
  try {
    const NoteBYUser = await Note.findOne({
      _id: id, // Find the specific note by its ID
      userId: req.user.userId, // Ensure it belongs to the logged-in user
    });
   
    if (!NoteBYUser) {
      res.status(403).json({ msg: "Id not match user and note" });
    }

    res.status(200).json({ NoteBYUser });
  } catch (error) {
    return res.status(500).json({ error:error.message });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;

  try {
    const findUser = await Note.findOne({ userId: req.user.userId, _id: id });
    if (!findUser) {
      return res.status(403).json({ msg: "user not foun" });
    }

    const UpdateData = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(UpdateData);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const DeleteNote = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    console.log("not findId");
  }

  try {
    const userFind = await Note.findById({ userId: req.user.userId, _id: id });
    if (!userFind) {
      return res.status(404).json({ msg: "id not find" });
    }

    const DelData = await Note.findByIdAndDelete(id);
    res.status(201).json({ msg: "Note Delete Successfuly", Note: DelData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const PinnedOne = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    await Note.updateMany(
      { userId, isPinned: true },
      { $set: { isPinned: false } }
    );

    const PinnedNote = await Note.findByIdAndUpdate(
      id,
      { isPinned: true },
      { new: true }
    );
    if (!PinnedNote) {
      return res.status(404).json({ msg: "Note not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        msg: "Note pinned successfully",
        data: PinnedNote,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleCreateNote,
  GetAll,
  GetOne,
  updateNote,
  DeleteNote,
  PinnedOne,
};
