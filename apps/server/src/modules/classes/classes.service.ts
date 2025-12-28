import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateClassInput, UpdateClassInput } from './dto/class.input';
import { Class } from './models/class.model';
import { randomBytes } from 'crypto';

@Injectable()
export class ClassesService {
    constructor(@Inject('PG_POOL') private readonly pool: Pool) { }

    /**
     * Generate a URL-safe public ID (12 characters)
     * Similar to Google Classroom's Base64 encoded ID
     */
    private generatePublicId(): string {
        return randomBytes(9).toString('base64url');
    }

    /**
     * Generate a human-friendly join code (8 characters, lowercase alphanumeric)
     * Easy to read aloud and type
     */
    private generateJoinCode(): string {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        const bytes = randomBytes(8);
        for (let i = 0; i < 8; i++) {
            code += chars[bytes[i] % chars.length];
        }
        return code;
    }

    private readonly selectFields = `
        id, 
        public_id as "publicId", 
        join_code as "joinCode", 
        name, 
        description, 
        owner_id as "ownerId", 
        created_at as "createdAt"
    `;

    async findAll(): Promise<Class[]> {
        const result = await this.pool.query(
            `SELECT ${this.selectFields} FROM classes ORDER BY created_at DESC`
        );
        return result.rows;
    }

    async findById(id: number): Promise<Class> {
        const result = await this.pool.query(
            `SELECT ${this.selectFields} FROM classes WHERE id = $1`,
            [id]
        );

        if (!result.rows[0]) {
            throw new NotFoundException(`Class with id ${id} not found`);
        }

        return result.rows[0];
    }

    async findByPublicId(publicId: string): Promise<Class> {
        const result = await this.pool.query(
            `SELECT ${this.selectFields} FROM classes WHERE public_id = $1`,
            [publicId]
        );

        if (!result.rows[0]) {
            throw new NotFoundException(`Class not found`);
        }

        return result.rows[0];
    }

    async findByJoinCode(joinCode: string): Promise<Class> {
        const result = await this.pool.query(
            `SELECT ${this.selectFields} FROM classes WHERE join_code = $1`,
            [joinCode.toLowerCase()]
        );

        if (!result.rows[0]) {
            throw new NotFoundException(`Class with join code ${joinCode} not found`);
        }

        return result.rows[0];
    }

    async findByOwner(ownerId: number): Promise<Class[]> {
        const result = await this.pool.query(
            `SELECT ${this.selectFields} FROM classes WHERE owner_id = $1 ORDER BY created_at DESC`,
            [ownerId]
        );
        return result.rows;
    }

    async create(input: CreateClassInput, ownerId: number): Promise<Class> {
        const publicId = this.generatePublicId();
        const joinCode = this.generateJoinCode();

        const result = await this.pool.query(
            `INSERT INTO classes (name, description, owner_id, public_id, join_code) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING ${this.selectFields}`,
            [input.name, input.description, ownerId, publicId, joinCode]
        );
        return result.rows[0];
    }

    async update(input: UpdateClassInput, userId: number): Promise<Class> {
        const existing = await this.findById(input.id);

        if (existing.ownerId !== userId) {
            throw new ForbiddenException('You can only update your own classes');
        }

        const updates: string[] = [];
        const values: (string | number)[] = [];
        let paramIndex = 1;

        if (input.name !== undefined) {
            updates.push(`name = $${paramIndex++}`);
            values.push(input.name);
        }

        if (input.description !== undefined) {
            updates.push(`description = $${paramIndex++}`);
            values.push(input.description);
        }

        if (updates.length === 0) {
            return existing;
        }

        values.push(input.id);

        const result = await this.pool.query(
            `UPDATE classes SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING ${this.selectFields}`,
            values
        );

        return result.rows[0];
    }

    async regenerateJoinCode(id: number, userId: number): Promise<Class> {
        const existing = await this.findById(id);

        if (existing.ownerId !== userId) {
            throw new ForbiddenException('You can only regenerate join codes for your own classes');
        }

        const newJoinCode = this.generateJoinCode();

        const result = await this.pool.query(
            `UPDATE classes SET join_code = $1 WHERE id = $2 RETURNING ${this.selectFields}`,
            [newJoinCode, id]
        );

        return result.rows[0];
    }

    async delete(id: number, userId: number): Promise<boolean> {
        const existing = await this.findById(id);

        if (existing.ownerId !== userId) {
            throw new ForbiddenException('You can only delete your own classes');
        }

        await this.pool.query('DELETE FROM classes WHERE id = $1', [id]);
        return true;
    }
}
