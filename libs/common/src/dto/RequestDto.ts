import { DEFAULT_MAX_PAGE_SIZE, DEFAULT_PAGE_SIZE, SortOrder } from '@app/common';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiResponseProperty } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { Expose, Transform, Type } from 'class-transformer';
import { IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, Max, ValidateIf } from 'class-validator';
import { Request as ExpressRequest } from 'express';

export type JwtPayload = {
    id: number;
    sub: string;
    iat: number;
    exp: number;
};
export interface Request extends ExpressRequest {
    user: PrismaClient & JwtPayload;
}

export class ResponseDto {
    @ApiResponseProperty({ example: HttpStatus.OK })
    statusCode: number;

    @ApiResponseProperty({ example: 'SUCCESS' })
    message: string;

    @ApiResponseProperty()
    data: any;
}

export class SuccessResponseDto extends ResponseDto {
    @ApiResponseProperty({ example: true })
    data: boolean;
}

export class RequestPayload<TUser = any, TParams = any, TQuery = any, TBody = any, TData = any> {
    user?: TUser;
    param?: TParams;
    query?: TQuery;
    body?: TBody;
    data?: TData;
}

class PaginateOptions {
    items: any[];
    totalItems: number;
    pageIndex: number;
    pageSize: number;
}

export class PaginationResponse {
    @ApiResponseProperty()
    items: any[];

    @ApiResponseProperty({ example: 25 })
    totalItems: number;

    @ApiResponseProperty({ example: 3 })
    totalPages: number;

    @ApiResponseProperty({ example: 1 })
    currentPage: number;

    constructor(options: PaginateOptions) {
        const { items, totalItems, pageIndex, pageSize } = options;
        this.items = items;
        this.totalItems = totalItems;
        this.totalPages = ~~(totalItems / pageSize + 1);
        this.currentPage = pageIndex;
    }
}

export class IDParam {
    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    id: number;
}

export class PaginationQuery {
    @ApiPropertyOptional({ example: 1 })
    @Expose()
    @Transform(({ value }) => value || 1)
    @IsOptional()
    @IsInt()
    @IsPositive()
    pageIndex: number;

    @ApiPropertyOptional({
        example: DEFAULT_PAGE_SIZE,
        description: `Default: ${DEFAULT_PAGE_SIZE}, Max: ${DEFAULT_MAX_PAGE_SIZE}`
    })
    @Expose()
    @Transform(({ value }) => value || DEFAULT_PAGE_SIZE)
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Max(DEFAULT_MAX_PAGE_SIZE)
    pageSize: number;

    @Expose()
    @Transform(({ obj }) => {
        const { pageIndex = 1, pageSize = DEFAULT_PAGE_SIZE } = obj as PaginationQuery;
        return (+pageIndex - 1) * pageSize;
    })
    skip: number;
}

export class SortQuery {
    @ApiPropertyOptional({ example: 'id' })
    @IsOptional()
    sortKey: string;

    @ApiPropertyOptional({ example: SortOrder.asc, enum: SortOrder })
    @ValidateIf(({ sortKey }: SortQuery) => !!sortKey)
    @IsIn([SortOrder.asc, SortOrder.desc])
    sortOrder: string;
}

export class SearchQuery {
    @ApiPropertyOptional({ example: 'Nguyen Van A or 15' })
    @Expose()
    @Transform(({ value }) => value ?? '')
    @IsOptional()
    @IsString()
    s: string;
}

export class TokenParam {
    @ApiProperty()
    @IsString()
    @Type(() => String)
    token: string;
}
