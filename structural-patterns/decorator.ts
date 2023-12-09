interface ILabel {
  getCost(): number
  setText(newText: string): void

  produce(): void
}

class Label implements ILabel {
  text

  constructor(text) {
    this.text = text
  }

  getCost(): number {
    return 50
  }

  setText(newText) {
    this.text = newText
  }

  produce() {
    console.log('Producing Default label');
  }
}

// Implementation of a common decorator,
// that should be used to extend from for every decorator
abstract class LabelDecorator implements ILabel {
  instance: ILabel

  constructor(label: ILabel) {
    this.instance = label
  }


  getCost(): number {
    return this.instance.getCost()
  }

  setText(newText: string) {
    return this.instance.setText(newText)
  }

  produce() {
    this.instance.produce()
  }
}

class ChromedLabel extends LabelDecorator {
  getCost(): number {
    return super.getCost() + 50;
  }

  produce() {
    super.produce();
    console.log('Adding chrome plating to the Label');
  }
}

class MagnetLabel extends LabelDecorator {
  getCost(): number {
    return super.getCost() + 25;
  }

  produce() {
    super.produce();
    console.log('Adding a magnet to the Label');
  }
}

const label = new MagnetLabel(
  new ChromedLabel(
    new Label('Test label')
  )
)

console.log(label);