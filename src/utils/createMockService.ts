type InstanceType<T> = T extends new (...args: any[]) => infer R ? R : T;

type MockService<T> = {
  [P in keyof InstanceType<T>]: InstanceType<T>[P] extends (
    ...args: infer Args
  ) => infer Return
    ? jest.Mock<Return, Args>
    : jest.Mock;
};

export const createMockService = <T extends object>(
  service: new (...args: any[]) => T,
): MockService<T> => {
  const instance = new service();

  const methods = [
    ...Object.getOwnPropertyNames(Object.getPrototypeOf(instance)),
    ...Object.getOwnPropertyNames(instance),
  ];

  return methods.reduce((mock, method) => {
    if (method !== 'constructor') {
      mock[method] = jest.fn();
    }
    return mock;
  }, {} as MockService<T>);
};
