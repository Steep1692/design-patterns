// Prototype Pattern in Browser API:
// HTMLElement.clone({ deep?: boolean })
var MyElement = /** @class */ (function () {
    function MyElement(innerHTML) {
        this.children = null;
        this.innerHTML = innerHTML;
    }
    MyElement.prototype.append = function (element) {
        if (!this.children) {
            this.children = [];
        }
        this.children.push(element);
    };
    MyElement.prototype.clone = function (deep) {
        var $cloneElement = new MyElement(this.innerHTML);
        if (deep && this.children) {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                $cloneElement.append(child.clone(true));
            }
        }
        return $cloneElement;
    };
    MyElement.prototype.render = function (level) {
        if (level === void 0) { level = 0; }
        var levelSpacingArray = new Array(level * 2);
        for (var i = 0; i < levelSpacingArray.length; i++) {
            levelSpacingArray[i] = ' ';
        }
        var levelSpacing = levelSpacingArray.join('');
        var prefix = level === 0 ? '📂' : '↪';
        console.log(levelSpacing + prefix + this.innerHTML);
        if (this.children) {
            for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                var child = _a[_i];
                child.render(level + 1);
            }
        }
    };
    return MyElement;
}());
var $el1 = new MyElement("1");
var $child1 = new MyElement("1.1");
var $child2 = new MyElement("1.2");
$el1.append($child1);
$el1.append($child2);
var $el2 = new MyElement("2");
var $child2_1 = new MyElement("2.1");
var $child2_2 = new MyElement("2.2");
$el2.append($child2_1);
$el2.append($child2_2);
$child1.append($el2);
var $el1Clone = $el1.clone();
var $el1DeepClone = $el1.clone(true);
console.log('El 1 === El 1 Clone', $el1 === $el1Clone);
console.log('El 1 === El 1 Deep Clone', $el1 === $el1DeepClone);
console.group("Clone");
$el1Clone.render();
console.groupEnd();
console.group("Deep Clone");
$el1DeepClone.render();
console.groupEnd();
