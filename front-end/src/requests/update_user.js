import { SERVER_ADDRESS } from "./index.js";

export default async function update_user(firm_name, user) {
  const response = await fetch(SERVER_ADDRESS + "update_user", {
    method: "PUT",
    headers: { Authorization: `Bearer ${get_token()}` },
    body: {
      firm_name: firm_name,
      ...user
    }
  });

  if (!response.ok()) {
    return true;
  } else {
    return false;
  }
}
