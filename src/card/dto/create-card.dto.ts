export class CreateCardDto {
  id: number;
  guessedWord: string;
  forbiddenWords: string[];
  deckId: number;
}
