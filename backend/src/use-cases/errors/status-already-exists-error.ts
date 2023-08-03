export class StatusAlreadyExistsError extends Error {
  constructor() {
    super("Status already exists.");
  }
}
