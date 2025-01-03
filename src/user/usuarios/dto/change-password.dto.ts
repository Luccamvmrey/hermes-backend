import { IsAlphanumeric, IsNumber } from "class-validator";

export class ChangePasswordDto {
    @IsNumber()
    id: number;

    @IsAlphanumeric()
    newPassword: string;
}