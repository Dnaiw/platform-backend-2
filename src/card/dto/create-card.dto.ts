export class CreateCardDto {
  id: string;
  question: string;
  forbiddenWords: string[];
  deckId: string;
}
