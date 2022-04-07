const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')


const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  const {id} = req.params;
  let sql = "SELECT * FROM users where id =?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [id])

  pool.query(sql, (err, rows) => {
    Promise.resolve().then(()=>{
      if (err) throw err;
      return res.json(rows);
    })
    .catch(err => {
      console.log(err)
      res.send('there is an error: ' + err.sqlMessage)
    })
  })
}

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME 
  const { lastname, firstname } = req.body
  let sql = "INSERT INTO ?? (??, ??) VALUES (?,?)"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users", "first_name", "last_name", firstname, lastname])
  console.log(sql)

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    console.log(results)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  const { firstname, lastname } = req.body
  const {id} = req.params
  let sql ="UPDATE ?? SET ?? =?, ?? =? WHERE id =?"
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ['users', 'first_name', firstname, 'last_name', lastname, id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json(results);
  })
}

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  let sql ="DELETE FROM users WHERE first_name =?";
  const {first_name} = req.params
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [first_name])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}

function getusers (req, res){
  console.log('inside getuser route')
  let sql = "SELECT * FROM users"
  console.log(req.params)
  pool.query(sql, (err, result)=>{
    if(err){
      res.send('there is an error')
      throw err
    } else {
      res.json(req.params)
    }
  })
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserByFirstName,
  getusers
}