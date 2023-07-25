// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
  // add your database adapter fns here
  createPurchase,
  updatePurchase,
  getAllPurchases
};

async function getAllPurchases() {
  try {
    const { rows } = await client.query(`
      SELECT sub_id, purchase_date, purchase_price
      FROM purchases;
    `);
  
    return rows;
  } catch (error) {
    throw error;
  }
}

async function createPurchase({
    sub_id,
    purchase_date,
    purchase_price,
}){
  try{
      const { rows: [purchase]} = await client.query(`
      INSERT INTO purchases(sub_id, purchase_date, purchase_price)
      VALUES ($1, $2, $3)
      RETURNING *; 
      `, [sub_id, purchase_date, purchase_price]);
      
      return purchase;
  } catch(error) {
      throw error
  }
};

async function updatePurchase(id, fields = {}) {
  // build the set string
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [ purchase ] } = await client.query(`
      UPDATE purchases
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return purchase;
  } catch (error) {
    throw error;
  }
};