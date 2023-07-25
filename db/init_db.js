const {
  client,
  // declare your model imports here
  // for example, User
  Users,
  Subscriptions,
  Purchases
} = require('./');

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Dropping All Tables...");
    await client.query(`
          DROP TABLE IF EXISTS purchases;  
          DROP TABLE IF EXISTS subscriptions;
          DROP TABLE IF EXISTS users;
      `);
    console.log("Finished Dropping Tables!");

    // build tables in correct order
    const { rows } = await client.query(`
            CREATE TABLE users(
                user_id SERIAL PRIMARY KEY,
                first_name varchar(255) NOT NULL,
                last_name varchar(255) NOT NULL,
                phone_number varchar(255) NOT NULL,
                email varchar(255) UNIQUE NOT NULL,
                account_status varchar(255) NOT NULL
                );
            CREATE TABLE subscriptions(
                sub_id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(user_id),
                make varchar(255) NOT NULL,
                model varchar(255) NOT NULL
                );
            CREATE TABLE purchases(
                purchase_id SERIAL PRIMARY KEY,
                sub_id INTEGER REFERENCES subscriptions(sub_id),
                purchase_date date NOT NULL,
                purchase_price integer NOT NULL
                );
            
        `);
      console.log("Finished Building Tables!");

  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    const usersToCreate = [
      {first_name:"Albert", last_name:"Einstein", phone_number:"123-456-7890", email:"albert@gmail.com",  account_status:"active"},                                                
      {first_name:"Allan", last_name:"Rakowiecki", phone_number:"123-456-7891", email:"allan.rakowiecki@gmail.com", account_status:"active"},
      {first_name:"Betty", last_name:"Boop", phone_number:"123-456-7892", email:"bettyboop@gmail.com", account_status:"active"},
      {first_name:"Charlie", last_name:"Brown", phone_number:"123-456-7893", email:"JustKicktheBall@yahoo.com" , account_status:"overdue"},
      {first_name:"Dora", last_name:"Explorer", phone_number:"123-456-7894", email:"WorldTraveler365@hotmail.org", account_status:"overdue"},
      {first_name:"Eleanor", last_name:"Roosevelt", phone_number:"123-456-7895", email:"FranksCousin@whitehouse.gov", account_status:"active"},
      {first_name:"Frank", last_name:"Sinatra", phone_number:"123-456-7896", email:"SanFranHeart@gmail.com",  account_status:"overdue"},
  ];
  const userList = await Promise.all(usersToCreate.map(Users.createUser));

  console.log("Users created...");
  console.log(userList);
  console.log("Finished creating users!");  

  const subscriptionsToCreate = [
      {user_id:1, make:"Ford", model:"F150"},
      {user_id:2, make:"Ford", model:"Escape"},
      {user_id:3, make:"Ford", model:"Model T"},
      {user_id:4, make:"Honda", model:"Civic"},
      {user_id:5, make:"Jeep", model:"Wrangler"},
      {user_id:6, make:"Jeep", model:"Cherokee"},
      {user_id:7, make:"GMC", model:"Sierra"},
      {user_id:7, make:"Rolls Royce", model:"Phantom"},
      {user_id:2, make:"Hyundai", model:"Sonata"},

  ];
  const subscriptionsList = await Promise.all(subscriptionsToCreate.map(Subscriptions.createSubscription));

  console.log("Subscriptions created...");
  console.log(subscriptionsList);
  console.log("Finished creating subscriptions!"); 

  const purchasesToCreate = [
      {sub_id:1, purchase_date:"2021-01-01", purchase_price:20},
      {sub_id:2, purchase_date:"2021-01-02", purchase_price:20},
      {sub_id:3, purchase_date:"2021-01-03", purchase_price:20},
      {sub_id:4, purchase_date:"2021-01-04", purchase_price:20},
      {sub_id:5, purchase_date:"2021-01-05", purchase_price:20},
      {sub_id:6, purchase_date:"2021-01-06", purchase_price:20},
      {sub_id:7, purchase_date:"2021-01-07", purchase_price:20},
      {sub_id:8, purchase_date:"2021-01-08", purchase_price:20},
      {sub_id:9, purchase_date:"2021-01-09", purchase_price:20}

  ];
  const purchasesList = await Promise.all(purchasesToCreate.map(Purchases.createPurchase));

  console.log("Purchases created...");
  console.log(purchasesList);
  console.log("Finished creating purchases!"); 

  console.log("IT'S ALIVE!!!")

  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
