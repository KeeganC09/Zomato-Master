//Libraries
import express from "express";

//Database Model
import { ReviewModel } from "../../database/allModels";

const Router = express.Router();

/**
 * Route        /:resid
 * Des          get all reviews for a particular restaurant
 * Params       resid
 * Access       Public
 * Method       GET
 */

Router.get('/:resid', async (req, res) => {
    try {
        const { resid } = req.params;
        const reviews = await ReviewModel.find({ restaurants: resid });

        return res.status(200).json({ reviews })

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route        /new
 * Des          Add a new review
 * Params       none
 * Access       Public
 * Method       POST
 */

Router.post('/new', async (req, res) => {
    try {
        const { reviewData } = req.body;

        await ReviewModel.create({ ...reviewData });

        return res.json({ reviews: "Successfully Added Review" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/**
 * Route        /delete/:_id
 * Des          Delete a particular review
 * Params       _id
 * Access       Public
 * Method       DELETE
 */

Router.delete('/delete/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        await ReviewModel.findOneAndDelete(_id);

        return res.json({ review: "Review deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;