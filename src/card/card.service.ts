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

  async findAll() {
    const snapshot = await this.cardsCollection.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async getCardsFromDeck(id: string) {
    const snapshot = await this.cardsCollection.where('deckId', '==', id).get();
    return snapshot.docs.map((doc) => doc.data());
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

  async deleteAllCardsFromDeck(id: string) {
    const snapshot = await this.cardsCollection.where('deckId', '==', id).get();
    const documents = snapshot.docs;
    let i: number;
    for (i = 0; i < documents.length; i++) {
      this.cardsCollection.doc(documents[i].id).delete();
    }
    return;
  }
}
