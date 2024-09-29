import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../users/auth/jwt/jwt-auth.guard';
import { CategoryEntity } from './entity/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @UseGuards(JwtAuthGuard) // Ensure the user is authenticated
  @Post('create')
  async create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    const user = req.user;
    return await this.categoriesService.create(createCategoryDto, user);
  }

  @Get('all')
  findAll(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryEntity> {
    return this.categoriesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard) 
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoriesService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard) 
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.categoriesService.remove(+id);
  }
}
