import pool from '../database.js';
import {v4 as uuidv4} from 'uuid';

export default class PeopleRepository {

  async save(name) {
    const id = uuidv4();
    const rs = await pool.query(`INSERT INTO people (id, name) VALUE('${id}', '${name}')`);

    return rs;
  }

  async findAll() {
    return pool.query(`SELECT id, name FROM people;`)
    .then((result) => {
      const [rows, fields] = result;
      return rows;
    });
  }
}
