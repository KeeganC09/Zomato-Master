//Libraries
import express from "express";

//Database import
import { FoodModel } from "../../database/food";

const Router = express.Router();

/**
 * Route       /r/:_id
 * Des          get all food based on a particular restaurant
 * Params       none
 * Access       Public
 * Method       GET
 */

Router.get('/r/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const foods = await FoodModel.find({ restaurant: _id });

        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route       /c/:category
 * Des          get all food based on a category
 * Params       none
 * Access       Public
 * Method       GET
 */

Router.get('/c/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const foods = await FoodModel.find({
            category: { $regex: category, $options: "i" },
        });

        if (!foods)
            return res.status(404).json({ error: `No foods matched with ${category}` });

        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;