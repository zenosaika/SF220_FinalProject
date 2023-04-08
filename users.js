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
    ("1680958708", "hello, world!", 0, 0),
    ("1680958769", "supporter to user", 1, 0)
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
    ("15473685234", "08", "29", "420", 0),
    ("24623456336", "12", "27", "030", 0),
    ("42364646231", "03", "25", "635", 2)
  `;

  let add_new_bill = `
    INSERT INTO bill (start_date, end_date, package_id, user_id, creditcard_id)
    VALUES
    ("20230101", "20230201", 0, 0, 1),
    ("20230201", "20230301", 1, 0, 0),
    ("20230218", "20230318", 2, 2, 2)
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
  let get_all_table = `SELECT * FROM ${req.params.table}`;

  db.all(get_all_table, (err, rows) => {
    if (err) {
      return res.json({ status: "Failed" });
    }
    return res.json({ status: "Success", data: rows });
  });
});
