import pg from "pg"

const pool = new pg.Pool()

export default pool

// Not needed
// {
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// }
