import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import createDefaultTables from "./db/create-tables.js"
import productsRouter from "./services/products/routes.js"
import reviewsRouter from "./services/reviews/routes.js"

const server = express()

const { PORT } = process.env

server.use(cors())
server.use(express.json())

// ******ENDPOINTS ********
server.use("/products", productsRouter)
server.use("/products", reviewsRouter)

server.listen(PORT, async () => {
  console.table(listEndpoints(server))
  console.log(`Server is listening on port ${PORT}!`)
  await createDefaultTables()
})

server.on("error", console.log)
