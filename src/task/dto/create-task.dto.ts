class Answer {
  id: string;
  value: string;
}

export class CreateTaskDto {
  id: string;
  type: string;
  answersA: Answer[];
  answersB: Answer[];
  correctAnswersID: string[];
  answersMap: object;
}
