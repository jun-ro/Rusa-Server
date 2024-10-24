// model.ts
import { DB } from "https://deno.land/x/sqlite@v3.9.1/mod.ts";

export class Model {
  static table;
  static fields;
  static db;

  static init(dbPath) {
    // Initialize the database
    this.db = new DB(dbPath);
  }

  static sync() {
    // Create the table if it doesn't exist
    const columns = Object.entries(this.fields)
      .map(([name, type]) => `${name} ${type}`)
      .join(", ");
    const query = `CREATE TABLE IF NOT EXISTS ${this.table} (${columns})`;
    this.db.query(query);
  }

  static create(data) {
    // Insert data into the table
    const fields = Object.keys(data).join(", ");
    const values = Object.values(data)
      .map(() => "?")
      .join(", ");
    const query = `INSERT INTO ${this.table} (${fields}) VALUES (${values})`;
    this.db.query(query, Object.values(data));
  }

  static all() {
    // Fetch all rows from the table
    const query = `SELECT * FROM ${this.table}`;
    return this.db.query(query);
  }

  static find(id) {
    // Find a row by ID
    const query = `SELECT * FROM ${this.table} WHERE id = ?`;
    const rows = this.db.query(query, [id]);
    return rows[0] || null;
  }

  static update(id) {
    // Update a row by ID
    const fields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const query = `UPDATE ${this.table} SET ${fields} WHERE id = ?`;
    this.db.query(query, [...Object.values(data), id]);
  }

  static delete(id) {
    // Delete a row by ID
    const query = `DELETE FROM ${this.table} WHERE id = ?`;
    this.db.query(query, [id]);
  }

  static close() {
    // Close the database connection
    this.db.close();
  }
}
