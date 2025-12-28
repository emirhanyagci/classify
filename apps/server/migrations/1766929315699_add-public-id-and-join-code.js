/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.sql(`
        -- Enable pgcrypto extension for gen_random_bytes
        CREATE EXTENSION IF NOT EXISTS pgcrypto;
        
        -- Add public_id column (URL-safe identifier)
        ALTER TABLE classes ADD COLUMN public_id VARCHAR(16) UNIQUE;
        
        -- Add join_code column (human-friendly code for joining)
        ALTER TABLE classes ADD COLUMN join_code VARCHAR(8) UNIQUE;
        
        -- Generate public_id and join_code for existing classes
        UPDATE classes SET 
            public_id = replace(replace(encode(gen_random_bytes(9), 'base64'), '+', '-'), '/', '_'),
            join_code = lower(substring(md5(random()::text || clock_timestamp()::text) from 1 for 8));
        
        -- Make columns NOT NULL after populating existing data
        ALTER TABLE classes ALTER COLUMN public_id SET NOT NULL;
        ALTER TABLE classes ALTER COLUMN join_code SET NOT NULL;
        
        -- Create indexes for faster lookups
        CREATE INDEX idx_classes_public_id ON classes(public_id);
        CREATE INDEX idx_classes_join_code ON classes(join_code);
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.sql(`
        DROP INDEX IF EXISTS idx_classes_join_code;
        DROP INDEX IF EXISTS idx_classes_public_id;
        ALTER TABLE classes DROP COLUMN IF EXISTS join_code;
        ALTER TABLE classes DROP COLUMN IF EXISTS public_id;
    `);
};
