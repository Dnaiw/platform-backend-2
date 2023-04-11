import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { DeckModule } from './deck/deck.module';
import { ErrorHandlerService } from './util/error-handler/error-handler.service';
import { TaskModule } from './task/task.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [CardModule, DeckModule, TaskModule, TestModule],
  controllers: [AppController],
  providers: [AppService, ErrorHandlerService],
})
export class AppModule {}
