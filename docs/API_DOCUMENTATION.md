# PayFlow API Documentation

## Overview

The PayFlow API is a simulated REST API for a React-based payment gateway management application. Although the application uses a local service layer backed by localStorage instead of a backend server, the API follows REST principles to demonstrate how a real payment management system would be documented.

The API supports user authentication, payment management, dashboard analytics, profile management, customer support, and frequently asked questions.

---

# Base URL

```text
https://api.payflow.local/v1
```

> **Note**
>
> This is a simulated base URL used for documentation purposes. The application performs data operations using a local service layer and browser localStorage.

---

# Authentication

Most endpoints require the user to be authenticated.

After a successful login, the application stores the authenticated user locally and uses that session to access protected resources.

---

## Authentication Flow

1. User submits login credentials.
2. Credentials are validated.
3. User session is created.
4. Protected resources become accessible.
5. User logs out to end the session.

---

# Content Type

All requests and responses use JSON.

### Request Header

```http
Content-Type: application/json
```

---

# Request Format

Example request body:

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

---

# Response Format

Successful responses return the requested resource together with a success message.

Example:

```json
{
  "success": true,
  "message": "Request completed successfully.",
  "data": {}
}
```

Failed requests return an error message.

Example:

```json
{
  "success": false,
  "message": "Unable to process the request."
}
```

---

# Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 OK | Request completed successfully |
| 201 Created | Resource created successfully |
| 400 Bad Request | Invalid request data |
| 401 Unauthorized | Authentication failed |
| 404 Not Found | Requested resource does not exist |

---

# Error Responses

## Invalid Request

```json
{
  "success": false,
  "message": "Invalid request."
}
```

---

## Authentication Failed

```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

## Resource Not Found

```json
{
  "success": false,
  "message": "Requested resource was not found."
}
```

---

# Authentication API

## Login

Authenticates an existing user.

### Endpoint

```http
POST /auth/login
```

### Request Body

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "id": "USR-1001",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Error Response

**Status:** `401 Unauthorized`

```json
{
  "success": false,
  "message": "Invalid email or password."
}
```

---

## Register

Creates a new user account.

### Endpoint

```http
POST /auth/register
```

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "confirmPassword": "Password123"
}
```

### Success Response

**Status:** `201 Created`

```json
{
  "success": true,
  "message": "Account created successfully."
}
```

### Error Response

**Status:** `400 Bad Request`

```json
{
  "success": false,
  "message": "Email already exists."
}
```

---

## Logout

Ends the current user session.

### Endpoint

```http
POST /auth/logout
```

### Request Body

No request body is required.

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Logged out successfully."
}
```

---

## Authentication Summary

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/login` | Authenticate a user |
| POST | `/auth/register` | Register a new account |
| POST | `/auth/logout` | End the current user session |

# Dashboard API

The Dashboard API provides payment analytics, recent transaction details, and notification data displayed on the application's dashboard.

---

## Get Dashboard Statistics

Returns summary statistics displayed on the dashboard.

### Endpoint

```http
GET /dashboard/stats
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": {
    "totalPayments": 124,
    "completedPayments": 102,
    "pendingPayments": 16,
    "failedPayments": 6,
    "totalRevenue": 458900
  }
}
```

---

## Get Monthly Payment Statistics

Returns monthly payment data used to render the payment chart.

### Endpoint

```http
GET /dashboard/monthly-payments
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "month": "Jan",
      "payments": 12
    },
    {
      "month": "Feb",
      "payments": 18
    },
    {
      "month": "Mar",
      "payments": 21
    }
  ]
}
```

---

## Get Recent Payments

Returns the latest payment transactions.

### Endpoint

```http
GET /dashboard/recent-payments
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "paymentId": "PAY-1001",
      "recipient": "ABC Pvt Ltd",
      "amount": 2500,
      "status": "Completed"
    },
    {
      "paymentId": "PAY-1002",
      "recipient": "XYZ Solutions",
      "amount": 1800,
      "status": "Pending"
    }
  ]
}
```

---

## Get Notifications

Returns notifications displayed on the dashboard.

### Endpoint

```http
GET /dashboard/notifications
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Payment Successful",
      "message": "Payment PAY-1001 completed successfully."
    },
    {
      "id": 2,
      "title": "Support Ticket Updated",
      "message": "Your support request has been resolved."
    }
  ]
}
```

