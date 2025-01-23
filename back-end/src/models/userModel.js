const db = require('../config/dbConfig');

const User = {
  findByEmail: (email, callback) => {
    const sql = `
        SELECT 
            users.id, 
            users.email, 
            users.name,
            users.password,
            GROUP_CONCAT(roles.name) AS roles
        FROM 
            users
        LEFT JOIN 
            user_roles ON users.id = user_roles.user_id
        LEFT JOIN 
            roles ON user_roles.role_id = roles.id
        WHERE 
            users.email = ?
        GROUP BY 
            users.id;
    `;
    db.query(sql, [email], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      if (results.length > 0) {
        const user = results[0];
        user.roles = user.roles ? user.roles.split(',') : [];
        return callback(null, user);
      }
      return callback(null, null);
    });
  },

  create: (user, callback) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(sql, [user.name, user.email, user.password], callback);
  },

  getAll: (callback) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, callback);
  }
};

module.exports = User;
