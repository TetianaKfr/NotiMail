export default class Session {
  firm_name;
  token;

  constructor(req) {
    if (req.token == undefined) {
      return;
    }

    let [token, ...firm_name_parts] = req.token.split(':');
    this.token = token;
    this.firm_name = firm_name_parts.join(':');
  }
}
