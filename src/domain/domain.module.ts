import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [UsersModule,CategoriesModule,ProductsModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class DomainModule {}
