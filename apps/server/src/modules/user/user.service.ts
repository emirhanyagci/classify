import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { Pool } from "pg";
import * as bcrypt from 'bcrypt';
import { User } from "@classify/common";
import { CreateUserDto } from "./dto/create-user.dto";
@Injectable()
export class UserService {
    constructor(
        @Inject("PG_POOL") private readonly pool: Pool,
    ) { }
    async validateUser(email: string, password: string) {
        const user = await this.findByEmail(email);

        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }

        throw new UnauthorizedException('Invalid credentials');
    }
    async createUser(user: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await this.pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [user.name, user.email, hashedPassword]);
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
        const result = await this.pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }
}
