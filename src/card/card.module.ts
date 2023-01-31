import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { ErrorHandlerService } from 'src/util/error-handler/error-handler.service';

@Module({
  controllers: [CardController],
  providers: [CardService, ErrorHandlerService],
  exports: [CardService],
})
export class CardModule {}
