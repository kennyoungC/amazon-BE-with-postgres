import createHttpError from "http-errors"
import pool from "../../db/connect.js"

const getAllReviewsOfASingleProduct = async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM reviews WHERE id=$1", [
      req.param.productId,
    ])
    res.send(rows)
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}

const createNewReview = async (req, res, next) => {
  try {
    const text =
      "INSERT INTO reviews( product_id, rate, comment) VALUES($1, $2, $3) RETURNING *"

    const { rate, comment } = req.body
    console.log(req.param.productId)
    const { rows } = await pool.query(text, [
      req.param.productId,
      rate,
      comment,
    ])
    res.send(rows[0])
  } catch (error) {
    next(createHttpError(400, error.message))
  }
}

const reviewsHandler = {
  getAllReviewsOfASingleProduct,
  createNewReview,
}
export default reviewsHandler
