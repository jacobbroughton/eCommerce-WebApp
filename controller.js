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
    `INSERT INTO listings (listing_uid, seller_uid, email, seller_nickname, city, state, title, description, image, price, item_condition, category, ship_status, firmness, trades, date_created, time_created) VALUES ("${r.listing_uid}", "${r.seller_uid}", "${r.email}", "${r.seller_nickname}", "${r.city}", "${r.state}", "${r.title}", "${r.description}", "${r.image}", ${r.price}, "${r.item_condition}", "${r.category}", "${r.ship_status}", "${r.firmness}", "${r.trades}", "${r.date_created}", "${r.time_created}")`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.sellImages = (req, res) => {
  let uploadStr = ""; 
  for(let i = 0; i < req.files.length; i++) {
    uploadStr += req.files[i].path + " ";
  }

  connection.query(
    `UPDATE listings SET image = "${uploadStr}" WHERE listing_uid = "${req.params.listinguid}"`,
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

exports.browseSingle = (req, res) => {
  let listinguid = req.params.listinguid;
  connection.query(`SELECT * FROM listings WHERE listing_uid = "${listinguid}"`, (err, rows, field) => {
    if(err) throw err;
    res.send(rows[0]);
  })
}


exports.saveListing = (req, res) => {
  let r = req.body;
  connection.query(`INSERT INTO saved_listings (listing_uid, user_uid, time_saved, date_saved) VALUES ("${r.listing_uid}", "${r.user_uid}", "${r.time_saved}", "${r.date_saved}")`, (err, rows, fields) => {
    if(err) throw err;
  })
}

exports.getSaved = (req, res) => {
  let useruid = req.params.useruid;
  let test;

  connection.query(`SELECT * FROM saved_listings WHERE user_uid = "${useruid}"`, (err, rows1, fields) => {
    if(err) throw err;  
    // let sendRows;
    // for(let i = 0; i < rows1.length; i++) {
    //   connection.query(`SELECT * FROM listings WHERE listing_uid = "${rows1[i].listing_uid}"`, (err, rows2, field) => {
    //     if(err) throw err;
    //    sendRows = rows2;
    //    return sendRows;
    //   }) 
    // }
    res.send(rows1);
  })
}