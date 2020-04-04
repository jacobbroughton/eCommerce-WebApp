const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection(process.env.CONN_STRING);
connection.connect();

exports.findUser = (req, res) => {
  console.log(req.params);
  connection.query(
    `SELECT * FROM users WHERE email = "${req.params.email}"`,
    (err, rows, fields) => {
      if (err) throw err;
      console.log(rows[0])
      res.send(rows[0]);
    }
  );
};

exports.addUser = (req, res) => {
  console.log(req.body);
  let r = req.body;
  connection.query(
    `INSERT INTO users (user_uid, email, nickname, first_name, last_name, town, state, date_created, time_created) VALUES ("${r.user_uid}", "${r.email}", "${r.nickname}", ${r.first_name}, ${r.last_name}, ${r.town}, ${r.state}, "${r.date_created}", "${r.time_created}")`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.updateProfile = (req, res) => {
  let r = req.body;
  connection.query(
    `UPDATE users SET first_name = "${r.firstName}", last_name = "${r.lastName}", town = "${r.townCity}", state = "${r.state}" WHERE user_uid = "${req.params.useruid}" `,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.sell = (req, res) => {
  console.log(req.body);
  console.log(req.file)
  let r = req.body;
  connection.query(
    `INSERT INTO listings (listing_uid, seller_uid, email, seller_nickname, title, description, image, price, item_condition, category, ship_status, date_created, time_created) VALUES ("${r.listing_uid}", "${r.seller_uid}", "${r.email}", "${r.seller_nickname}", "${r.title}", "${r.description}", ${r.image}, ${r.price}, "${r.item_condition}", "${r.category}", "${r.ship_status}", "${r.date_created}", "${r.time_created}")`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.getPersonalListings = (req, res) => {
  console.log(req.params)
  connection.query(
    `SELECT * FROM listings WHERE seller_uid = "${req.params.selleruid}"`,
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows)
    }
  );
};

exports.uploadTest = (req, res) => {
  console.log("upload route hit")
  console.log(req.body);
  console.log(req.file);
}
