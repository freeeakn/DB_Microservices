import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      entities: [User],
      synchronize: true, // Используйте только в разработке
    }),
    AuthModule,
  ],
})
export class AppModule {}
