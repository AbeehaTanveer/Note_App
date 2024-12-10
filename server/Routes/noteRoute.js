const express =require("express")
const { handleCreateNote, GetAll, GetOne, updateNote, DeleteNote, PinnedOne } = require("../controller/NoteContoller")
const {Authentication} =require("../middleware/AuthVerify")
const noteRoute= express.Router()

noteRoute.post("/create",Authentication,handleCreateNote)
noteRoute.get("/getall",Authentication,GetAll)
noteRoute.get("/getOne/:id",Authentication,GetOne)
noteRoute.put("/update/:id",Authentication,updateNote)
noteRoute.delete("/delete/:id",Authentication,DeleteNote)
noteRoute.put("/pinned/:id",Authentication,PinnedOne)


module.exports={noteRoute}