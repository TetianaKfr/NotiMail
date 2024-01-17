export const SERVER_ADDRESS = "http://localhost:3000/"

export function get_token() {
  return window.localStorage.getItem("token");
}

export function get_firm_name() {
  let token = get_token();
  if (token == null) {
    return null;
  }

  let [_, ...firm_name_parts] = token.split(':');
  return firm_name_parts.join(':');
}
