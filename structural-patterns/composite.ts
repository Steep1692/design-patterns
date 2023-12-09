// Composite Pattern in Browser API:
// – DOM event propagation?

// Common interface
interface Composite {
  read(): void;
}

interface IFile extends Composite {
  name: string;
  size: number;
  type: string;
}

interface IFolder extends Composite {
  name: string;
  children: Array<IFile | IFolder>;
  add(file: IFile | IFolder): void;
  remove(file: IFile | IFolder): void;
}


// Leaf Node
class MyFile implements Composite {
  constructor(
    public name: string,
    public size: number,
    public type: string
  ) {}

  read() {
    console.log(this.name);
  }
}

// Composite Node
class MyFolder implements Composite {
  public children: Array<IFile | IFolder> = [];

  constructor(public name: string) {}

  add(file: IFile | IFolder) {
    this.children.push(file);
  }

  remove(file: IFile | IFolder) {
    const index = this.children.indexOf(file);
    this.children.splice(index, 1);
  }

  read(recursively?: boolean) {
    console.log(this.name);

    if (recursively) {
      this.children.forEach(child => {

        if (child instanceof MyFile) {
          child.read();
        } else if (child instanceof MyFolder) {
          child.read(true);
        } else {
          throw new Error('Unexpected child instance:' + child.toString())
        }

      });
    }
  }
}


const masterFolder = new MyFolder('master');
const slaveFolder = new MyFolder('slave');

const file1 = new MyFile('file1', 100, 'txt');
const file2 = new MyFile('file2', 200, 'txt');
const file3 = new MyFile('file3', 300, 'txt');

masterFolder.add(file1);
masterFolder.add(file2);
masterFolder.add(file3);
masterFolder.add(slaveFolder);

const file4 = new MyFile('file4', 400, 'txt');
const file5 = new MyFile('file5', 500, 'txt');
const file6 = new MyFile('file6', 600, 'txt');

slaveFolder.add(file4);
slaveFolder.add(file5);
slaveFolder.add(file6);

console.group('Read composite recursively')
masterFolder.read(true);
console.groupEnd();

console.group('Read composite NOT recursively')
masterFolder.read(false);
console.groupEnd();
