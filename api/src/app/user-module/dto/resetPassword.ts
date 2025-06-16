import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 6)
  otp!: string;

  @IsString()
  newPassword!: string;
}
