

// api for add doctor
const addDoctor = async (req,res)=> {
    try {
        const {name, email, password, degree, speciality,experience, about,fees, address} = req.body;
        const imageFile = req.file
        if(!name || !email || !password || !degree || !speciality || !experience || !about || !fees || !address){
            return res.status(400).json({message: "Missing required fields"});
        }
        
        if(validator.isEmail(email)){
            return res.status(400).json({message: "Invalid email"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}

export { addDoctor };
