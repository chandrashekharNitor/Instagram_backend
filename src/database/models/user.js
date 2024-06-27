import bcrypt from "bcrypt";

export class User {
  constructor({
    id,
    email,
    password,
    username,
    first_name,
    last_name,
    avatar_url,
    bio,
    verified,
    birth_date,
    created_at,
    updated_at,
  }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.avatar_url = avatar_url;
    this.bio = bio;
    this.verified = verified;
    this.birth_date = birth_date;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      firstName: this.first_name,
      lastName: this.last_name,
      fullName: `${this.first_name} ${this.last_name}`,
      avatar_url: this.avatar_url,
      bio: this.bio,
      verified: this.verified,
      birth_date: this.birth_date,
      //   created_at: this.created_at,
      //   updated_at: this.updated_at,
    };
  }

  async isPasswordValid(password) {
    return bcrypt.compare(password, this.password);
  }

  createPayload() {
    return {
      sub: this.id,
    };
  }
}
