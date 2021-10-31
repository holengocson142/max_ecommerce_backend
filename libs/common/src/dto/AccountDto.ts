import { ApiProperty, ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { VALIDATION } from '../contants';
import { ResponseDto } from './RequestDto';

export class RegisterEmailAccountBody {
    @ApiProperty({ example: 'nguyenvana@gmail.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    @MinLength(VALIDATION.PASSWORD.MIN_LENGTH)
    @MaxLength(VALIDATION.PASSWORD.MAX_LENGTH)
    password: string;
}

export class RegisterAccountEmailResponse {
    @ApiResponseProperty({ example: 2 })
    id: number;

    @ApiResponseProperty({ example: 'nguyenvanb@gmail.com' })
    email: string;
}

export class RegisterAccountEmailResponseDto extends ResponseDto {
    @ApiResponseProperty({ type: RegisterAccountEmailResponse })
    data: RegisterAccountEmailResponse;
}
