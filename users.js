router.post("/register", function (req, res) {
  const body = req.body;
  let add_new_user = `
    INSERT INTO user (firstname, lastname, username, email, password) 
    VALUES (
      "${body.firstname}", "${body.lastname}", "${body.username}",
      "${body.email}", "${body.password}"
    )`;
  db.run(add_new_user, (err) => {
    if (err) {
      return res.json("Registration failed");
    }
    return res.json("Registration successful!!");
  });
});

router.get("/login", function (req, res) {
  let get_all_user = "SELECT * FROM user";
  db.all(get_all_user, (err, rows) => {
    if (err) {
      return res.json({ status: "Failed" });
    }
    return res.json({ status: "Success", data: rows });
  });
});

router.post("/create_mockdata", function (req, res) {
  let add_new_user = `
    INSERT INTO user (firstname, lastname, username, email, password)
    VALUES 
    ("minerva", "despair", "minerva", "minerva@despair.mail", "p@ssword"),
    ("neuro", "sama", "neurosama", "neurosama@vedal.mail", "p@ssword"),
    ("morgana", "zz", "morganazz", "morgana@mona.mail", "p@ssword")
  `;

  let add_new_message = `
    INSERT INTO message (timestamp, body, sender_user_id, receiver_user_id)
    VALUES
    ("1680958708", "hello, world!", 1, 1),
    ("1680958769", "supporter to user", 2, 1)
  `;

  let add_new_video = `
    INSERT INTO video (title, url, description)
    VALUES
    ("I Really Want To Stay At Your House", "https://youtu.be/sEDDfohAbU4", "From Cyberpunk2077"),
    ("You know it's fool on cool", "https://youtu.be/ruCzgIWwb-8", "Nothing Amazing Happens Here"),
    ("Headphone Actor", "https://youtu.be/nnyACg_WQLw", "Kagerou Daze!")
  `;

  let add_new_package = `
    INSERT INTO package (package_name, price, description)
    VALUES 
    ("Dragon Plan", 999.0, "4K resolution"),
    ("Hero Plan", 799.0, "2K resolution"),
    ("Slime Plan", 199.0, "480p resolution")
  `;

  let add_new_creditcard = `
    INSERT INTO creditcard (card_number, expiration_month, expiration_year, security_code, user_id)
    VALUES
    ("15473685234", "08", "29", "420", 1),
    ("24623456336", "12", "27", "030", 1),
    ("42364646231", "03", "25", "635", 3)
  `;

  let add_new_bill = `
    INSERT INTO bill (start_timestamp, end_timestamp, package_id, user_id, creditcard_id)
    VALUES
    ("1680951233", "1680955677", 1, 1, 2),
    ("1680954324", "1680955676", 2, 1, 1),
    ("1680953246", "1680956788", 3, 3, 3)
  `;

  db.run(add_new_user);
  db.run(add_new_message);
  db.run(add_new_video);
  db.run(add_new_package);
  db.run(add_new_creditcard);
  db.run(add_new_bill);
  res.json("Create mock data successful!");
});

router.get("/get/:table", function (req, res) {
  let get_table = `SELECT * FROM ${req.params.table}`;

  db.all(get_table, (err, rows) => {
    if (err) {
      return res.json({ status: "Failed" });
    }
    return res.json({ status: "Success", data: rows });
  });
});

router.post("/create_message/:n", function (req, res) {
  let n = parseInt(req.params.n);
  for (let i = 0; i < n; i++) {
    let rand = Math.random();
    let min = 1679698470;
    let max = 1681106266;
    let timestamp = min + Math.floor((max - min) * rand);
    let add_new_message = `INSERT INTO message (timestamp, body, sender_user_id, receiver_user_id)
    VALUES (${timestamp}, "hello, world! no.${i}", 1, 1)`;
    db.run(add_new_message);
  }
  res.json("Create mock message successful!");
});

router.post("/create_bill/:n", function (req, res) {
  let n = parseInt(req.params.n);
  for (let i = 0; i < n; i++) {
    let rand = Math.random();
    let min = 1649545067;
    let max = 1681106267;
    let timestamp = min + Math.floor((max - min) * rand);
    // let choice = [1, 2, 3][Math.floor(rand * 3)];
    let add_new_message = `INSERT INTO bill (start_timestamp, end_timestamp, package_id, user_id, creditcard_id)
    VALUES (${timestamp}, ${timestamp}, 3, 1, 2)`;
    db.run(add_new_message);
  }
  res.json("Create mock bill successful!");
});