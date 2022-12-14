import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { Computer } from './computer/entities/computer.entity';
import { User } from './user/entities/user.entity';
import { Admin } from './admin/entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import { AdminAuthModule } from './adminauth/auth.module';
import { ComputerModule } from './computer/computer.module';
import { join } from 'path';
import { UniqueConstraint } from './validation/unique.decorator';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Admin, User, Computer],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public')
    }),
    UserModule,
    AdminModule,
    ComputerModule,
    AdminAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, UniqueConstraint],
})
export class AppModule {}
