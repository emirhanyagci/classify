import { Test, TestingModule } from '@nestjs/testing';
import { ClassesResolver } from './classes.resolver';

describe('ClassesResolver', () => {
  let resolver: ClassesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassesResolver],
    }).compile();

    resolver = module.get<ClassesResolver>(ClassesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
