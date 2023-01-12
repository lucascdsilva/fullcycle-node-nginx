import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'mysql',
  database: 'app',
  user: 'user',
  password: 'password',
  connectionLimit: 10
})
.promise();

export default pool;

