class NotRegisteredError{
  constructor(private message: string){}
};

export default class Container{
  private static instance: Container|null = null;
  private map: Map<string, any>;

  private constructor(
  ) {
    this.map = new Map<string, any>();
  }

  static async init(definitions: ContainerDefinitions){
    this.instance = new Container();
    const notInitialized = Object.keys(definitions);
    let iterations = 0;
    while (notInitialized.length > 0) {
      if (iterations === notInitialized.length + 10) {
        throw new Error(
          `Cannot resolve dependencies, check for circular dependencies, left ${notInitialized.reduce((acc, curr) => acc + ' ' + curr, "")}`
        );
      }
      const key = notInitialized[0];
      const create = definitions[key];
      try {
        // eslint-disable-next-line no-await-in-loop
        const object = await create();
        this.instance.map.set(key, object);
        notInitialized.shift();
        iterations = 0;
      } catch (error) {
        if(error instanceof NotRegisteredError){
          const elem = notInitialized.shift()!;
          notInitialized.push(elem);
          iterations += 1;
        }else{
          console.error(error);
          break;
        }
        
      }
    }
  }

  static resolve<T>(name: string): T{
    if(this.instance === null){
      throw new Error("Container not initialized");
    }
    if(!this.instance.map.has(name)){
      throw new NotRegisteredError(`Key ${name} is not registered in container`);
    }
    return this.instance.map.get(name)!;
  }
}

export type ContainerDefinitions = ({[key: string]: () => any});
