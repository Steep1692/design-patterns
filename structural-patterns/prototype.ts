// Prototype Pattern in Browser API:
// HTMLElement.cloneNode(deep?: boolean)

interface PrototypeStructuralPattern<T> {
  clone(deep?: boolean): T
}

class MyElement implements PrototypeStructuralPattern<MyElement> {
  innerHTML: string
  children: MyElement[] | null = null

  constructor(innerHTML?: string) {
    this.innerHTML = innerHTML
  }

  append(element: MyElement) {
    if (!this.children) {
      this.children = []
    }

    this.children.push(element)
  }

  clone(deep?: boolean) {
    const $cloneElement = new MyElement(this.innerHTML);

    if (deep && this.children) {
      for (const child of this.children) {
        $cloneElement.append(child.clone(true))
      }
    }

    return $cloneElement
  }

  render(level: number = 0) {
    const levelSpacingArray = new Array<string>(level * 2)

    for (let i = 0; i < levelSpacingArray.length; i++) {
      levelSpacingArray[i] = ' '
    }

    const levelSpacing = levelSpacingArray.join('')
    const prefix = level === 0 ? '📂' : '↪'


    console.log(levelSpacing + prefix + this.innerHTML)

    if (this.children) {
      for (const child of this.children) {
        child.render(level + 1)
      }
    }
  }
}


const $el1 = new MyElement("1")
const $child1 = new MyElement("1.1")
const $child2 = new MyElement("1.2")
$el1.append($child1)
$el1.append($child2)


const $el2 = new MyElement("2")
const $child2_1 = new MyElement("2.1")
const $child2_2 = new MyElement("2.2")
$el2.append($child2_1)
$el2.append($child2_2)

$child1.append($el2)


const $el1Clone = $el1.clone()
const $el1DeepClone = $el1.clone(true)

console.log('El 1 === El 1 Clone', $el1 === $el1Clone)
console.log('El 1 === El 1 Deep Clone', $el1 === $el1DeepClone)

console.group("Clone");
$el1Clone.render()
console.groupEnd()

console.group("Deep Clone");
$el1DeepClone.render()
console.groupEnd()
