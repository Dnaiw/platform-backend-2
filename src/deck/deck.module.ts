import { Module } from '@nestjs/common';
import { DeckService } from './deck.service';
import { DeckController } from './deck.controller';
import { CardModule } from 'src/card/card.module';
import { ErrorHandlerService } from 'src/util/error-handler/error-handler.service';
import { CardService } from 'src/card/card.service';

@Module({
  imports: [CardModule],
  controllers: [DeckController],
  providers: [DeckService, ErrorHandlerService, CardService],
})
export class DeckModule {}
