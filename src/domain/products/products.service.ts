import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserEntity } from '../users/entity/user.entity';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../categories/entity/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    user: UserEntity,
    categoryId: number,
  ): Promise<ProductEntity> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const product = await this.productRepository.create({
      ...createProductDto,
      addedBy: user,
      category: category,
    });
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.categoryRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Category not found');
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto); // Update the fields with DTO values
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });
  
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    await this.productRepository.remove(product);
  }
  
}
