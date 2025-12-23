import { Inject, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Pool } from 'pg';
import { CreateClassInput, UpdateClassInput } from './dto/class.input';
import { Class } from './models/class.model';

@Injectable()
export class ClassesService {
    constructor(@Inject('PG_POOL') private readonly pool: Pool) { }

    async findAll(): Promise<Class[]> {
        const result = await this.pool.query(
            'SELECT id, name, description, owner_id as "ownerId", created_at as "createdAt" FROM classes ORDER BY created_at DESC'
        );
        return result.rows;
    }

    async findById(id: number): Promise<Class> {
        const result = await this.pool.query(
            'SELECT id, name, description, owner_id as "ownerId", created_at as "createdAt" FROM classes WHERE id = $1',
            [id]
        );

        if (!result.rows[0]) {
            throw new NotFoundException(`Class with id ${id} not found`);
        }

        return result.rows[0];
    }

    async findByOwner(ownerId: number): Promise<Class[]> {
        const result = await this.pool.query(
            'SELECT id, name, description, owner_id as "ownerId", created_at as "createdAt" FROM classes WHERE owner_id = $1 ORDER BY created_at DESC',
            [ownerId]
        );
        return result.rows;
    }

    async create(input: CreateClassInput, ownerId: number): Promise<Class> {
        const result = await this.pool.query(
            'INSERT INTO classes (name, description, owner_id) VALUES ($1, $2, $3) RETURNING id, name, description, owner_id as "ownerId", created_at as "createdAt"',
            [input.name, input.description, ownerId]
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
            `UPDATE classes SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING id, name, description, owner_id as "ownerId", created_at as "createdAt"`,
            values
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
