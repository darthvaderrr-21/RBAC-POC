const ROLE_PERMISSIONS = {
  USER: [
    'READ_PROFILE'
  ],

  MANAGER: [
    'READ_PROFILE',
    'VIEW_DASHBOARD',
    'MANAGE_TEAM'
  ],

  ADMIN: [
    'READ_PROFILE',
    'VIEW_DASHBOARD',
    'MANAGE_TEAM',
    'MANAGE_USERS',
    'SETTINGS'
  ]
};

module.exports = ROLE_PERMISSIONS;
