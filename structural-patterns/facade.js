// Facade Design Pattern in mundane
var Token = /** @class */ (function () {
    function Token(type, value) {
        this.type = type;
        this.value = value;
    }
    return Token;
}());
var Lexer = /** @class */ (function () {
    function Lexer(input) {
        this.input = input;
        this.currentPosition = 0;
    }
    Lexer.prototype.getNextToken = function () {
        if (this.currentPosition >= this.input.length) {
            return new Token('EOF', null);
        }
        var currentChar = this.input[this.currentPosition];
        if (/\d/.test(currentChar)) {
            var num = '';
            while (/\d/.test(this.input[this.currentPosition])) {
                num += this.input[this.currentPosition];
                this.currentPosition++;
            }
            return new Token('INTEGER', parseInt(num, 10));
        }
        if (currentChar === '=') {
            this.currentPosition++;
            return new Token('ASSIGN', '=');
        }
        if (/[a-zA-Z]/.test(currentChar)) {
            var identifier = '';
            while (/[a-zA-Z0-9]/.test(this.input[this.currentPosition])) {
                identifier += this.input[this.currentPosition];
                this.currentPosition++;
            }
            return new Token('IDENTIFIER', identifier);
        }
        if (/\s/.test(currentChar)) {
            this.currentPosition++;
            return this.getNextToken();
        }
        throw new Error("Invalid character: ".concat(currentChar));
    };
    return Lexer;
}());
var Parser = /** @class */ (function () {
    function Parser(lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }
    Parser.prototype.eat = function (type) {
        if (this.currentToken.type === type) {
            this.currentToken = this.lexer.getNextToken();
        }
        else {
            throw new Error("Unexpected token: ".concat(this.currentToken.type));
        }
    };
    Parser.prototype.parse = function () {
        var arr = [];
        while (this.currentToken.type !== 'EOF') {
            arr.push(this.statement());
        }
        return arr.join(';');
    };
    Parser.prototype.statement = function () {
        var variable = this.variable();
        this.eat('ASSIGN');
        var value = this.expression();
        return "".concat(variable, " = ").concat(value);
    };
    Parser.prototype.variable = function () {
        var identifier = this.currentToken.value;
        this.eat('IDENTIFIER');
        return identifier;
    };
    Parser.prototype.expression = function () {
        var value = this.currentToken.value;
        this.eat('INTEGER');
        return value;
    };
    return Parser;
}());
var Executor = /** @class */ (function () {
    function Executor() {
    }
    Executor.prototype.execute = function (code) {
        eval(code);
    };
    return Executor;
}());
// Facade
var AbacusScriptInterpreter = /** @class */ (function () {
    function AbacusScriptInterpreter() {
        this.executor = new Executor();
    }
    AbacusScriptInterpreter.prototype.execute = function (sourceCode) {
        var lexer = new Lexer(sourceCode);
        var parser = new Parser(lexer);
        var code = parser.parse();
        this.executor.execute(code);
    };
    return AbacusScriptInterpreter;
}());
// Usage
var abacusScriptInterpreter = new AbacusScriptInterpreter();
abacusScriptInterpreter.execute('x = 10 y = 20 x = 30');
