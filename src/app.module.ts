import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from './domain/domain.module';
import { typeormAsyncConfig } from 'ormconfig';
import { ProductsModule } from './products/products.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.dev'],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`.trim(),
      // load: [appConfig],
    }),
    TypeOrmModule.forRootAsync(typeormAsyncConfig), // Async TypeORM config
    DomainModule, ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
