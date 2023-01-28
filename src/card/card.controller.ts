import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Post('newDeck')
  createDeck(@Body() createDeckDto: CreateDeckDto) {
    return this.cardService.createDeck(createDeckDto);
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get('/getCardsFromDeck')
  getCardsFromDeck(@Query('deckId') deckId: string) {
    return this.cardService.getCardsFromDeck(deckId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(id);
  }

  @Patch('/updateDeck')
  updateDeck(
    @Query('deckId') deckId: string,
    @Body() updateDeckDto: UpdateDeckDto,
  ) {
    return this.cardService.updateDeck(deckId, updateDeckDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete('/deleteDeck')
  removeDeck(@Query('deckId') deckId: string) {
    return this.cardService.removeDeck(deckId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(id);
  }
}
