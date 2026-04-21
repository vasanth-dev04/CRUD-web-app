const db = require("../db");
const path = require("path");
const fsPromises = require("fs").promises;

// Get All users
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;
    let query = "SELECT * FROM users";
    let countQuery = "SELECT COUNT(*) as total FROM users";
    let params = [];

    if (search) {
      query += " WHERE name LIKE ? or email LIKE ?";
      countQuery += " WHERE name LIKE ? or email LIKE ?";
      params = [`%${search}%`, `%${search}%`];
    }

    query += " LIMIT ? OFFSET ? ";
    params.push(+limit, +offset);
    const [users] = await db.query(query, params);
    // ✅ Fix
    const [count] = await db.query(
      countQuery,
      search ? [`%${search}%`, `%${search}%`] : [],
    );
    res.json({
      users,
      totalPages: Math.ceil(count[0].total / limit),
      currentPage : +page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single user By id
const getSingleUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).json({ error: "Invalid user id" });
    }
    const [users] = await db.query("SELECT * FROM users WHERE id=?", [id]);
    console.log(users);
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(users[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add new user
const addUser = async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const photo = req.file ? req.file.path : null; // Cloudinary URL
    const [result] = await db.query(
      "INSERT INTO users (name, age, email, photo) VALUES (?,?,?,?)",
      [name, age, email, photo]
    );
    res.status(201).json({ id: result.insertId, name, age, email, photo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { name, age, email } = req.body;
    const photo = req.file ? req.file.path : null;

    let query, params;
    if (photo) {
      query = "UPDATE users SET name=?, age=?, email=?, photo=? WHERE id=?";
      params = [name, age, email, photo, req.params.id];
    } else {
      query = "UPDATE users SET name=?, age=?, email=? WHERE id=?";
      params = [name, age, email, req.params.id];
    }
    const [result] = await db.query(query, params);
    res.status(200).json({ id: req.params.id, name, age, email, photo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user

const deleteUser = async (req, res) => {
  try {
    const [users] = await db.query("SELECT photo FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = users[0];
    if (user.photo) {                           // ← fixed
      const photoPath = path.join(__dirname, "../uploads", user.photo);
      try {
        await fsPromises.unlink(photoPath);
      } catch (err) {
        console.error("Error deleting photo:", err);
      }
    }
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" }); // ← fixed
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAllUsers, getSingleUserById, addUser, updateUser, deleteUser};
