import { UsersRepository } from "@/repositories/users-repository";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists-error";
import { Role } from "@prisma/client";

interface RegisterUseCaseParams {
  name: string;
  email: string;
  password: string;
  avatar_url: string;
  role: Role;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password,
    avatar_url,
    role,
  }: RegisterUseCaseParams) {
    const password_hash = await hash(password, 3);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      avatar_url,
      role,
    });
  }
}
