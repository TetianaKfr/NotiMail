export class Users {
  constructor(
    firm_name,
    first_name,
    last_name,
    email,
    phone_number,
    password_hash,
    last_received_mail,
    last_picked_up,
    has_mail,
    is_admin
  ) {
    this.firm_name = firm_name;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone_number = phone_number;
    this.password_hash = password_hash;
    this.last_received_mail = last_received_mail;
    this.last_picked_up = last_picked_up;
    this.has_mail = has_mail;
    this.is_admin = is_admin;
  }
}
