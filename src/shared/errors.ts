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

export class CurrencyMismatchError extends ParserError {
  constructor(message: string) {
    super(message);
  }
}

export class HttpError extends Error {
  public statusCode: string;
  public statusMessage: string;

  constructor(message: string, statusCode: string | number, statusMessage: string) {
    super();
    this.message = message;
    this.stack = new Error().stack;
    this.name = this.constructor.name;
    this.statusCode = `${statusCode}`;
    this.statusMessage = statusMessage;
  }
}

export interface InvalidArgument {
  argumentName: string;
  value: any;
}

export class InvalidArgumentsError extends ExtendableError {
  public invalidArguments: InvalidArgument[];
  public fxnName: string;

  constructor(fxnName: string, invalidArguments: InvalidArgument[]) {
    const messages = invalidArguments
      .map(({ argumentName, value }) => {
        return `${argumentName} (${value})`;
      })
      .join(", ");
    const message = `Invalid value(s) for ${messages} in ${fxnName}`;

    super(message);
    this.fxnName = fxnName;
    this.invalidArguments = invalidArguments;
  }
}
