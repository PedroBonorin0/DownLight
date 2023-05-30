export class ServiceAlreadyExistsError extends Error {
  constructor() {
    super("Service already exists.");
  }
}
