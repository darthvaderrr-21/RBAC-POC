const express = require('express');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const managerRoutes = require('./routes/manager.routes');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/manager', managerRoutes);

module.exports = app;