---

# Payment API

The Payment API allows users to create, view, search, filter, export, and manage payment transactions.

---

## Get All Payments

Returns all available payment records.

### Endpoint

```http
GET /payments
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "paymentId": "PAY-1001",
      "recipient": "ABC Pvt Ltd",
      "amount": 2500,
      "status": "Completed"
    },
    {
      "paymentId": "PAY-1002",
      "recipient": "XYZ Solutions",
      "amount": 1800,
      "status": "Pending"
    }
  ]
}
```

---

## Get Payment Details

Returns details for a specific payment.

### Endpoint

```http
GET /payments/{paymentId}
```

### Path Parameter

| Parameter | Type | Description |
|----------|------|-------------|
| paymentId | String | Unique payment identifier |

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": {
    "paymentId": "PAY-1001",
    "recipient": "ABC Pvt Ltd",
    "amount": 2500,
    "currency": "INR",
    "status": "Completed",
    "paymentMethod": "UPI",
    "date": "2026-07-20"
  }
}
```

---

## Create Payment

Creates a new payment transaction.

### Endpoint

```http
POST /payments
```

### Request Body

```json
{
  "recipient": "ABC Pvt Ltd",
  "amount": 2500,
  "currency": "INR",
  "paymentMethod": "UPI"
}
```

### Success Response

**Status:** `201 Created`

```json
{
  "success": true,
  "message": "Payment created successfully."
}
```

---

## Update Payment

Updates an existing payment.

### Endpoint

```http
PUT /payments/{paymentId}
```

### Request Body

```json
{
  "recipient": "ABC Pvt Ltd",
  "amount": 3500,
  "status": "Completed"
}
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Payment updated successfully."
}
```

---

## Delete Payment

Deletes a payment record.

### Endpoint

```http
DELETE /payments/{paymentId}
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Payment deleted successfully."
}
```

---

## Search Payments

Searches payments by keyword.

### Endpoint

```http
GET /payments?search=abc
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": []
}
```

---

## Filter Payments

Filters payments based on payment status.

### Endpoint

```http
GET /payments?status=Completed
```

Supported values:

- Completed
- Pending
- Failed

---

## Export Payments

Exports payment history as a CSV file.

### Endpoint

```http
GET /payments/export
```

### Success Response

**Status:** `200 OK`

```text
payments.csv downloaded successfully
```

---

## Pagination

Returns payment records page by page.

### Endpoint

```http
GET /payments?page=1&limit=10
```

### Success Response

```json
{
  "success": true,
  "page": 1,
  "limit": 10,
  "totalRecords": 124,
  "totalPages": 13,
  "data": []
}
```

---

## Payment API Summary

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/dashboard/stats` | Retrieve dashboard statistics |
| GET | `/dashboard/monthly-payments` | Retrieve monthly payment analytics |
| GET | `/dashboard/recent-payments` | Retrieve recent payments |
| GET | `/dashboard/notifications` | Retrieve dashboard notifications |
| GET | `/payments` | Retrieve all payments |
| GET | `/payments/{paymentId}` | Retrieve payment details |
| POST | `/payments` | Create a payment |
| PUT | `/payments/{paymentId}` | Update a payment |
| DELETE | `/payments/{paymentId}` | Delete a payment |
| GET | `/payments?search=` | Search payments |
| GET | `/payments?status=` | Filter payments |
| GET | `/payments/export` | Export payment history |
| GET | `/payments?page=&limit=` | Retrieve paginated payments |

# Profile API

The Profile API allows authenticated users to view and update their account information and change their password.

---

## Get User Profile

Returns the currently authenticated user's profile information.

### Endpoint

```http
GET /profile
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": "USR-1001",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "country": "India"
  }
}
```

---

## Update Profile

Updates the user's profile information.

### Endpoint

```http
PUT /profile
```

### Request Body

```json
{
  "name": "John Doe",
  "phone": "+91 9876543210",
  "country": "India"
}
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Profile updated successfully."
}
```

---

## Change Password

Updates the user's account password.

### Endpoint

```http
PUT /profile/password
```

### Request Body

```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123",
  "confirmPassword": "NewPassword123"
}
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Password updated successfully."
}
```

### Error Response

