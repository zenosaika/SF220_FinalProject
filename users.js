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
