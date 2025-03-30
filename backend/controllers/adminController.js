import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import doctorModel from '../models/doctorModel.js';

// api for add doctor
const addDoctor = async (req,res)=> {
    try {
        const {name, email, password, degree, speciality,experience, about,fees, address} = req.body;
        const imageFile = req.file
        if(!name || !email || !password || !degree || !speciality || !experience || !about || !fees || !address){
            return res.status(400).json({message: "Missing required fields"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message: "Invalid email"});
        }
        if(password.length < 8){
            return res.status(400).json({message: "Password must be atleast 8 characters long"});
        }
        // hash doctor password
        const salt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(password, salt);
        //up load image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'});
        const imageUrl = imageUpload.secure_url;
        const doctorData = {
            name,
            email,
            password: hashPassword,
            degree,
            speciality,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            image:imageUrl,
            date:Date.now()
        }
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        res.status(201).json({success:true,message: "Doctor added successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message: error.message});
    }
}

//api for admin login 
const adminLogin = async (req,res)=> {
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.status(200).json({success:true,token});
        }
        else{
            res.status(400).json({success:false,message: "Invalid email or password"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message: error.message});
    }
}

// api for get all doctors
const getAllDoctors = async (req,res)=> {
    try {
        const doctors = await doctorModel.find({}).select("-password");
        res.status(200).json({success: true,doctors});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: error.message});
    }
}

export { addDoctor, adminLogin, getAllDoctors };

