const Note = require("../models/Notes");

const mongoose = require("mongoose");

/**
 * Get
 * Dashboard
 */
exports.dashboard = async (req, res) => {
    const locals = {
        title: "Dashboard",
        description: "Free NodeJS Notes app.",
    };

    res.render('dashboard/index', {
        userName: req.user.firstName,
        locals,
        //frontpage layout
        layout: '../views/layouts/dashboard'
    });
}