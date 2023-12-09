var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Label = /** @class */ (function () {
    function Label(text) {
        this.text = text;
    }
    Label.prototype.getCost = function () {
        return 50;
    };
    Label.prototype.setText = function (newText) {
        this.text = newText;
    };
    Label.prototype.produce = function () {
        console.log('Producing Default label');
    };
    return Label;
}());
// Implementation of a common decorator,
// that should be used to extend from for every decorator
var LabelDecorator = /** @class */ (function () {
    function LabelDecorator(label) {
        this.instance = label;
    }
    LabelDecorator.prototype.getCost = function () {
        return this.instance.getCost();
    };
    LabelDecorator.prototype.setText = function (newText) {
        return this.instance.setText(newText);
    };
    LabelDecorator.prototype.produce = function () {
        this.instance.produce();
    };
    return LabelDecorator;
}());
var ChromedLabel = /** @class */ (function (_super) {
    __extends(ChromedLabel, _super);
    function ChromedLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChromedLabel.prototype.getCost = function () {
        return _super.prototype.getCost.call(this) + 50;
    };
    ChromedLabel.prototype.produce = function () {
        _super.prototype.produce.call(this);
        console.log('Adding chrome plating to the Label');
    };
    return ChromedLabel;
}(LabelDecorator));
var MagnetLabel = /** @class */ (function (_super) {
    __extends(MagnetLabel, _super);
    function MagnetLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MagnetLabel.prototype.getCost = function () {
        return _super.prototype.getCost.call(this) + 25;
    };
    MagnetLabel.prototype.produce = function () {
        _super.prototype.produce.call(this);
        console.log('Adding a magnet to the Label');
    };
    return MagnetLabel;
}(LabelDecorator));
var label = new MagnetLabel(new ChromedLabel(new Label('Test label')));
console.log(label);
