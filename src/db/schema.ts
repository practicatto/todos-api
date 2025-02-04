import { integer, pgTable, text, date } from 'drizzle-orm/pg-core';

export const tasks = pgTable('tasks', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text(),
  status: text().notNull().default('pending'),
  description: text(),
  due_date: date(),
});
