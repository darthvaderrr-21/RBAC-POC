const express = require('express');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

const router = express.Router();

router.get(
  '/dashboard',
  authenticate,
  authorize(['MANAGER', 'ADMIN']),
  (req, res) => {
    res.json({ message: 'Manager dashboard access granted' });
  }
);

module.exports = router;
