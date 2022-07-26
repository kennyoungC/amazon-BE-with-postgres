import { Router } from "express"
import productsHandler from "./handlers.js"

const productsRouter = Router()

productsRouter.get("/", productsHandler.getAll)
productsRouter.post("/", productsHandler.createNewProduct)
productsRouter
  .route("/:productId")
  .get(productsHandler.getById)
  .put(productsHandler.updateProductsById)
  .delete(productsHandler.deleteProductById)

export default productsRouter
