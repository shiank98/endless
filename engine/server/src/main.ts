import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * This function bootstraps the application creating an instance of our app and setting the listener port.
 * @version 1.0.0
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (Cross-origin resource sharing) in the server application
  app.enableCors();

  await app.listen(process.env.PORT || 3000);

  console.log(`Server running on port ${process.env.PORT || 3000}`)
}
bootstrap();
