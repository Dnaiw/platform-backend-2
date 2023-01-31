import { Module } from '@nestjs/common';
import { DeckService } from './deck.service';
import { DeckController } from './deck.controller';
import { CardService } from '../card/card.service';
import { CardModule } from 'src/card/card.module';

@Module({
  imports: [CardModule],
  controllers: [DeckController],
  providers: [DeckService],
})
export class DeckModule {}
