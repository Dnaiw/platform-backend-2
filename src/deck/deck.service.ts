import { Inject, Injectable } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { firestore } from 'firebase-admin';
import { CardService } from 'src/card/card.service';

@Injectable()
export class DeckService {
  private decksCollection = firestore().collection('decks');

  @Inject(CardService)
  private readonly cardService: CardService;

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
    const cardRef = this.decksCollection.doc(id);
    const doc = await cardRef.get();
    if (!doc.exists) {
      throw `Card with id ${id} doesn't exist`;
    }

    return doc.data();
  }

  update(id: string, updateDeckDto: UpdateDeckDto) {
    return this.decksCollection.doc(id).set(updateDeckDto);
  }

  async remove(id: string) {
    this.cardService.deleteAllCardsFromDeck(id);
    return this.decksCollection.doc(id).delete();
  }
}
