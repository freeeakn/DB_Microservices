import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'mssql',
      port: 1433,
      username: 'sa',
      password: 'Strong@Passw0rd',
      database: 'auth',
      entities: [User],
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
