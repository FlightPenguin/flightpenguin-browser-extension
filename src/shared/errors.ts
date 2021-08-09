class ExtendableError extends Error {
  constructor(message: string) {
    super();
    this.message = message;
    this.stack = new Error().stack;
    this.name = this.constructor.name;
  }
}

export class ParserError extends ExtendableError {
  constructor(message: string) {
    super(message);
  }
}

export class LoadingTimeoutParserError extends ParserError {
  constructor(message: string) {
    super(message);
  }
}

export class MissingFieldParserError extends ParserError {
  constructor(message: string) {
    super(message);
  }
}

export class MissingElementLookupError extends ParserError {
  constructor(message: string) {
    super(message);
  }
}
