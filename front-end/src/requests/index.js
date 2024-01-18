export const SERVER_ADDRESS = "http://localhost:3000/"

export function getToken() {
  return window.localStorage.getItem("token");
}

export function getFirmName() {
  let token = getToken();
  if (token == null) {
    return null;
  }

  let [_, ...firm_name_parts] = token.split(':');
  return firm_name_parts.join(':');
}
