import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { createMockService } from '../utils/createMockService';
describe('TasksController', () => {
  let controller: TasksController;
  const mockService = createMockService(TasksService);
  const mockedTasks = [
    {
      id: 1,
      title: 'Walk the dog',
      status: 'pending',
      description: 'Walk the dog in Samanes park',
      due_date: '2025-01-10',
    },
    {
      id: 2,
      title: 'Learn nestjs',
      status: 'pending',
      description: 'Learn nestjs to build APIs',
      due_date: '2025-01-10',
    },
  ];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should return a list of all tasks', async () => {
    mockService.findAll.mockResolvedValue(mockedTasks);
    const data = await controller.getAllTasks();
    expect(data).toEqual(mockedTasks);
  });
});
