export class FormEmployee {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: number;

  constructor(username: string, password: string, firstName: string, lastName: string, email: string, phone: string, status: number) {
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.status = status;
  }
}
