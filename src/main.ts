import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        console.log(errors); // Log validation errors
        return new BadRequestException(errors);
      },
    }),
  );

  // Set Global Prefix
  const globalPrefix = 'api/v1';
  app.setGlobalPrefix(globalPrefix);

  // Determine which port to use (from environment or default to 3000)
  const port = process.env.PORT || 3000;

  // Start listening on the determined port
  await app.listen(port);

  // Log the actual port in use
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
}
bootstrap();
