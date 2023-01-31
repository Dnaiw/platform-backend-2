import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';
import { DeckModule } from './deck/deck.module';

@Module({
  imports: [CardModule, DeckModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
