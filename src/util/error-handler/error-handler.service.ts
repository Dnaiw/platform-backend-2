import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  createExceptionWithMessage(message: string, originalError?: Error) {
    return new HttpException(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: message,
      },
      HttpStatus.FORBIDDEN,
      {
        cause: originalError,
      },
    );
  }
}
