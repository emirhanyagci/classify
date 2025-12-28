
export interface User {
    id: string;
    name: string;
    email: string;
    accessToken?: string;
    imageUrl?: string;
    created_at?: Date;
}

export interface JwtPayload {
    sub: number;
    email: string;
    name?: string;
    iat?: number;
    exp?: number;
}