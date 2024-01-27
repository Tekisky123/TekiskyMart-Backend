import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    mobileNumber: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    role: { type: String, enum: ['superadmin', 'shopuser'], required: true },
    // Additional fields specific to shop users
    shopCategory: { type: String, enum: ['dates', 'clothing', 'groceries', 'others'] },
    // Add any other fields you need for your user model
});


const UserModel = mongoose.model('User', userSchema);

export default UserModel
