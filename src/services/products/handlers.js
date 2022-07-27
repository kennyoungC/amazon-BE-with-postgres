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
    next(createHttpError(400, error.message))
  }
}

const updateProductsById = async (req, res, next) => {
  try {
    // const {} = req.body
    const {
      brand,
      name,
      imageUrl: image_url,
      price,
      category,
      description,
    } = req.body
    const text = `UPDATE products SET brand=$1, name=$2, image_url=$3, price=$4, category=$5, description=$6 WHERE id=$7 RETURNING *`
    const values = [
      brand,
      name,
      image_url,
      price,
      category,
      description,
      req.params.productId,
    ] // Object.values(req.body)
    const { rows } = await pool.query(text, values)
    res.send(rows[0])
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}

const deleteProductById = async (req, res, next) => {
  try {
    const text = "DELETE FROM products WHERE id=$1"
    await pool.query(text, [req.params.productId])
    res.status(204).send()
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}

const productsHandler = {
  getAll,
  getById,
  createNewProduct,
  updateProductsById,
  deleteProductById,
}
export default productsHandler
