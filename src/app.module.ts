import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ApplicationModule } from './application/application.module';
import { HttpExceptionFilter } from './common/filters/http-exeception.filter';


@Module({
  imports: [
    ApplicationModule
  ],
  providers: [
    {
      // Global Error Handler
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule { }
