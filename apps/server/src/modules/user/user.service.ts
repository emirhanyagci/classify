import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Pool } from "pg";
import * as bcrypt from 'bcrypt';
import { CreateUserInput, UpdateUserInput } from "./dto/user.input";
@Injectable()
export class UserService {
    constructor(
        @Inject("PG_POOL") private readonly pool: Pool,
    ) { }
    async validateUser(email: string, password: string) {
        const user = await this.findByEmail(email);

        if (user && await bcrypt.compare(password, user.password_hash)) {
            return user;
        }

        throw new UnauthorizedException('Invalid credentials');
    }
    async createUser(user: CreateUserInput) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await this.pool.query('INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *', [user.name, user.email, hashedPassword]);
        return result.rows[0];
    }
    async getUsers() {
        const result = await this.pool.query('SELECT * FROM users');
        return result.rows;
    }

    async findByEmail(email: string) {
        const result = await this.pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    }
    async findById(id: number) {
        const result = await this.pool.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }
    async updateUser(id: number, input: UpdateUserInput) {
        const updates: string[] = [];
        const values: (string | number)[] = [];
        let paramIndex = 1;

        if (input.name !== undefined) {
            updates.push(`name = $${paramIndex++}`);
            values.push(input.name);
        }

        if (input.email !== undefined) {
            updates.push(`email = $${paramIndex++}`);
            values.push(input.email);
        }

        if (input.password !== undefined) {
            const hashedPassword = await bcrypt.hash(input.password, 10);
            updates.push(`password = $${paramIndex++}`);
            values.push(hashedPassword);
        }

        if (input.imageUrl !== undefined) {
            updates.push(`image_url = $${paramIndex++}`);
            values.push(input.imageUrl);
        }

        if (updates.length === 0) {
            return this.findById(id);
        }

        values.push(id);

        const result = await this.pool.query(
            `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING id, name, email, image_url as "imageUrl"`,
            values
        );

        return result.rows[0];
    }
}
