const { Client } = require('pg');
const process = require('process');

// Replace these values with your own credentials
const config = {
  user: process.env.REDSHIFT_USER,
  host: process.env.REDSHIFT_HOST,
  database:process.env.REDSHIFT_DATABASE,
  port: 5439,
  password: process.env.REDSHIFT_PASSWORD,
  ssl: true, // Set to true if your Redshift cluster requires SSL
};

const client = new Client(config);
client.connect();

async function query (q) {
    return new Promise((resolve, reject) => { 
        client.query(q, (err, res) => {
            if (err) {
              console.log("err",err);   
              reject(err);
            } else {
              console.log("err",res.rows);   
              resolve(res.rows);
            }
            client.end();
          });
    });
}

module.exports = query;
