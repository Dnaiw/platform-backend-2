import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { firestore } from 'firebase-admin';
import { ErrorHandlerService } from 'src/util/error-handler/error-handler.service';

@Injectable()
export class TaskService {
  private tasksCollection = firestore().collection('tasks');

  constructor(private errorHandler: ErrorHandlerService) {}

  async create(createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
    const task: Omit<CreateTaskDto, 'id'> = {
      type: createTaskDto.type,
      answersA: createTaskDto.answersA,
      answersB: createTaskDto.answersB,
      correctAnswersID: createTaskDto.correctAnswersID,
      answersMap: createTaskDto.answersMap,
      imageUrl: createTaskDto.imageUrl,
    };

    await this.tasksCollection.doc(createTaskDto.id).set(task);
    return { ...createTaskDto };
  }

  async findAll() {
    const snapshot = await this.tasksCollection.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(id: string) {
    const taskRef = this.tasksCollection.doc(id);
    const doc = await taskRef.get();
    if (!doc.exists) {
      throw this.errorHandler.createExceptionWithMessage(
        `Task with id ${id} doesn't exist`,
      );
    }
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<UpdateTaskDto> {
    const taskRef = this.tasksCollection.doc(id);
    const doc = await taskRef.get();
    if (!doc.exists) {
      throw this.errorHandler.createExceptionWithMessage(
        `Task with id ${id} doesn't exist`,
      );
    }

    await taskRef.set(updateTaskDto);
    return { id, ...updateTaskDto };
  }

  remove(id: string) {
    return this.tasksCollection.doc(id).delete;
  }
}
