import { Router } from "express"
import reviewsHandler from "./handlers.js"

const reviewsRouter = Router()

reviewsRouter.get(
  "/:productId/reviews",
  reviewsHandler.getAllReviewsOfASingleProduct
)
reviewsRouter.route("/:productId").post(reviewsHandler.createNewReview)

export default reviewsRouter
