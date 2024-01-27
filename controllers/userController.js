import { createUserService, loginService, getUsersService, updateUserService, deleteUserService, getOneUserService } from "../services/userService.js";
import jwt from 'jsonwebtoken';

// Controller function to create a new user
const createUser = async (req, res) => {
    try {
        // Create a new user using the createUserService from userService
        const newUser = await createUserService(req.body);

        // Check if user creation was successful
        if (newUser.success) {
            res.status(201).json({ message: 'User created successfully' });
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to handle user login
const loginUser = async (req, res) => {
    try {
        const loginData = req.body;

        // Use the loginService from userService to authenticate the user
        const result = await loginService(loginData);

        // Check if login was successful
        if (result.success) {
            res.status(200).json({ message: result.message, token: result.token });
        } else {
            res.status(401).json({ error: result.error });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller function to get all users
const getUsers = async (req, res) => {
    try {
        // Use the getUsersService from userService to retrieve all users
        const users = await getUsersService();

        // Check if user retrieval was successful
        if (users.success) {
            res.status(200).json({ users: users });
        } else {
            res.status(500).json({ error: users.error });
        }
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const updateUser = async (req, res) => {
    try {
        const mobileNumber = req.params.mobileNumber;
        console.log('mobile',mobileNumber) 
        const updateData = req.body;
        const authToken = req.header('Authorization');

        // Verify the provided token
        jwt.verify(authToken, process.env.JWT_SEC_KEY, { maxAge: '1d' }, async (error, decodedToken) => {
            if (error) {
                console.error('Error verifying token:', error);
                return res.status(401).json({ error: 'Invalid token' });
            }

            console.log('Decoded Token:', decodedToken);
            const tokenUserId = decodedToken.userId.toString();
            const mobileNumberT = mobileNumber.toString();
            // Check if the decoded token userId matches the requested mobileNumber
            if (tokenUserId!== mobileNumberT) {
                console.error('Unauthorized access to update user. Token user ID:', decodedToken.userId, 'Requested user ID:', mobileNumber);
                return res.status(403).json({ error: 'Unauthorized access to update user' });
            }

            // Update user using the updateUserService from userService
            const result = await updateUserService(mobileNumber, updateData);

            // Check if the user update was successful
            if (result.success) {
                console.log('User updated successfully. Updated User:', result.updatedUser);
                res.status(200).json({ message: 'User updated successfully', updatedUser: result.updatedUser });
            } else {
                console.error('Error updating user:', result.error);
                res.status(404).json({ error: result.error });
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};


const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Delete user using the deleteUserService from userService
        const result = await deleteUserService(userId);

        // Check if the user deletion was successful
        if (result) {
            console.log('User deleted successfully.');
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            console.error('Error deleting user:', result);
            res.status(404).json({ error: result });
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};



const getOneUser = async (req, res) => {
    try {
        const userId = req.params.id;
  
        // Get user using the getOneUserService from userService
        const user = await getOneUserService(userId);
  
        // Check if the user retrieval was successful
        if (user.success) {
            console.log('User retrieved successfully.');
            res.status(200).json({ user: user });
        } else {
            console.error('Error retrieving user:', user.error);
            res.status(404).json({ error: user.error });
        }
    } catch (error) {
        console.error('Error retrieving user:', error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
  };
  

// Export the controller functions for use in routes
export { createUser, loginUser, getUsers, updateUser,deleteUser,getOneUser };
