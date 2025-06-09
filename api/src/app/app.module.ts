import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModuleModule } from './user-module/user-module.module';
import { DatacruizeModule } from './datacruize/datacruize.module';
import { DB_CONFIG } from '../config/DB.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ TypeOrmModule.forRoot(DB_CONFIG), UserModuleModule, DatacruizeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