**Status:** `400 Bad Request`

```json
{
  "success": false,
  "message": "Current password is incorrect."
}
```

---

# Support API

The Support API enables users to create, view, and monitor customer support tickets.

---

## Create Support Ticket

Creates a new support request.

### Endpoint

```http
POST /support/tickets
```

### Request Body

```json
{
  "subject": "Payment Failed",
  "category": "Payment",
  "description": "The payment failed during checkout."
}
```

### Success Response

**Status:** `201 Created`

```json
{
  "success": true,
  "message": "Support ticket created successfully."
}
```

---

## Get All Support Tickets

Returns all support tickets created by the current user.

### Endpoint

```http
GET /support/tickets
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "ticketId": "TKT-1001",
      "subject": "Payment Failed",
      "status": "Open"
    },
    {
      "ticketId": "TKT-1002",
      "subject": "Refund Request",
      "status": "Resolved"
    }
  ]
}
```

---

## Get Support Ticket Details

Returns detailed information for a specific support ticket.

### Endpoint

```http
GET /support/tickets/{ticketId}
```

### Path Parameter

| Parameter | Type | Description |
|----------|------|-------------|
| ticketId | String | Unique support ticket identifier |

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": {
    "ticketId": "TKT-1001",
    "subject": "Payment Failed",
    "category": "Payment",
    "description": "The payment failed during checkout.",
    "status": "Open",
    "createdAt": "2026-07-20"
  }
}
```

---

## Update Support Ticket

Updates an existing support ticket.

### Endpoint

```http
PUT /support/tickets/{ticketId}
```

### Request Body

```json
{
  "subject": "Payment Failed",
  "description": "Additional information about the issue."
}
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Support ticket updated successfully."
}
```

---

## Delete Support Ticket

Deletes a support ticket.

### Endpoint

```http
DELETE /support/tickets/{ticketId}
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "message": "Support ticket deleted successfully."
}
```

---

# FAQ API

The FAQ API provides frequently asked questions and answers available within the application.

---

## Get All FAQs

Returns all available FAQ items.

### Endpoint

```http
GET /faq
```

### Success Response

**Status:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question": "How do I create a payment?",
      "answer": "Navigate to the New Payment page and complete the payment form."
    },
    {
      "id": 2,
      "question": "How can I reset my password?",
      "answer": "Open Settings and select Change Password."
    }
  ]
}
```

---

# Profile & Support API Summary

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/profile` | Retrieve user profile |
| PUT | `/profile` | Update user profile |
| PUT | `/profile/password` | Change account password |
| POST | `/support/tickets` | Create a support ticket |
| GET | `/support/tickets` | Retrieve all support tickets |
| GET | `/support/tickets/{ticketId}` | Retrieve support ticket details |
| PUT | `/support/tickets/{ticketId}` | Update a support ticket |
| DELETE | `/support/tickets/{ticketId}` | Delete a support ticket |
| GET | `/faq` | Retrieve all FAQ items |

# Data Models

The following data models represent the JSON objects used throughout the PayFlow API.

---

## User Model

```json
{
  "id": "USR-1001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "country": "India"
}
```

| Field | Type | Description |
|--------|------|-------------|
| id | String | Unique user identifier |
| name | String | User's full name |
| email | String | Registered email address |
| phone | String | Contact number |
| country | String | User's country |

---

## Payment Model

```json
{
  "paymentId": "PAY-1001",
  "recipient": "ABC Pvt Ltd",
  "amount": 2500,
  "currency": "INR",
  "paymentMethod": "UPI",
  "status": "Completed",
  "date": "2026-07-20"
}
```

| Field | Type | Description |
|--------|------|-------------|
| paymentId | String | Unique payment ID |
| recipient | String | Recipient name |
| amount | Number | Payment amount |
| currency | String | Currency code |
| paymentMethod | String | Payment method |
| status | String | Payment status |
| date | Date | Transaction date |

---

## Support Ticket Model

```json
{
  "ticketId": "TKT-1001",
  "subject": "Payment Failed",
  "category": "Payment",
  "description": "The payment failed during checkout.",
  "status": "Open",
  "createdAt": "2026-07-20"
}
```

| Field | Type | Description |
|--------|------|-------------|
| ticketId | String | Ticket identifier |
| subject | String | Ticket subject |
| category | String | Ticket category |
| description | String | Issue description |
| status | String | Ticket status |
| createdAt | Date | Creation date |

---

## Notification Model

```json
{
  "id": 1,
  "title": "Payment Successful",
  "message": "Payment PAY-1001 completed successfully."
}
```

| Field | Type | Description |
|--------|------|-------------|
| id | Number | Notification ID |
| title | String | Notification title |
| message | String | Notification message |

---

## FAQ Model

```json
{
  "id": 1,
  "question": "How do I create a payment?",
  "answer": "Navigate to the New Payment page and complete the payment form."
}
```

| Field | Type | Description |
|--------|------|-------------|
| id | Number | FAQ identifier |
| question | String | Frequently asked question |
| answer | String | Corresponding answer |

---

# Validation Rules

## Authentication

| Field | Validation |
|--------|------------|
| Email | Required and must be a valid email address |
| Password | Required |

---

## Registration

| Field | Validation |
|--------|------------|
| Name | Required |
| Email | Required and must be unique |
| Password | Minimum 8 characters |
| Confirm Password | Must match the password |

---

## Payment

| Field | Validation |
|--------|------------|
| Recipient | Required |
| Amount | Required and greater than zero |
| Currency | Required |
| Payment Method | Required |

---

## Support Ticket

| Field | Validation |
|--------|------------|
| Subject | Required |
| Category | Required |
| Description | Required |

---

# API Flow Examples

## User Login Flow

```text
User
   │
   ▼
