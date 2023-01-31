import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { DeckModule } from './deck/deck.module';
import { ErrorHandlerService } from './util/error-handler/error-handler.service';

@Module({
  imports: [CardModule, DeckModule],
  controllers: [AppController],
  providers: [AppService, ErrorHandlerService],
})
export class AppModule {}
