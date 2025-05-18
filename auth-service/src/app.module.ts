import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'sql-server',
      port: 1433,
      username: 'SA',
      password: 'Strong@Passw0rd',
      database: 'authdb',
      entities: [User],
      options: {
        encrypt: false,
      },
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}
