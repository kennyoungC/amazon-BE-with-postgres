import createHttpError from "http-errors"
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
    if (rows.length === 0) {
      next(
        createHttpError(
          404,
          `Product with id ${req.params.productId} Not Found`
        )
      )
    } else {
      res.send(rows)
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
}
const createNewProduct = async (req, res, next) => {
  const {
    brand,
    name,
    imageUrl: image_url,
    price,
    category,
    description,
  } = req.body
  const text =
    "INSERT INTO products( brand,name, image_url, price, category,description) VALUES($1, $2, $3, $4, $5, $6) RETURNING *"
  const values = [brand, name, image_url, price, category, description]
  try {
    const { rows } = await pool.query(text, values)
    res.send(rows[0])
  } catch (error) {
    next(createHttpError(404, error.stack))
    console.log(error.message)
  }
}

const productsHandler = {
  getAll,
  getById,
  createNewProduct,
}
export default productsHandler
