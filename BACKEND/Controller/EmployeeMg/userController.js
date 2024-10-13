const User = require('../Model/userModel')

//display
const getAllUsers = async (req, res, next) => {

    let users;

    
    try {
        users = await User.find()
    }
    catch (err) {
        console.log(err)
    }


    if (!users) {
        return res.status(404).json({ message: "no users" })
    }

    
    return res.status(200).json({ users })
}


const addUsers = async (req, res, next) => {
    const { name, userName, password, contactNumber, address, role, email, salary } = req.body;

    
    try {
        const existingUser = await User.findOne({
            $or: [{ email: email }, { userName: userName }]
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Email or username already exists"
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to check existing user" });
    }

    
    let user;
    try {
        user = new User({
            name,
            userName,
            password,
            contactNumber,
            address,
            role,
            email,
            salary,
            
        });
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to add user" });
    }

    
    res.status(200).json({ user });
};


//get by id
const getById = async (req, res, next) => {

    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id)

    } catch (err) {
        console.log(err)
    }
    
    if (!user) {
        res.status(404).json({ message: "no users" })
    }
    res.status(200).json({ user })
}

// Updating user
const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { name, userName, password, contactNumber, address, role, email, salary, total_salary_with_OT } = req.body; // Include total_salary_with_OT

    let user;

    try {
        
        user = await User.findByIdAndUpdate(id, {
            name,
            userName,
            password,
            contactNumber,
            address,
            role,
            email,
            salary,
            total_salary_with_OT 
        }, { new: true }); 

        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        
        res.status(200).json({ user }); 
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to update user" });
    }
};


//delete

const deleteUser = async (req, res, next) => {

    const id = req.params.id

    let user;

    try {
        user = await User.findByIdAndDelete(id)
    } catch (err) {
        console.log(err)
    }
    if (!user) {
        res.status(404).json({ message: "unabel to delete" })
    }
    res.status(200).json({ user })
}


exports.getAllUsers = getAllUsers
exports.addUsers = addUsers
exports.getById = getById
exports.updateUser = updateUser
exports.deleteUser = deleteUser