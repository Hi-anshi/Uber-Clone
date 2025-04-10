
# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Method: `POST`

### Description:
This endpoint is used to register a new user in the system. It validates the input data, creates a new user, and returns a success message along with an authentication token.

---

### Request Body:
The following fields are required in the request body:

```json
{
  "fullName": {
    "firstName": "string (min: 3 characters, required)",
    "lastName": "string (optional, min: 3 characters)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

---

### Status Codes:
- **201**: User created successfully.
- **400**: Validation error (e.g., missing or invalid fields).
- **500**: Internal server error.

---

### Response Example:

#### Success Response (201):
```json
{
  "message": "User created successfully",
  "user": {
    "_id": "64f1b2c3d4e5f6789012abcd",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Response (400):
```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullName.firstName",
      "location": "body"
    }
  ]
}
```

#### Error Response (500):
```json
{
  "message": "Internal server error"
}
```

---

### Notes:
- Ensure that the `Content-Type` header is set to `application/json` in the request.
- The `token` in the response can be used for authentication in subsequent requests.
# Uber-Clone
