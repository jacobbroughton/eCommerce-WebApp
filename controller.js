const mysql = require("mysql");
require("dotenv").config();
let multer = require("multer");
let upload = multer().array("myFile", 4);
const sharp = require("sharp") // image manipulation
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
  // console.log(req.body);
  let r = req.body;
  connection.query(
    `INSERT INTO listings (listing_uid, seller_uid, email, seller_nickname, city, state, title, description, image, price, item_condition, category, ship_status, firmness, trades, tags, status, date_created, time_created) VALUES ("${r.listing_uid}", "${r.seller_uid}", "${r.email}", "${r.seller_nickname}", "${r.city}", "${r.state}", "${r.title}", "${r.description}", "${r.image}", ${r.price}, "${r.item_condition}", "${r.category}", "${r.ship_status}", "${r.firmness}", "${r.trades}", "${r.tags}", "${r.sold_status}", "${r.date_created}", "${r.time_created}")`,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
};

exports.sellImages = (req, res) => {
  
  connection.query(`SELECT * FROM listings WHERE listing_uid = "${req.params.listinguid}"`, (err, rows, fields) => {
    if(err) throw err;
    let uploadStr = "";
    let width = 1000;
    let height = 1000;  
    for (let i = 0; i < req.files.length; i++) {

      switch (req.files[i].mimetype) {
        case "image/jpeg":      
          sharp(req.files[i].path)
            .resize(width, height)
            .toFile(`./${req.files[i].path}.jpeg`, (err, info) => {
              if(err) throw err;
              console.log('file uploaded successfully')
            })
          uploadStr += req.files[i].path + ".jpeg" + " ";
          break;

        case "image/png":
          sharp(req.files[i].path)
            .resize(width, height)
            .toFile(`./${req.files[i].path}.png`, (err, info) => {
              if(err) throw err;
              console.log('file uploaded successfully')
            })
          uploadStr += req.files[i].path + ".png" + " ";
          break;
      }
    }

    connection.query(
      `UPDATE listings SET image = "${uploadStr}" WHERE listing_uid = "${req.params.listinguid}"`,
      (err, rows, fields) => {
        if (err) throw err;
      }
    );
  })

};

exports.getPersonalListings = (req, res) => {
  connection.query(
    `SELECT * FROM listings WHERE seller_uid = "${req.params.selleruid}"`,
    (err, rows, fields) => {
      if (err) throw err;
      res.send(rows);
    }
  );
};


exports.browseAll = (req, res) => {
  connection.query(`SELECT * FROM listings ORDER BY id DESC LIMIT ${req.params.resultnum}`, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows);
  });
};

exports.allNumRows = (req, res) => {
  connection.query(`SELECT COUNT(*) as "COUNT" FROM listings`, (err, rows, fields) => {
    if(err) throw err;
    res.send(rows[0])
  })
}

exports.categoryNumRows = (req, res) => {
  let origCat = req.params.category;
  let newCategory = origCat.split("-").join(" ");
  connection.query(`SELECT COUNT(*) as "COUNT" FROM listings WHERE category = "${newCategory}"`, (err, rows, fields) => {
    if(err) throw err;
    res.send(rows[0])
  })
}

exports.browseCategory = (req, res) => {
  let origCat = req.params.category;
  let newCategory = origCat.split("-").join(" ");
  connection.query(
    `SELECT * FROM listings WHERE category = "${newCategory}" ORDER BY id DESC LIMIT ${req.params.resultnum}`,
    (err, rows, field) => {
      if (err) throw err;
      res.send(rows);
    }
  );
};

exports.browseSingle = (req, res) => {
  let listinguid = req.params.listinguid;
  connection.query(
    `SELECT * FROM listings WHERE listing_uid = "${listinguid}"`,
    (err, rows, field) => {
      if (err) throw err;
      res.send(rows[0]);
    }
  );
};

exports.saveListing = (req, res) => {
  let r = req.body;
  connection.query(
    `SELECT saved_posts FROM users WHERE user_uid = "${req.params.useruid}"`,
    (err, rows1, fields) => {
      if (err) throw err;

      if (rows1[0].saved_posts === null || rows1[0].saved_posts === "") {
        connection.query(
          `UPDATE users SET saved_posts = "${
            req.params.listinguid
          }" WHERE user_uid = "${req.params.useruid}"`,
          (err, rows2, fields) => {
            if (err) throw err;
          }
        );
      } else {
        connection.query(
          `UPDATE users SET saved_posts = "${
            rows1[0].saved_posts + "," + req.params.listinguid
          }" WHERE user_uid = "${req.params.useruid}"`,
          (err, rows2, fields) => {
            if (err) throw err;
          }
        );
      }
    }
  );
};

