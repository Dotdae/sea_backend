import "dotenv/config";
import { createPool } from "mysql2/promise";

export const pool = createPool({

    host: 'localhost',
    user: process.env.user,
    password: process.env.password,
    port: 3306,
    database: process.env.db,

});


