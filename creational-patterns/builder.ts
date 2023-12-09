// Builder in mundane:
// sharp('input.jpg')
//   .rotate()
//   .resize(200)
//   .jpeg({ mozjpeg: true })
//   .toBuffer()
//   .then( data => { ... })
//   .catch( err => { ... });


interface TestCaseOptions {
  authorize?: boolean,
  touchscreen?: boolean,

  screenWidth: number,
  screenHeight: number,
  screenZoom: number,
}

interface Builder {
  authorize(flag: boolean): Builder
  touchscreen(flag: boolean): Builder
  screenWidth(value: number): Builder
  screenHeight(value: number): Builder
  screenZoom(value: number): Builder
  getProduct(): TestCase
}


class TestCase {
  constructor(options: TestCaseOptions) {
  }

  runTest() {}
}


class TestCaseBuilder implements Builder {
  options: TestCaseOptions;

  constructor() {
    this.reset();
  }

  reset() {
    this.options = {
      screenWidth: 1024,
      screenHeight: 1024,
      screenZoom: 1,
    };
  }

  authorize(flag: boolean) {
    this.options.authorize = flag;
    return this;
  }

  touchscreen(flag: boolean) {
    this.options.touchscreen = flag;
    return this;
  }

  screenWidth(value: number) {
    this.options.screenWidth = value;
    return this;
  }

  screenHeight(value: number) {
    this.options.screenHeight = value;
    return this;
  }

  screenZoom(value: number) {
    this.options.screenZoom = value;
    return this;
  }

  getProduct(): TestCase {
    this.reset();
    return new TestCase(this.options);
  }
}

class TestCaseDirector {
  builder

  constructor(builder: Builder) {
    this.builder = builder
  }

  constructSearchTestCase(): TestCase {
    return this.builder
      .authorize(true)
      .screenZoom(1.2)
      .screenWidth(100)
      .screenHeight(100)
      .getProduct()
  }

  constructSettingsTestCase(): TestCase {
    return this.builder
      .authorize(false)
      .touchscreen(true)
      .screenWidth(300)
      .screenHeight(300)
      .getProduct()
  }
}


const testCaseBuilder = new TestCaseBuilder()

const testCaseDirector = new TestCaseDirector(testCaseBuilder)
const searchTestCase = testCaseDirector.constructSearchTestCase()
const settingsTestCase = testCaseDirector.constructSettingsTestCase()

searchTestCase.runTest()
settingsTestCase.runTest()
