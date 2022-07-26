import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import createDefaultTables from "./db/create-tables.js"

const server = express()
createDefaultTables()

const { PORT } = process.env || 5001

server.use(cors())
server.use(express.json())

server.listen(PORT, () => {
  console.table(listEndpoints(server))
  console.log(`Server is listening on port ${PORT}!`)
})
