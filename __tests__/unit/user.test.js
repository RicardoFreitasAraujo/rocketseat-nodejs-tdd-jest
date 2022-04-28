const { User } = require('../../src/models');
const bcrypt = require('bcrypt');
const truncate = require('../utils/truncate');

describe('User', () => {
   
   beforeEach( async() => {
        await truncate();
   });

   if ('should encrypt user password', async() => {
       const user =  await User.create({ name: 'Ricardo', email: 'ricardo@ricardo', password: '123456' });

       const compareHash = await bcrypt.compare('123456', user.password_hash);

       expect(compareHash).toBe(true);
    });

    

});