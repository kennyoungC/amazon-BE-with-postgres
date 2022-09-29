import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import createDefaultTables from "./db/create-tables.js"
import productsRouter from "./services/products/routes.js"
import reviewsRouter from "./services/reviews/routes.js"
import {
  badRequestErrorHandler,
  genericErrorHandler,
  notFoundErrorHandler,
  unauthorizedErrorHandler,
} from "./errorHandlers.js"

const server = express()

const { PORT } = process.env

server.use(cors())
server.use(express.json())

// ******ENDPOINTS ********
server.use("/products", productsRouter)
server.use("/products", reviewsRouter)

// *********** Middleware Error Handlers ***********
server.use(badRequestErrorHandler) // 400
server.use(unauthorizedErrorHandler) // 401
server.use(notFoundErrorHandler) // 404
server.use(genericErrorHandler) // 500

server.listen(PORT, async () => {
  console.table(listEndpoints(server))
  console.log(`Server is listening on port ${PORT}!`)
  await createDefaultTables()
})

server.on("error", console.log)
