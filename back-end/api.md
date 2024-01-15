### Routes

<details>
  <summary>POST - authentificate</summary>

```ts
input {
    firm_name: string,
    password:  string,
}
output {
    token: string
}
```

Fields `session_firm_name` should be the last `firm_name` used in `authentificate`
Fields `session_token` should be the last token `session_token` returned by `authentificate`

These two value should be stored on [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
</details>

<details>
  <summary>GET - list_users</summary>

```ts
output [ firm_name: string ]
```
</details>

<details>
  <summary>POST - create_user</summary>

```ts
input {
    session_firm_name: string,
    session_token:     string,
    firm_name:    string,
    first_name:   string,
    last_name:    string,
    email:        string,
    phone_number: string,
    password: string,
    is_admin: boolean,
}
```
</details>

<details>
  <summary>DELETE - delete_user</summary>

```ts
input {
    session_firm_name: string,
    session_token:     string
    firm_name: string,
}
```
</details>

<details>
  <summary>PUT - update_user</summary>

```ts
input {
    session_firm_name: string,
    session_token:     string,
    firm_name:    string,
    first_name:   string | undefined,
    last_name:    string | undefined,
    email:        string | undefined,
    phone_number: string | undefined,
    password:     string | undefined,
    has_mai:  boolean | undefined,
    is_admin: boolean | undefined,
}
```
</details>

<details>
  <summary>POST - get_user</summary>

```ts
input {
    session_firm_name: string,
    session_token:     string,
    firm_name:    string,
}
output {
    first_name:   string,
    last_name:    string,
    email:        string,
    phone_number: string,
    last_received_mail: string, // Timestamp
    last_picked_up:     string, // Timestamp
    has_mail: boolean,
    is_admin: boolean,
}
```
</details>