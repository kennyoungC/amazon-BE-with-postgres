import pool from "../../db/connect.js"

const getAll = async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products")
    res.send(rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
}
const getById = async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM products WHERE id= $1", [
      req.params.productId,
    ])
    res.send(rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

const productsHandler = {
  getAll,
  getById,
}
export default productsHandler
