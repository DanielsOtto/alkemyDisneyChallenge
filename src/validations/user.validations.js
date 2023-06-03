import { InvalidFormat } from '../errors/InvalidFormat.js';
import { InvalidArgument } from '../errors/InvalidArgument.js';

export class UserValidations {
  constructor({ name, lastname, email, password }) {

    if (typeof name !== 'string' || !name) throw new InvalidArgument('name');
    if (name.length >= 85) throw new InvalidFormat('the name is too long. Must be less than 85 characters');
    if (/\s/.test(name)) throw new InvalidFormat('the name should not contain white spaces');
    this.name = name;

    if (typeof lastname !== 'string' || !lastname) throw new InvalidArgument('lastname');
    if (lastname.length >= 85) throw new InvalidFormat('the lastname is too long. Must be less than 85 characters');
    if (/\s/.test(lastname)) throw new InvalidFormat('the lastname should not contain white spaces');
    this.lastname = lastname;

    if (typeof email !== 'string' || !email) throw new InvalidArgument('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new InvalidFormat('email');
    if (/\s/.test(email)) throw new InvalidFormat('the email should not contain white spaces');
    this.email = email;

    if (typeof password !== 'string' || !password) throw new InvalidArgument('password');
    if (/\s/.test(password)) throw new InvalidFormat('the password should not contain white spaces');
    if (password.length < 6) throw new InvalidFormat('the password is short. Must be 6 characters long')
    this.password = password;
  }
}
