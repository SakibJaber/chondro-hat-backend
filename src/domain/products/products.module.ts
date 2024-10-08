import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entity/product.entity';
import { CategoryEntity } from '../categories/entity/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity,CategoryEntity]) 
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
