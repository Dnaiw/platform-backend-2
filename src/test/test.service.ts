import { Inject, Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { firestore } from 'firebase-admin';
import { ErrorHandlerService } from 'src/util/error-handler/error-handler.service';
import { TaskService } from 'src/task/task.service';
import { CardService } from 'src/card/card.service';

@Injectable()
export class TestService {
  private testsCollection = firestore().collection('tests');

  constructor(
    private errorHandler: ErrorHandlerService,
    private taskService: TaskService,
  ) {}

  async create(createTestDto: CreateTestDto): Promise<CreateTestDto> {
    const card: Omit<CreateTestDto, 'id'> = {
      name: createTestDto.name,
      ownerId: createTestDto.ownerId,
      tasksId: createTestDto.tasksId,
    };
    await this.testsCollection.doc(createTestDto.id).set(card);
    return { ...createTestDto };
  }

  async findAll() {
    const snapshot = await this.testsCollection.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(id: string) {
    const testRef = this.testsCollection.doc(id);
    const doc = await testRef.get();
    if (!doc.exists) {
      throw this.errorHandler.createExceptionWithMessage(
        `Test with id ${id} doesn't exist`,
      );
    }

    return doc.data();
  }

  async findTasksFromTest(id: string) {
    const testData = this.findOne(id);
    const result = [];

    for (const taskId in testData['tasksId']) {
      const taskDoc = this.taskService.findOne(taskId);
      result.push(taskDoc);
    }

    return result;
  }

  async update(
    id: string,
    updateTestDto: UpdateTestDto,
  ): Promise<UpdateTestDto> {
    const testRef = this.testsCollection.doc(id);
    const doc = await testRef.get();
    if (!doc.exists) {
      throw this.errorHandler.createExceptionWithMessage(
        `Card with id ${id} doesn't exist`,
      );
    }

    await testRef.set(updateTestDto);
    return { id, ...updateTestDto };
  }

  remove(id: string) {
    return this.testsCollection.doc(id).delete();
  }
}
