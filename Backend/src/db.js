import mysql from 'mysql2/promise'

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'to_do_list_db'
});