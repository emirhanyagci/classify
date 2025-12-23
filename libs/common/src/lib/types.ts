
export interface User {
    id: number;
    name: string;
    email: string;
    accessToken?: string;
    created_at?: Date;
}

export interface JwtPayload {
    sub: number;
    email: string;
    name?: string;
    iat?: number;
    exp?: number;
}