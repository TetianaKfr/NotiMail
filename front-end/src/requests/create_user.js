import { getToken } from "./index.js";

export default async function createUser(
  firm_name,
  first_name,
  last_name,
  email,
  phone_number,
  password,
  is_admin
) {
  const response = await fetch(SERVER_ADRESS + "create_user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}`,
    },
    body: JSON.stringify({
      firm_name: firm_name,
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_numer: phone_number,
      password: password,
      is_admin: is_admin,
    })
  });

  if (!response.ok) {
    return true;
  } else {
    return false;
  }
}
