import { User } from "../models/user.js";

export class UserRepository {
  constructor(db) {
    this.db = db;
  }

  /**
   * Finds a user by their email.
   *
   * @param {string} email - The email of the user to find.
   * @return {Promise<User|null>} A Promise that resolves to the User object if found, or null if not found.
   */ async findByEmail(email) {
    const result = await this.db.query(
      "SELECT * FROM public.users where email = $1",
      [email]
    );

    return result.rows.length ? new User(result.rows[0]) : null;
  }

  async findById(id) {
    const result = await this.db.query(
      "SELECT * FROM public.users where id = $1",
      [id]
    );

    return result.rows.length ? new User(result.rows[0]) : null;
  }

  async insertUser(user) {
    const { email, password, username } = user;
    const result = await this.db.query(
      "INSERT INTO public.users(email, password, username) VALUES($1, $2, $3) RETURNING *",
      [email, password, username]
    );

    return result.rowCount === 1 && result.rows.length
      ? new User(result.rows[0])
      : null;
  }
}
