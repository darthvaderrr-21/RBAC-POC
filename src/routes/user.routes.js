const express = require('express');
const users = require('../data/users');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

const router = express.Router();

/**
 * Admin: get all users
 */
router.get(
  '/',
  authenticate,
  authorize(['ADMIN']),
  (req, res) => {
    res.json(users);
  }
);

/**
 * Admin: assign role
 */
router.put(
  '/:id/role',
  authenticate,
  authorize(['ADMIN']),
  (req, res) => {
    const { role } = req.body;
    const user = users.find(u => u.id === parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    res.json({ message: 'Role updated' });
  }
);

module.exports = router;
