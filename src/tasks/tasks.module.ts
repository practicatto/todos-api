import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../db/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: 'DATABASE',
      useValue: db,
    },
    {
      provide: TasksService,
      useFactory: (database) => new TasksService(database),
      inject: ['DATABASE'],
    },
  ],
})
export class TasksModule {}
