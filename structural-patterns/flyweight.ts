// Flyweight interface
interface Flyweight {
  operation(extrinsicState: string): void;
}

// Concrete Flyweight
class ConcreteFlyweight implements Flyweight {
  private intrinsicState: string;

  constructor(intrinsicState: string) {
    this.intrinsicState = intrinsicState;
  }

  operation(extrinsicState: string): void {
    console.log(`ConcreteFlyweight: Intrinsic State - ${this.intrinsicState}, Extrinsic State - ${extrinsicState}`);
  }
}

// Flyweight Factory
class FlyweightFactory {
  private flyweights: { [key: string]: ConcreteFlyweight } = {};

  getFlyweight(key: string): ConcreteFlyweight {
    if (!this.flyweights[key]) {
      this.flyweights[key] = new ConcreteFlyweight(key);
    }
    return this.flyweights[key];
  }
}

// Client code
class Client {
  private flyweightFactory: FlyweightFactory;

  constructor(factory: FlyweightFactory) {
    this.flyweightFactory = factory;
  }

  operation(key: string, extrinsicState: string): void {
    const flyweight = this.flyweightFactory.getFlyweight(key);
    flyweight.operation(extrinsicState);
  }
}

// Example usage
const flyweightFactory = new FlyweightFactory();
const client = new Client(flyweightFactory);

client.operation('A', 'state1');
client.operation('B', 'state2');
client.operation('A', 'state3');