import express from 'express';
import { addDoctor, adminLogin, getAllDoctors } from '../controllers/adminController.js';
import { changeAvailability } from '../controllers/doctorController.js';
import authAdmin from '../middlewares/authAdmin.js';
import upload from '../middlewares/multer.js';
const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', adminLogin);
adminRouter.get('/all-doctors', authAdmin, getAllDoctors);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
export default adminRouter;