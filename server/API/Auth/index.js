//Library
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//Models
import { UserModel } from '../../database/allModels'

//Create a Router
const Router = express.Router();

/**
 * Router        /signup
 * Description   Register new user
 * Params        none
 * Access        public
 * method        POST
 */

Router.post('/signup', async (req, res) => {
    try {
        await UserModel.findByEmailAndPhone(req.body.credentials);
        const newUser = await UserModel.create(req.body.credentials);
        const token = newUser.generateJwtToken();
        return res.status(200).json({ token, status: "success!!!" })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

Router.post('/signin', async (req, res) => {
    try {
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        const token = user.generateJwtToken();
        return res.status(200).json({ token, status: "Success!!!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

export default Router;