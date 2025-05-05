import { InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from 'prisma/generated/client/runtime/library';

export class PrismaErrorHandler {
  constructor(private error: any) {}

  handle(): never {
    if (this.error instanceof PrismaClientKnownRequestError) {
      if (this.error.code == 'P2002') {
        const meta = this.error.meta as { target?: string[] | undefined };
        const target = Array.isArray(meta?.target)
          ? meta.target.join(', ')
          : 'campo único desconhecido';

        throw new InternalServerErrorException({
          message: `Já existe um registro com o valor informado para o(s) campo(s) único(s)`,
          fields: target,
        });
      }
    }
    throw this.error;
  }
}
