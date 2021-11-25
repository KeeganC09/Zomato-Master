//Libraries
import express from 'express';

//Database Model
import { RestaurantModel } from '../../database/restaurant';

const Router = express.Router();

/**
 * Route       /
 * Des          get all restaurants details based on a city
 * Params       none
 * Access       Public
 * Method       GET
 */

Router.get('/', async (req, res) => {
    try {
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });
        if (restaurants.length === 0) {
            return res.status(404).json({ error: "No restaurants found in this city" })
        }
        return res.json({ restaurants })
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route       /:_id
 * Des          get individual restaurant details based on id
 * Params       none
 * Access       Public
 * Method       GET
 */

Router.get('/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findById(_id);
        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        return res.json({ restaurant });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route       /search/:searchString
 * Des          get restaurant details based on search string
 * Params       none
 * Access       Public
 * Method       GET
 */

Router.get('/search/:searchString', async (req, res) => {
    try {
        const { searchString } = req.params;
        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i" },
        });

        if (!restaurants)
            return res.status(404).json({ error: `No restaurant matched with ${searchString}` });

        return res.json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
});

export default Router;