exports.getSaved = (req, res) => {
  let useruid = req.params.useruid;
  connection.query(
    `SELECT saved_posts FROM users WHERE user_uid = "${useruid}"`,
    (err, rows, fields) => {
      // console.log(rows[0].saved_posts)
      if (err) throw err;
      if(rows[0].saved_posts === null || rows[0].saved_posts === "") {
        res.send([]);
      } else {
        // console.log(rows[0].saved_posts)
        connection.query(`SELECT * FROM listings WHERE listing_uid IN (${rows[0].saved_posts})`, (err, rows2, fields) => {
          if(err) throw err;
          res.send(rows2);
        })
      }
    }
  );
};

exports.updateSaved = (req, res) => {
  let useruid = req.params.useruid;
  let listinguid = req.params.listinguid;
  connection.query(`SELECT * FROM users WHERE user_uid = "${useruid}"`, (err, rows, fields) => {
    if(err) throw err;
    const savedArr = rows[0].saved_posts.split(",");
    const matching = (string) => string == listinguid;
    for(let i = 0; i < savedArr.length; i++) {
      console.log(savedArr)
      savedArr.splice(savedArr.findIndex(matching), 1);
      const stringArr = savedArr.join(",");
      connection.query(`UPDATE users SET saved_posts = "${savedArr}" WHERE user_uid = "${useruid}"`, (err, rows, field) => {
        if(err) throw err;
      })
      break;    
    }
  })
}

exports.updateStatus = (req, res) => {
  connection.query(`UPDATE listings SET status = "${req.body.status}" WHERE listing_uid = "${req.params.listinguid}"`, (err, rows, field) => {
    if(err) throw err;
  })
}

exports.deleteListing = (req, res) => {
  connection.query(`DELETE FROM listings WHERE listing_uid = "${req.params.listinguid}"`, (err, rows, fields) => {
    if(err) throw err;
    console.log(`Listing ${req.params.listinguid} deleted`);
  })
}

exports.search = (req, res) => {
  console.log("------")
  let searchVal = req.body.searchValue;
  let searchArr = searchVal.split(" ");
  let uniqSet = new Set([...searchArr]);
  let uniqArr = Array.from(uniqSet);
  let uidArr = [];
  connection.query(`SELECT listing_uid, tags FROM listings`, (err, rows, fields) => {
    if(err) throw err; 
    rows.forEach(item => {
      for(let i = 0; i < uniqArr.length; i++) {
        if(item.tags.includes(uniqArr[i])) {
          uidArr.push(item.listing_uid);
          return uidArr;
        }
      }
    })

    console.log(uidArr)
    console.log(typeof(uidArr))
    uidArr === {} ?
      console.log("uidArr is null")    
    :
    connection.query(`SELECT * FROM listings WHERE listing_uid IN (${uidArr})`, (err, rows, fields) => {
      if(err) console.log(err) ;
      if(uidArr === null) {
        console.log("this is null")
        res.send(null)
      } else {
        console.log("Not null")
        res.send(rows);
      }
    })
  }) 
}

exports.search2 = (req, res) => {
  let searchVal = (req.params.searchval.replace(/-/g, " "))
  let searchArr = searchVal.split(" ");
  let uniqSet = new Set([...searchArr]);
  let uniqArr = Array.from(uniqSet);
  let uidArr = [];
  console.log(uniqArr)

  connection.query(`SELECT listing_uid, tags FROM listings`, (err, rows, fields) => {
    if(err) throw err;
    rows.forEach(item => {
      for(let i = 0; i < uniqArr.length; i++) {
        if(item.tags.includes(uniqArr[i])) {
          // console.log("Yepp, getting through")
          uidArr.push(item.listing_uid);
          return uidArr;
        }
      }
    })

    console.log(uidArr)
    uidArr === {} ?
    console.log("uidArr is null")
    :
    connection.query(`SELECT * FROM listings WHERE listing_uid IN (${uidArr})`, (err, rows, fields) => {
      if(err) console.log(err);
      uidArr === null ? res.send(null) : res.send(rows);
    })
  })
}

exports.getStatusPersonalListings = (req, res) => {
  let rp = req.params;
  console.log(req.params)
  connection.query(`SELECT * FROM listings WHERE seller_uid = "${rp.selleruid}" AND status = "${rp.status}"`, (err, rows, fields) => {
    if (err) throw err;
    res.send(rows)
  })
}