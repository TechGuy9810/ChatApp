import express  from "express";
import protectRoute from "../middleware/protectRoute.js";
import {getUserForSidebar,AddUser,findUsers,updateProfile,updateProfilePhoto,findUsersForGroup} from "../controller/userController.js";
import upload from "../utils/multerConfig.js";
const router =express.Router();

router.get("/:id",protectRoute,getUserForSidebar);
router.get("/findUsers/:id",protectRoute,findUsers);
router.get("/findUsersForGroup/:id",protectRoute,findUsersForGroup);
router.post("/addUser",protectRoute,AddUser);
router.post("/updateProfile",protectRoute,updateProfile)
router.post("/updateProfilePhoto/:id",upload.single('file'),updateProfilePhoto)
export default router;
