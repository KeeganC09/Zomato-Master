//Libraries
import express from "express";
import passport from "passport";

//Database Model
import { OrderModel } from '../../database/allModels';

//Validate User
import validateUser from "../../config/validateUser";

const Router = express.Router();

/**
 * Route       /
 * Des          get all orders based on user id
 * Params       _id
 * Access       Private
 * Method       GET
 */

Router.get('/:_id', passport.authenticate("jwt"), async (req, res) => {
    try {
        await validateUser(req, res);
        const { _id } = req.params;
        const getOrders = await OrderModel.findOne({ user: _id });

        if (!getOrders) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ orders: getOrders });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route       /new/:_id
 * Des          Add new order
 * Params       _id
 * Access       Private
 * Method       POST
 */

Router.post('/new/:_id', passport.authenticate("jwt"), async (req, res) => {
    try {
        await validateUser(req, res);
        const { _id } = req.params;
        const { orderDetails } = req.body;

        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
                user: _id
            },

            {
                $push: { orderDetails }
            },

            {
                new: true
            }
        );

        return res.status(200).json({ order: addNewOrder });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;