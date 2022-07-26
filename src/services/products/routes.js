import { Router } from "express"
import productsHandler from "./handlers.js"

const productsRouter = Router()

productsRouter.get("/", productsHandler.getAll)
productsRouter.get("/:productId", productsHandler.getById)

export default productsRouter
