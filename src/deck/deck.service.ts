import { Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { firestore } from 'firebase-admin';
import { CardService } from 'src/card/card.service';
import { ErrorHandlerService } from 'src/util/error-handler/error-handler.service';

@Injectable()
export class DeckService {
  private decksCollection = firestore().collection('decks');

  constructor(
    private errorHandler: ErrorHandlerService,
    private cardService: CardService,
  ) {}

  create(createDeckDto: CreateDeckDto) {
    const deck: Omit<CreateDeckDto, 'id'> = {
      name: createDeckDto.name,
      gameId: createDeckDto.gameId,
    };
    return this.decksCollection.doc(createDeckDto.id).set(deck);
  }

  async findAll() {
    const snapshot = await this.decksCollection.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(id: string) {
    const deckRef = this.decksCollection.doc(id);
    const doc = await deckRef.get();
    if (!doc.exists) {
      throw this.errorHandler.createExceptionWithMessage(
        `Deck with id ${id} doesn't exist`,
      );
    }

    return doc.data();
  }

  update(id: string, updateDeckDto: UpdateDeckDto) {
    return this.decksCollection.doc(id).set(updateDeckDto);
  }

  async remove(id: string) {
    try {
      await this.cardService.deleteAllCardsFromDeck(id);
    } catch (e) {
      throw this.errorHandler.createExceptionWithMessage(
        'Error while deleting cards from the deck',
        e,
      );
    }
    return this.decksCollection.doc(id).delete();
  }
}