POST /auth/login
   │
   ▼
Validate Credentials
   │
   ▼
Login Successful
   │
   ▼
Dashboard
```

---

## Create Payment Flow

```text
User
   │
   ▼
POST /payments
   │
   ▼
Validate Request
   │
   ▼
Create Payment
   │
   ▼
Store Payment
   │
   ▼
Return Success Response
```

---

## Support Ticket Flow

```text
User
   │
   ▼
POST /support/tickets
   │
   ▼
Validate Data
   │
   ▼
Create Ticket
   │
   ▼
Store Ticket
   │
   ▼
Return Success Response
```

---

# Notes & Limitations

- This API is simulated using a local service layer.
- Data is stored in browser localStorage.
- Authentication is simulated and does not use JWT or session tokens.
- Internet connectivity is not required after the application is loaded.
- Payment processing is for demonstration purposes only.
- No external payment gateway is integrated.
- Data is browser-specific and is not synchronized across devices.

---

# Complete Endpoint Reference

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/auth/login` | Authenticate user |
| POST | `/auth/register` | Register a new account |
| POST | `/auth/logout` | Log out current user |
| GET | `/dashboard/stats` | Retrieve dashboard statistics |
| GET | `/dashboard/monthly-payments` | Retrieve monthly analytics |
| GET | `/dashboard/recent-payments` | Retrieve recent payments |
| GET | `/dashboard/notifications` | Retrieve notifications |
| GET | `/payments` | Retrieve all payments |
| GET | `/payments/{paymentId}` | Retrieve payment details |
| POST | `/payments` | Create a payment |
| PUT | `/payments/{paymentId}` | Update a payment |
| DELETE | `/payments/{paymentId}` | Delete a payment |
| GET | `/payments?search=` | Search payments |
| GET | `/payments?status=` | Filter payments |
| GET | `/payments?page=&limit=` | Retrieve paginated payments |
| GET | `/payments/export` | Export payments to CSV |
| GET | `/profile` | Retrieve user profile |
| PUT | `/profile` | Update user profile |
| PUT | `/profile/password` | Change password |
| POST | `/support/tickets` | Create support ticket |
| GET | `/support/tickets` | Retrieve support tickets |
| GET | `/support/tickets/{ticketId}` | Retrieve support ticket details |
| PUT | `/support/tickets/{ticketId}` | Update support ticket |
| DELETE | `/support/tickets/{ticketId}` | Delete support ticket |
| GET | `/faq` | Retrieve FAQ items |

---

# Conclusion

The PayFlow API demonstrates the design and documentation of a RESTful payment gateway management system. While the application uses a simulated backend powered by localStorage, the documented endpoints, request and response formats, and data models closely follow real-world REST API practices. This documentation serves as a technical reference for developers integrating with or maintaining the application.
