import fs from "fs-extra"
import path from "path"
import pool from "./connect.js"

const tablesFilePath = path.join(process.cwd(), "src/db/table.sql")
const reviewsTablesFilePath = path.join(
  process.cwd(),
  "src/db/reviews-table.sql"
)

const createDefaultTables = async () => {
  try {
    // Read the tables.sql file as buffer
    const buffer = await fs.readFile(tablesFilePath)
    const reviewsBuffer = await fs.readFile(reviewsTablesFilePath)
    // Convert buffer to string
    const tablesSQLQuery = buffer.toString()
    const reviewsSQLQuery = reviewsBuffer.toString()
    // execute query
    await pool.query(tablesSQLQuery)
    await pool.query(reviewsSQLQuery)
    console.log("✅ Default tables are created")
  } catch (error) {
    console.log(error)
  }
}

export default createDefaultTables
