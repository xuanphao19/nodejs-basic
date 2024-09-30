// models/user.js

class User {
  create(name, email, password, address, createdAt, updatedAt) {
    return {
      name,
      email,
      password,
      address,
      createdAt,
      updatedAt,
    };
  }
}

module.exports = new User();
