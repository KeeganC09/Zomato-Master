//Library
import express from 'express';
import passport from 'passport';

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

/**
 * Router        /sigin
 * Description   Sign-in with email and password
 * Params        none
 * Access        public
 * method        POST
 */

Router.post('/signin', async (req, res) => {
    try {
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);
        const token = user.generateJwtToken();
        return res.status(200).json({ token, status: "Success!!!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Router        /google
 * Description   google sign-in
 * Params        none
 * Access        public
 * method        GET
 */

Router.get(
    "/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    })
);

/**
 * Router       /google/callback
 * Des          Google signin callback
 * Params       none
 * Access       Public
 * Method       GET
 */
Router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        return res
            .status(200)
            .json({ token: req.session.passport.user.token, status: "success" });
    }
);

export default Router;