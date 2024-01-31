type ClassConstructor = new (...args: any[]) => unknown;

type DBModuleOptions = {
  connectionUri: string;
  connectionName: string;
};

export { ClassConstructor, DBModuleOptions };
