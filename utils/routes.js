const express = require('express');
const adminRoutes = require('../routes/adminRoutes');

module.exports = function (app){
    app.use(express.json());
    app.use("/admin", adminRoutes);
}