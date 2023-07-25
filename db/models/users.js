// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  updateUser,
  getUserByName,
  getUserByPhoneNumber
};

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  try {
    const { rows } = await client.query(`
      SELECT user_id, first_name, last_name, phone_number, email, account_status
      FROM users;
    `);
  
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createUser({
  first_name,
  last_name,
  phone_number,
  email,
  account_status
}){
  try{
      const { rows: [user]} = await client.query(`
      INSERT INTO users(first_name, last_name, phone_number, email, account_status)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (email) DO NOTHING
      RETURNING *; 
      `, [first_name, last_name, phone_number, email, account_status]);
      
      return user;
  } catch(error) {
      throw error
  }
};

async function updateUser(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  console.log(setString)

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [ user ] } = await client.query(`
      UPDATE users
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return user;
  } catch (error) {
    throw error;
  }
};


async function getUserByName(last_name) {
  try {
    const { rows: [user]} = await client.query(`
    SELECT *
    FROM users
    WHERE last_name = $1
    `, [ last_name ]);

    if (!user) {
      return false;
      // {
      //   name: "UserNotFoundError",
      //   message: "A user with that email does not exist"
      // }
    }
    return user;
  } catch (error) {
    throw error
  }
};

async function getUserByPhoneNumber(phone_number) {
  try {
    const { rows: [user]} = await client.query(`
    SELECT *
    FROM users
    WHERE phone_number = $1
    `, [ phone_number ]);

    if (!user) {
      return false;
      // {
      //   name: "UserNotFoundError",
      //   message: "A user with that email does not exist"
      // }
    }
    return user;
  } catch (error) {
    throw error
  }
};