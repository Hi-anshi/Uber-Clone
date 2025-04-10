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

# User Login Endpoint Documentation

## Endpoint: `/users/login`

### Method: `POST`

### Description:
This endpoint is used to authenticate an existing user. It validates the input data, checks the credentials, and returns a success message along with an authentication token.

---

### Request Body:
The following fields are required in the request body:

```json
{
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

---

### Status Codes:
- **200**: User logged in successfully.
- **400**: Validation error (e.g., missing or invalid fields).
- **401**: Invalid email or password.
- **500**: Internal server error.

---

### Response Example:

#### Success Response (200):
```json
{
  "message": "User logged in successfully",
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
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Error Response (401):
```json
{
  "message": "Invalid email or password"
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

---

# User Profile Endpoint Documentation

## Endpoint: `/users/profile`

### Method: `GET`

### Description:
This endpoint is used to fetch the profile of the authenticated user. It requires the user to be logged in and authenticated.

---

### Headers:
- **Authorization**: `Bearer <token>` (required)

---

### Status Codes:
- **200**: User profile fetched successfully.
- **401**: Unauthorized (e.g., missing or invalid token).
- **500**: Internal server error.

---

### Response Example:

#### Success Response (200):
```json
{
  "message": "User profile fetched successfully",
  "user": {
    "_id": "64f1b2c3d4e5f6789012abcd",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### Error Response (401):
```json
{
  "message": "Unauthorized"
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
- Ensure that the `Authorization` header contains a valid token obtained during login.

---

# User Logout Endpoint Documentation

## Endpoint: `/users/logout`

### Method: `GET`

### Description:
This endpoint is used to log out the authenticated user. It invalidates the user's token provided in cookie or headers by adding it to a blacklist and clears the authentication cookie.

---

### Headers:
- **Authorization**: `Bearer <token>` (required)

---

### Status Codes:
- **200**: User logged out successfully.
- **401**: Unauthorized (e.g., missing or invalid token).
- **500**: Internal server error.

---

### Response Example:

#### Success Response (200):
```json
{
  "message": "User logged out successfully"
}
```

#### Error Response (401):
```json
{
  "message": "Unauthorized"
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
- Ensure that the `Authorization` header contains a valid token obtained during login.
- The token will no longer be valid after logout.

---

# Captain Registration Endpoint Documentation

## Endpoint: `/captains/register`

### Method: `POST`

### Description:
This endpoint is used to register a new captain in the system. It validates the input data, creates a new captain, and returns a success message along with an authentication token.

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
  "password": "string (min: 6 characters, required)",
  "vehicle": {
    "color": "string (min: 3 characters, required)",
    "plate": "string (min: 3 characters, required)",
    "capacity": "number (required)",
    "vehicleType": "string (min: 3 characters, required)"
  }
}
```

---

### Status Codes:
- **201**: Captain created successfully.
- **400**: Validation error (e.g., missing or invalid fields).
- **500**: Internal server error.

---

### Response Example:

#### Success Response (201):
```json
{
  "message": "Captain created successfully",
  "captain": {
    "_id": "64f1b2c3d4e5f6789012abcd",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "password": "$2b$10$fwV2MlZqlAWQpjuMsMzJuDkL3bSgxioDJZL7zN4ikgDMmWal9nZm",
    "status": "inactive",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
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

# Captain Login Endpoint Documentation

## Endpoint: `/captains/login`

### Method: `POST`

### Description:
This endpoint is used to authenticate an existing captain. It validates the input data, checks the credentials, and returns a success message along with an authentication token.

---

### Request Body:
The following fields are required in the request body:

```json
{
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

---

### Status Codes:
- **200**: Captain logged in successfully.
- **400**: Validation error (e.g., missing or invalid fields).
- **401**: Invalid email or password.
- **500**: Internal server error.

---

### Response Example:

#### Success Response (200):
```json
{
  "message": "Captain logged in successfully",
  "captain": {
    "_id": "64f1b2c3d4e5f6789012abcd",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "Sedan"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Response (400):
```json
{
  "errors": [
    {
      "msg": "Please enter a valid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

#### Error Response (401):
```json
{
  "message": "Invalid email or password"
}
```

#### Error Response (500):
```json
{
  "message": "Internal server error"
}
```

---

# Captain Profile Endpoint Documentation

## Endpoint: `/captains/profile`

### Method: `GET`

### Description:
This endpoint is used to fetch the profile of the authenticated captain. It requires the captain to be logged in and authenticated.

---

### Headers:
- **Authorization**: `Bearer <token>` (required)

---

### Status Codes:
- **200**: Captain profile fetched successfully.
- **401**: Unauthorized (e.g., missing or invalid token).
- **500**: Internal server error.

---

### Response Example:

#### Success Response (200):
```json
{
  "message": "Captain profile fetched successfully",
  "captain": {
    "_id": "64f1b2c3d4e5f6789012abcd",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "email": "jane.smith@example.com",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "Sedan"
    }
  }
}
```

#### Error Response (401):
```json
{
  "message": "Unauthorized"
}
```

#### Error Response (500):
```json
{
  "message": "Internal server error"
}
```

---

# Captain Logout Endpoint Documentation

## Endpoint: `/captains/logout`

### Method: `GET`

### Description:
This endpoint is used to log out the authenticated captain. It invalidates the captain's token provided in cookie or headers by adding it to a blacklist and clears the authentication cookie.

---

### Headers:
- **Authorization**: `Bearer <token>` (required)

---

### Status Codes:
- **200**: Captain logged out successfully.
- **401**: Unauthorized (e.g., missing or invalid token).
- **500**: Internal server error.

---

### Response Example:

#### Success Response (200):
```json
{
  "message": "Captain logged out successfully"
}
```

#### Error Response (401):
```json
{
  "message": "Unauthorized"
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
- Ensure that the `Authorization` header contains a valid token obtained during login.
- The token will no longer be valid after logout.
