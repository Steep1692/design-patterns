// Composite Pattern in Browser API:
// – DOM event propagation?
// Leaf Node
var MyFile = /** @class */ (function () {
    function MyFile(name, size, type) {
        this.name = name;
        this.size = size;
        this.type = type;
    }
    MyFile.prototype.read = function () {
        console.log(this.name);
    };
    return MyFile;
}());
// Composite Node
var MyFolder = /** @class */ (function () {
    function MyFolder(name) {
        this.name = name;
        this.children = [];
    }
    MyFolder.prototype.add = function (file) {
        this.children.push(file);
    };
    MyFolder.prototype.remove = function (file) {
        var index = this.children.indexOf(file);
        this.children.splice(index, 1);
    };
    MyFolder.prototype.read = function (recursively) {
        console.log(this.name);
        if (recursively) {
            this.children.forEach(function (child) {
                if (child instanceof MyFile) {
                    child.read();
                }
                else if (child instanceof MyFolder) {
                    child.read(true);
                }
                else {
                    throw new Error('Unexpected child instance:' + child.toString());
                }
            });
        }
    };
    return MyFolder;
}());
var masterFolder = new MyFolder('master');
var slaveFolder = new MyFolder('slave');
var file1 = new MyFile('file1', 100, 'txt');
var file2 = new MyFile('file2', 200, 'txt');
var file3 = new MyFile('file3', 300, 'txt');
masterFolder.add(file1);
masterFolder.add(file2);
masterFolder.add(file3);
masterFolder.add(slaveFolder);
var file4 = new MyFile('file4', 400, 'txt');
var file5 = new MyFile('file5', 500, 'txt');
var file6 = new MyFile('file6', 600, 'txt');
slaveFolder.add(file4);
slaveFolder.add(file5);
slaveFolder.add(file6);
console.group('Read composite recursively');
masterFolder.read(true);
console.groupEnd();
console.group('Read composite NOT recursively');
masterFolder.read(false);
console.groupEnd();
