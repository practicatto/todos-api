import { Injectable } from '@nestjs/common';
import { tasks } from '../db/schema';
import type { Database } from '../db/db.types';

@Injectable()
export class TasksService {
  constructor(private db: Database) {}

  async findAll() {
    return await this.db.select().from(tasks);
  }
}
