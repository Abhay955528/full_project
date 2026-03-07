const mongoose = require("mongoose");
const Item = require('../models/item');
const User = require('../models/user');
const user = require("../models/user");

const addUserData = async (req, res) => {
    // try {
    const { product, price, quantity } = req.body;
    console.log(req.body);

    const newItem = await Item.create({
        name: product,
        price: price,
        quantity: quantity,
        userId: req.user._id
    });
    res.status(201).json({ message: 'User data created successfully', item: newItem });
    // } catch (error) {
    //     res.status(500).json({ error: 'Failed to create user data' });
    // }
}

const getUserData = async (req, res) => {
    try {
        const userName = req.user.name;
        const items = await Item.find({ userId: req.user._id });
        res.status(200).json({ items, userName });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user data' });
    }
}

const allUserData = async (req, res) => {
    try {
        // const users = await User.aggregate([
        //     {
        //         $lookup: {
        //             from: "items",        // collection name
        //             localField: "_id",    // User._id
        //             foreignField: "userId", // Item.userId
        //             as: "items"
        //         }
        //     },
        //     {
        //         $project: {
        //             name: 1,
        //             items: 1
        //         }
        //     }
        // ]);

        const users = await User.find()
            .select("name")
            .populate("items");
        res.status(200).json({ allItems: users });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user data' });
    }
}

module.exports = {
    addUserData,
    getUserData,
    allUserData
}