import { Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { tasks } from '../db/schema';

@Injectable()
export class TasksService {
  constructor(private db: NodePgDatabase) {}

  async findAll() {
    return this.db.select().from(tasks);
  }
}
