import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewService } from './review.service';
import { REVIEW_NOT_FOUND, REVIEW_DEL } from './review.constants';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('review')
export class ReviewController {

    constructor(private readonly reviwService: ReviewService) { }

    @UsePipes(new ValidationPipe())
    @Post('create')
    async create(@Body() dto: CreateReviewDto) {
        return this.reviwService.create(dto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedDoc = await this.reviwService.delete(id);
        if (!deletedDoc) {
            throw new HttpException(REVIEW_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return REVIEW_DEL
    }

    @Get('byProduct/:productId')
    async getByProduct(@Param('productId') productId: string) {
        return this.reviwService.findByProductId(productId);
    }
}
