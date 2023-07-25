// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
  // add your database adapter fns here
  createSubscription,
  updateSubscription,
  getAllSubs
};


async function getAllSubs() {
  try {
    const { rows } = await client.query(`
      SELECT sub_id, user_id, make, model
      FROM subscriptions;
    `);
  
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createSubscription({
    user_id,
    make,
    model
}){
  try{
      const { rows: [subscription]} = await client.query(`
      INSERT INTO subscriptions(user_id, make, model)
      VALUES ($1, $2, $3)
      RETURNING *; 
      `, [user_id, make, model]);
      
      return subscription;
  } catch(error) {
      throw error
  }
};

async function updateSubscription(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [ subscription ] } = await client.query(`
      UPDATE subscriptions
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return subscription;
  } catch (error) {
    throw error;
  }
};
