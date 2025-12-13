import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    name: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
export class LoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
