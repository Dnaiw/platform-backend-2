import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { firestore } from 'firebase-admin';

@Injectable()
export class CardService {
  private cardsCollection = firestore().collection('cards');

  create(createCardDto: CreateCardDto) {
    const card: Omit<CreateCardDto, 'id'> = {
      question: createCardDto.question,
      forbiddenWords: createCardDto.forbiddenWords,
      deckId: createCardDto.deckId,
    };
    return this.cardsCollection.doc(createCardDto.id).set(card);
  }

  findAll() {
    return `This action returns all card`;
  }

  async findOne(id: string) {
    const cardRef = this.cardsCollection.doc(id);
    const doc = await cardRef.get();
    if (!doc.exists) {
      throw `Card with id ${id} doesn't exist`;
    }

    return doc.data();
  }

  update(id: string, updateCardDto: UpdateCardDto) {
    return this.cardsCollection.doc(id).set(updateCardDto);
  }

  remove(id: string) {
    return this.cardsCollection.doc(id).delete();
  }
}
