import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TaskService } from 'src/task/task.service';
import { ErrorHandlerService } from 'src/util/error-handler/error-handler.service';
import { TaskModule } from 'src/task/task.module';

@Module({
  controllers: [TestController],
  providers: [TestService, ErrorHandlerService, TaskService],
  imports: [TaskModule],
})
export class TestModule {}
