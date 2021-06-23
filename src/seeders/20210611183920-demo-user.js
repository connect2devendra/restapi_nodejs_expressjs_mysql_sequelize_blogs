'use strict';
const bcrypt = require("bcrypt");

module.exports = {  
  up: async (queryInterface, Sequelize) => {

    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const bcrypted_password = await bcrypt.hash('123456', salt);  

     return await queryInterface.bulkInsert('users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      password: bcrypted_password,
      mobile: '9800987650',
      gender: 'Male',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
     return await queryInterface.bulkDelete('users', null, {});
  }
};
