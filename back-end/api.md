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

The returned token should be stored on [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
And should be sent on every next request to api with the `Authorization: Bearer ${token}` header
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
    firm_name: string,
}
```
</details>

<details>
  <summary>PUT - update_user</summary>

```ts
input {
    firm_name:    string,
    first_name:   string | undefined,
    last_name:    string | undefined,
    email:        string | undefined,
    phone_number: string | undefined,
    password:     string | undefined,
    has_mail:  boolean | undefined,
    is_admin: boolean | undefined,
}
```
</details>

<details>
  <summary>GET - get_user/:user</summary>

```ts
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

<details>
  <summary>POST - disconnect</summary>

Only the Authorization header

</details>
