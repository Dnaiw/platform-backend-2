import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { firestore } from 'firebase-admin';
import { ErrorHandlerService } from 'src/util/error-handler/error-handler.service';

@Injectable()
export class CardService {
  private cardsCollection = firestore().collection('cards');

  constructor(private errorHandler: ErrorHandlerService) {}

  async create(createCardDto: CreateCardDto): Promise<CreateCardDto> {
    const card: Omit<CreateCardDto, 'id'> = {
      question: createCardDto.question,
      forbiddenWords: createCardDto.forbiddenWords,
      deckId: createCardDto.deckId,
    };
    await this.cardsCollection.doc(createCardDto.id).set(card);
    return { ...createCardDto };
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
      throw this.errorHandler.createExceptionWithMessage(
        `Card with id ${id} doesn't exist`,
      );
    }

    return doc.data();
  }

  async update(
    id: string,
    updateCardDto: UpdateCardDto,
  ): Promise<UpdateCardDto> {
    const cardRef = this.cardsCollection.doc(id);
    const doc = await cardRef.get();
    if (!doc.exists) {
      throw this.errorHandler.createExceptionWithMessage(
        `Card with id ${id} doesn't exist`,
      );
    }

    await cardRef.set(updateCardDto);
    return { id, ...updateCardDto };
  }

  remove(id: string) {
    return this.cardsCollection.doc(id).delete();
  }

  async deleteAllCardsFromDeck(id: string) {
    const snapshot = await this.cardsCollection.where('deckId', '==', id).get();
    const documents = snapshot.docs;

    // TODO: need to check on 500+ entries

    let limitedBatch = documents.splice(0, 200);
    while (limitedBatch.length > 0) {
      const dbBatch = firestore().batch();
      for (const doc of limitedBatch) {
        dbBatch.delete(doc.ref);
      }

      await dbBatch.commit();

      limitedBatch = documents.splice(0, 200);
    }
  }
}
