// Facade Design Pattern in mundane
// – AbacusLib that encapsulates the logic of the abacus framework: Reactivity, Injection, etc.

type TokenType = 'INTEGER' | 'IDENTIFIER' | 'ASSIGN' | 'EOF';

class Token {
  type: TokenType;
  value: string | number | null;

  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

class Lexer {
  input: string;
  currentPosition: number;

  constructor(input) {
    this.input = input;
    this.currentPosition = 0;
  }

  getNextToken() {
    if (this.currentPosition >= this.input.length) {
      return new Token('EOF', null);
    }

    const currentChar = this.input[this.currentPosition];

    if (/\d/.test(currentChar)) {
      let num = '';
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
      let identifier = '';
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

    throw new Error(`Invalid character: ${currentChar}`);
  }
}

class Parser {
  lexer: Lexer;
  currentToken: Token;

  constructor(lexer) {
    this.lexer = lexer;
    this.currentToken = this.lexer.getNextToken();
  }

  eat(type) {
    if (this.currentToken.type === type) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      throw new Error(`Unexpected token: ${this.currentToken.type}`);
    }
  }

  parse(): string {
    const arr = [];
    while (this.currentToken.type !== 'EOF') {
      arr.push(this.statement())
    }
    return arr.join(';');
  }

  statement() {
    const variable = this.variable();
    this.eat('ASSIGN');
    const value = this.expression();
    return `${variable} = ${value}`
  }

  variable() {
    const identifier = this.currentToken.value;
    this.eat('IDENTIFIER');
    return identifier;
  }

  expression() {
    const value = this.currentToken.value;
    this.eat('INTEGER');
    return value;
  }
}

class Executor {
  execute(code) {
    eval(code);
  }
}

// Facade
class AbacusScriptInterpreter {
  private executor: Executor;

  constructor() {
    this.executor = new Executor();
  }

  execute(sourceCode: string) {
    const lexer = new Lexer(sourceCode);
    const parser = new Parser(lexer);

    const code = parser.parse()

    this.executor.execute(code);
  }
}

// Usage
const abacusScriptInterpreter = new AbacusScriptInterpreter();
abacusScriptInterpreter.execute('x = 10 y = 20 x = 30')
