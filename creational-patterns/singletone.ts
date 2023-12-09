// function singleton(target) {
//   target
// }
//

// @singleton
class FooSingleton {
  static instance: FooSingleton

  static getInstance() {
    if (FooSingleton.instance) {
      return this.instance
    }

    FooSingleton.instance = new FooSingleton()
    return FooSingleton.instance
  }

  bar() {}
  baz() {}
}

const foo = FooSingleton.getInstance()
const foo2 = FooSingleton.getInstance()

console.log(foo === foo2) // true
