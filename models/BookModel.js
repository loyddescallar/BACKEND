import pool from "../config/db.js";

export const getBooks = async () => {
  const [rows] = await pool.query("SELECT * FROM tbl_book");
  return rows;
};

export const insertBook = async (name, genre, status) => {
  const [result] = await pool.query(
    "INSERT INTO tbl_book (name, genre, status) VALUES (?, ?, ?)",
    [name, genre, status]
  );
  return result.insertId;
};

export const updateBook = async (id, name, genre, status) => {
  const [result] = await pool.query(
    "UPDATE tbl_book SET name = ?, genre = ?, status = ? WHERE id = ?",
    [name, genre, status, id]
  );
  return result.affectedRows;
};

export const deleteBook = async (id) => {
  const [result] = await pool.query(
    "DELETE FROM tbl_book WHERE id = ?",
    [id]
  );
  return result.affectedRows;
};
