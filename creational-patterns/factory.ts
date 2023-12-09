// Factory in mundane:
// – document.createElement
// – document.createAttribute

type UIElementType = 'button' | 'input' | 'video'

class UIFactory {
  createElement(type: UIElementType): UIElement {
    switch (type) {
      case "button":
        return new Button()
      case "input":
        return new Input()
      case "video":
        return new Video()
      default:
        throw new Error('Element type ' + type + ' is not valid')
    }
  }
}

interface UIElement {
  render(): void
}

class Button implements UIElement {
  render() {}
}

class Input implements UIElement {
  render() {}
}

class Video implements UIElement {
  play() {}
  render() {}
}


const uiFactory = new UIFactory()

const button = uiFactory.createElement('button')
const input = uiFactory.createElement('input')
const video = uiFactory.createElement('video')

button.render()
input.render()
video.render()