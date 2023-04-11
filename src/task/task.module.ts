import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ErrorHandlerService } from 'src/util/error-handler/error-handler.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, ErrorHandlerService],
  exports: [TaskService],
})
export class TaskModule {}
