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

  async updateUser(user) {
    const { id, firstname, lastname, bio, avtar_url } = user;

    const query = `UPDATE public.users SET 
      first_name = COALESCE($2, first_name),
      last_name = COALESCE($3, last_name),
      bio = COALESCE($4, bio),
      avatar_url = COALESCE($5, avatar_url)
      WHERE id = $1`;

    return this.db.query(query, [id, firstname, lastname, bio, avtar_url]);
  }
}
