const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection(process.env.CONN_STRING);
connection.connect();

exports.findUser = (req, res) => {
  connection.query(
    `SELECT * FROM users WHERE email = "${req.params.email}"`,
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows[0]);
    }
  );
};

exports.addUser = (req, res) => {
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

exports.sellText = (req, res) => {
  console.log(req.body);
  let r = req.body;
  connection.query(
    `INSERT INTO listings (listing_uid, seller_uid, email, seller_nickname, title, description, image, price, item_condition, category, ship_status, date_created, time_created) VALUES ("${r.listing_uid}", "${r.seller_uid}", "${r.email}", "${r.seller_nickname}", "${r.title}", "${r.description}", ${r.image}, ${r.price}, "${r.item_condition}", "${r.category}", "${r.ship_status}", "${r.date_created}", "${r.time_created}")`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.sellImages = (req, res) => {
  console.log(req.body);
  console.log(req.file)
  console.log("updating images field with " + req.file.path )
  let r = req.body;
  connection.query(
    `UPDATE listings SET image = "${req.file.path}" WHERE listing_uid = "${req.params.listinguid}"`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.getPersonalListings = (req, res) => {
  connection.query(
    `SELECT * FROM listings WHERE seller_uid = "${req.params.selleruid}"`,
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows)
    }
  );
};

exports.browseAll = (req, res) => {
  connection.query(`SELECT * FROM listings`, (err, rows, fields) => {
    if(err) throw err;
    res.send(rows);
  })
}

exports.browseCategory = (req, res) => {
  let origCat = req.params.category;
  console.log(origCat)
  connection.query(`SELECT * FROM listings WHERE category = "${req.params.category}"`, (err, rows, field) => {
    if(err) throw err;
    res.send(rows);
  })
}
