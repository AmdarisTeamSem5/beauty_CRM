# API DOC

## Table of Contents
- [Authentication](#authentication)
- [Appointments](#appointments)
- [Miscellaneous](#miscellaneous)
- [Roles](#roles)
- [Salons](#salons)
- [Salon Services](#salon-services)
- [Specialists](#specialists)
- [Users](#users)

## Base URL
All API endpoints are relative to: `/api/[controller]`

---

## Appointments

### Get All Appointments
**GET** `/api/Appointment`

Retrieves all appointments.

**Response:**
```json
[
  {
    "id": "guid",
    // ... other appointment properties
  }
]
```

### Get Appointment
**GET** `/api/Appointment/{id}`

Retrieves a specific appointment by ID.

**Parameters:**
- `id` (guid, in path) - Appointment ID

**Response:** AppointmentDto

### Create Appointment
**POST** `/api/Appointment`

Creates a new appointment.

**Request Body:** CreateAppointmentDto

**Response:** `guid` (ID of created appointment)

---

## Miscellaneous

### Get Service Types
**GET** `/api/Misc/ServiceTypes`

Retrieves all available salon service types.

**Response:**
```json
[
  {
    "id": "int",
    "name": "string"
  }
]
```

---

## Roles

### Get All Roles
**GET** `/api/Role`

Retrieves all roles.  
**Authorization:** Requires `ViewRoles` permission.

**Response:**
```json
[
  {
    "id": "guid",
    "name": "string"
  }
]
```

### Get Role
**GET** `/api/Role/{id}`

Retrieves a specific role by ID.  
**Authorization:** Requires `ViewRoles` permission.

**Parameters:**
- `id` (guid, in path) - Role ID

**Response:** RoleDto

### Create Role
**POST** `/api/Role`

Creates a new role.  
**Authorization:** Requires `ManageRoles` permission.

**Request Body:** CreateRoleDto

**Response:** `guid` (ID of created role)

### Edit Role
**PATCH** `/api/Role/{id}`

Updates an existing role.  
**Authorization:** Requires `ManageRoles` permission.

**Parameters:**
- `id` (guid, in path) - Role ID

**Request Body:** EditRoleDto

### Get Role Permissions
**GET** `/api/Role/{id}/permissions`

Retrieves permissions for a specific role.  
**Authorization:** Requires `ViewRoles` permission.

**Parameters:**
- `id` (guid, in path) - Role ID

**Response:** List of Permission enums

### Manage Role Permissions
**POST** `/api/Role/{id}/permissions`

Updates permissions for a role.  
**Authorization:** Requires `ManageRoles` permission.

**Parameters:**
- `id` (guid, in path) - Role ID

**Request Body:**
```json
{
  "permissionsToAdd": ["Permission1", "Permission2"],
  "permissionsToRemove": ["Permission3", "Permission4"]
}
```

### Delete Role
**DELETE** `/api/Role/{id}`

Deletes a role.

**Parameters:**
- `id` (guid, in path) - Role ID

---

## Salons

### Get All Salons
**GET** `/api/Salon`

Retrieves all salons.

**Response:**
```json
[
  {
    "id": "guid",
    // ... other salon properties
  }
]
```

### Get Salon
**GET** `/api/Salon/{id}`

Retrieves a specific salon by ID.

**Parameters:**
- `id` (guid, in path) - Salon ID

**Response:** SalonDto

### Create Salon
**POST** `/api/Salon`

Creates a new salon.

**Request Body:** CreateSalonDto

**Response:** `guid` (ID of created salon)

### Edit Salon
**PATCH** `/api/Salon/{id}`

Updates an existing salon.

**Parameters:**
- `id` (guid, in path) - Salon ID

**Request Body:** EditSalonDto

### Delete Salon
**DELETE** `/api/Salon/{id}`

Deletes a salon.

**Parameters:**
- `id` (guid, in path) - Salon ID

---

## Salon Services

### Get All Salon Services
**GET** `/api/SalonService`

Retrieves all salon services.

**Response:**
```json
[
  {
    "id": "guid",
    // ... other service properties
  }
]
```

### Get Salon Service
**GET** `/api/SalonService/{id}`

Retrieves a specific salon service by ID.

**Parameters:**
- `id` (guid, in path) - Service ID

**Response:** SalonServiceDto

### Create Salon Service
**POST** `/api/SalonService`

Creates a new salon service.

**Request Body:** CreateSalonServiceDto

**Response:** `guid` (ID of created service)

### Edit Salon Service
**PATCH** `/api/SalonService/{id}`

Updates an existing salon service.

**Parameters:**
- `id` (guid, in path) - Service ID

**Request Body:** EditSalonServiceDto

### Delete Salon Service
**DELETE** `/api/SalonService/{id}`

Deletes a salon service.

**Parameters:**
- `id` (guid, in path) - Service ID

---

## Specialists

### Get All Specialists
**GET** `/api/Specialist`

Retrieves all specialists.

**Response:**
```json
[
  {
    "id": "guid",
    // ... other specialist properties
  }
]
```

### Get Specialist
**GET** `/api/Specialist/{id}`

Retrieves a specific specialist by ID.

**Parameters:**
- `id` (guid, in path) - Specialist ID

**Response:** SpecialistDto

### Create Specialist
**POST** `/api/Specialist`

Creates a new specialist.

**Request Body:** CreateSpecialistDto

**Response:** `guid` (ID of created specialist)

### Delete Specialist
**DELETE** `/api/Specialist/{id}`

Deletes a specialist.

**Parameters:**
- `id` (guid, in path) - Specialist ID

---

## Users

### Get All Users
**GET** `/api/User`

Retrieves all users.

**Response:**
```json
[
  {
    "id": "guid",
    // ... other user properties
  }
]
```

### Get User
**GET** `/api/User/{id}`

Retrieves a specific user by ID.

**Parameters:**
- `id` (guid, in path) - User ID

**Response:** UserDto

### Create User
**POST** `/api/User`

Creates a new user.

**Request Body:** CreateUserDto

**Response:** `guid` (ID of created user)

### Edit User
**PATCH** `/api/User/{id}`

Updates an existing user.

**Parameters:**
- `id` (guid, in path) - User ID

**Request Body:** EditUserDto

### Get User Roles
**GET** `/api/User/{id}/roles`

Retrieves roles for a specific user.

**Parameters:**
- `id` (guid, in path) - User ID

**Response:** List of RoleDto

### Manage User Roles
**POST** `/api/User/{id}/roles`

Updates roles for a user.

**Parameters:**
- `id` (guid, in path) - User ID

**Request Body:** ManageUserRolesDto

---

## Authentication

### Send Two-Factor Code
**POST** `/api/Authentication/send-two-factor-code`

Sends a two-factor authentication code to the user's email.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** `200 OK`

### Login
**POST** `/api/Authentication/log-in`

Authenticates a user and returns a token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "securityCode": "string"
}
```

**Response:**
```json
{
  "token": "string",
  "expires": "datetime"
}
```

### Logout
**GET** `/api/Authentication/log-out`

Logs out the current user and clears authentication cookies.

**Response:** `200 OK`

### Reset Password Request
**POST** `/api/Authentication/reset-password-request`

Initiates a password reset process for the given email.

**Request Body:** `"string"` (email)

**Response:** `200 OK`

### Check Security Code
**GET** `/api/Authentication/security-code/{securityCode}`

Validates a security code for password reset.

**Parameters:**
- `securityCode` (string, in path) - The security code to validate

**Response:** `boolean`

### Reset Password
**POST** `/api/Authentication/reset-password`

Resets user password using a security code.

**Request Body:** (ResetPasswordDto structure)
```json
{
  "securityCode": "string",
  "newPassword": "string"
}
```

**Response:** `200 OK`

---

