export class ProductAlreadyExistsError extends Error {
  constructor() {
    super("Product already exists.");
  }
}
