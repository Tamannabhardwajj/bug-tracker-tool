const express = require("express");
const router = express.Router();
const Bug = require("../models/Bug");
const jwt = require("jsonwebtoken");

// Middleware for verifying JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ error: "Invalid token" });
    }
};

// Create Bug
router.post("/create", verifyToken, async (req, res) => {
    const { title, description, assignedTo } = req.body;
    try {
        const bug = new Bug({
            title,
            description,
            createdBy: req.user.id,
            assignedTo
        });
        await bug.save();
        res.status(201).json({ message: "Bug created", bug });
    } catch (err) {
        res.status(500).json({ error: "Error creating bug" });
    }
});

// Get All Bugs
router.get("/", verifyToken, async (req, res) => {
    try {
        const bugs = await Bug.find().populate("createdBy assignedTo", "username");
        res.json(bugs);
    } catch (err) {
        res.status(500).json({ error: "Error fetching bugs" });
    }
});

// Update Bug Status
router.put("/:id/status", verifyToken, async (req, res) => {
    try {
        const bug = await Bug.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(bug);
    } catch (err) {
        res.status(500).json({ error: "Error updating status" });
    }
});

module.exports = router;
