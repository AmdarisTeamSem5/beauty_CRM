# API DOC

## Table of Contents
- [Appointments](#appointments)
- [Miscellaneous](#miscellaneous)
- [Salons](#salons)
- [Salon Services](#salon-services)
- [Specialists](#specialists)
- [Users](#users)
- [Authentication](#authentication)
- [Roles](#roles)

## Base URL

All endpoints run on localhost:7284 by default
---

## Appointments

<table> <tr><th>Description</th> <th>Request</th> <th>Response</th> </tr> 

<tr> 
  <td>Get a list of all appointments</td>

  <td>

**Endpoint** `GET /api/Appointment`

**Body:** `none`
  </td> 

  <td>

**Response shape**
```json
[
  {
    "id": "guid_string",
    "clientId": "guid_string",
    "specialistId": "guid_string",
    "salonId":"guid_string",
    "confirmed": "bool"
  }, {...}
]
```
  </td>
</tr> 

<tr>
  <td> Post 1 appointment </td>
  <td>

**Endpoint** `POST /api/Appointment`

**Body:**
```json
{
  "clientId": "guid_string",
  "salonServiceId": "guid_string",
  "salonId": "guid_string",
  "appointmentDate": "datetime:2025-10-27T10:01:36.213Z",
  "confirmed": "bool"
}
```
  </td> 

  <td>

**Response shape** `guid_string`
  </td> 
</tr> 
<tr> 
  <td> Get an appointment based on it's guid</td>

  <td>

**Endpoint** `GET /api/Appointment/{guid}`

**Body** `none`
  </td>

  <td>

**Response shape**
```json
{
  "id": "guid_string",
  "clientId": "guid_string",
  "specialistId": "guid_string",
  "salonId": "guid_string",
  "confirmed": "bool"
}
```

  </td> 
</tr>
</table>

---

## Miscellaneous

<table> <tr><th>Description</th> <th>Request</th> <th>Response</th> </tr> 
<tr>
  <td> Get a list of all Service Types </td>
  <td> 

**Endpoint** `GET /api/Misc/ServiceTypes`  
  
**Body** `none`
  </td>

  <td>

**Response shape**
```json
[
  {
    "id" : "number",
    "name" : "string"
  }, {...}
]
```
  </td>
</tr>
</table>

---

## Salons

<table> <tr> <th>Description</th> <th>Request</th> <th>Response</th> </tr>
<tr>
  <td>Get a list of all Salons</td>
  <td>
    
**Endpoint** `GET /api/Salon`

**Body** `none`
  </td>

  <td>

**Response shape**
```json
[
  {
    "id": "guid_string",
    "ownerId": "guid_string",
    "name": "string",
    "rating": "number",
    "description": "string",
    "address": "string",
    "region": "number",
    "phone": "string",
    "email": "string",
    "createdAt": "datetime:2025-10-27T10:26:12.598Z",
    "updatedAt": "datetime:2025-10-27T10:26:12.598Z"
  }
]
```
  </td>
</tr>
<tr>
  <td> Post a single Salon </td>
  <td> 

**Endpoint** `POST /api/Salon `

**Body**
```json
{
  "ownerId": "guid_string",
  "name": "string",
  "rating": "number",
  "description": "string",
  "address": "string",
  "region": "number",
  "phone": "string",
  "email": "string",
  "dateTime": "datetime:2025-10-27T10:28:44.369Z",
  "ratingCount": "number"
}
```
  </td>
  <td>

**Response** `guid_string`
  </td>

</tr>

</table>

---

## Salon Services

<table> <tr> <th>Description</th> <th>Request</th> <th>Response</th> </tr>
<tr>
  <td> Get a list of all salon services</td>
  <td>

**Endpoint** `GET /api/SalonService`

**Body** `none`
  </td>
  <td>

**Response shape**
```json
[
  {
    "id":"guid_string",
    "salonId": "guid_string",
    "specialistId": "guid_string",
    "type": "number",
    "name": "string",
    "description": "string",
    "durationMinutes": "number",
    "priceMDL": "number"
  }, {...}
]
```
  </td>
  
</tr>
<tr>
  <td>Get 1 salon service by ID</td>
  <td>

**Endpoint** `POST /api/SalonService/{id}`

**Body** 
```json
{
  "type": "number",
  "name": "string",
  "description": "string",
  "salonId": "guid_string",
  "specialistId": "guid_string",
  "durationMinutes": "number",
  "priceMDL": "number"
}
```
  </td>
  <td>

**Response shape** `guid_string`
  </td>
</tr>

<tr>
  <td>Get a salon service by id</td>
  <td>

**Endpoint** `GET /api/SalonService/{id}`

**Body** `none`
  </td>
  <td>

**Response shape**
```json
{
  "type": "number",
  "name": "string",
  "description": "string",
  "salonid": "guid_string",
  "specialistid": "guid_string",
  "durationminutes": "number",
  "pricemdl": "number"
}
```
  </td>
</tr>
<tr>
  <td>Update a salon service by id </td>
  <td>

**Endpoint** `PATCH /api/SalonSercice/{id}`

**Body**
```json
{
  "type": "number",
  "name": "string",
  "description": "string",
  "salonid": "guid_string",
  "specialistid": "guid_string",
  "durationminutes": "number",
  "pricemdl": "number"
}
```
  </td>
  <td>

**Response shape** `none`
  </td>
</tr>
<tr>
  <td> Delete a salon service by id </td>
  <td>

**Endpoint** `DELETE /api/SalonService/{id}`

**Body** `none`
  </td>
  <td>

**Response shape** `none`
  </td>
</tr>
</table>

---

## Specialists

<table> <tr> <th>Description</th> <th>Request</th> <th>Response</th> </tr>
<tr>
  <td> Get a list of all Specialists</td>
  <td>

**Endpoint** `GET /api/Specialist`

**Body** `none`
  </td>
  <td>

**Response shape**
```json
[
  {
    "id": "guid_string",
    "salonId": "guid_string",
    "fullName": "string",
    "description": "string",
    "imageString64": "string"
  }, {...}
]
```
  </td>
</tr>
<tr>
  <td>Create 1 Specialist entry</td>
  <td>

**Endpoint** `POST /api/Specialist`

**Body**
```json
{
  "id": "guid_string",
  "salonId": "guid_string",
  "fullName": "string",
  "description": "string",
  "imageString64": "string"
}
```
  </td>
  <td>

**Response shape** `guid_string`
  </td>
</tr>
<tr>
// get 1
  <td> Get 1 Specialist by Id</td>
  <td>

**Endpoint** `GET /api/Specialist/{id}`

**Body** `none`
  </td>
  <td>

**Response shape**
```json
{
  "id": "guid_string",
  "salonId": "guid_string",
  "fullName": "string",
  "description": "string",
  "imageString64": "string"
}
```
  </td>
</tr>
<tr>
  <td> Delete a Specialist by id</td>
  <td>

**Endpoint** `DELETE /api/Specialist/{id}`
  </td>
  <td

**Response shape** `none`
  ></td>
</tr>

</table>
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



