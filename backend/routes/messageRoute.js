import express  from "express";
import protectRoute from "../middleware/protectRoute.js";
import { sendMessage,getMessage, sendFile,downloadFile,getFiles,lastFile } from "../controller/messageController.js";
import upload from "../utils/multerConfig.js";
const router =express.Router();

router.get("/:id",protectRoute,getMessage);
router.post("/send/:id",protectRoute,sendMessage);
router.post("/sendFile/:id",upload.single('file'),sendFile);
router.get("/uploads/:id",protectRoute,downloadFile);
router.get("/files/:id",protectRoute,getFiles);
router.get("/lastMessage/:id",protectRoute,lastFile);
export default router;
