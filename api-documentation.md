# Payment Gateway API Documentation

## Table of Contents

- [Version Information](#version-information)
- [Overview](#overview)
- [Base URLs](#base-urls)
- [Authentication](#authentication)
- [Idempotency](#idempotency)
- [Headers](#headers)
- [Create Payment](#create-payment)
- [Get Payment Status](#get-payment-status)
- [Refund Payment](#refund-payment)
- [Webhook Events](#webhook-events)
- [Error Handling](#error-handling)
- [Pagination](#pagination)
- [Rate Limiting](#rate-limiting)
- [SDK Examples](#sdk-examples)

## Version Information

| Item | Value |
|--------|--------|
| Documentation Version | 1.0 |
| API Version | v1 |
| Status | Active |

## Overview

This document provides detailed API information for integrating with the Payment Gateway System.

The APIs allow merchants to create payments, check transaction status, process refunds, and receive real-time payment updates through webhooks.

All API requests use REST principles, JSON format, HTTPS, and API key-based authentication.

### API Format

All request and response bodies are exchanged in JSON format.

## Base URLs

| Environment | Base URL |
|------------|----------|
| Sandbox | `https://sandbox.api.paymentgateway.com/v1` |
| Production | `https://api.paymentgateway.com/v1` |

Use the sandbox environment for testing. Use the production environment only after the integration has been verified.

## Authentication

All API requests require an API key.

The API key must be included in the request header.

### Header Format

```http
Authorization: Bearer <API_KEY>
```

### Example

```http
Authorization: Bearer sk_test_123456789
```

### Authentication Notes

- Keep API keys confidential.
- Do not expose API keys in frontend code.
- Use sandbox keys for testing.
- Use production keys only for live transactions.

## Idempotency

Idempotency keys prevent duplicate payment creation when the same request is submitted multiple times.

### Header

```http
Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000
```

### Notes

- Each key should be unique for a payment request.
- Reusing the same key with the same request returns the original response.
- Idempotency keys help prevent accidental duplicate transactions.

## Headers

All requests should include the following headers:

| Header | Required | Description |
|----------|----------|-------------|
| Authorization | Yes | API authentication token |
| Content-Type | Yes | Request content type |
| Accept | Yes | Expected response format |

### Example

```http
Authorization: Bearer sk_test_123456789
Content-Type: application/json
Accept: application/json
```

## Create Payment

Creates a new payment request.

### Endpoint

```http
POST /payments
```

### Request Body

```json
{
  "amount": 1000,
  "currency": "INR",
  "customer_id": "cust_12345",
  "payment_method": "UPI"
}
```

### Request Parameters

| Field | Type | Required | Description |
|---------|--------|----------|-------------|
| amount | integer | Yes | Payment amount |
| currency | string | Yes | Transaction currency |
| customer_id | string | Yes | Unique customer identifier |
| payment_method | string | Yes | Payment method |

### Success Response

```json
{
  "payment_id": "pay_123456",
  "status": "pending",
  "amount": 1000,
  "currency": "INR"
}
```

### Response Fields

| Field | Type | Description |
|---------|--------|-------------|
| payment_id | string | Unique payment identifier |
| status | string | Current payment status |
| amount | integer | Payment amount |
| currency | string | Transaction currency |


### Response Codes

| Code | Description |
|------|------------|
| 201 | Payment created |
| 400 | Invalid request |
| 401 | Unauthorized |

## Get Payment Status

Retrieves the current status of an existing payment.

### Endpoint

```http
GET /payments/{payment_id}
```

### Path Parameters

| Parameter | Type | Required | Description |
|------------|--------|----------|-------------|
| payment_id | string | Yes | Unique payment identifier |

### Example Request

```http
GET /payments/pay_123456
```

### Success Response

```json
{
  "payment_id": "pay_123456",
  "status": "success",
  "amount": 1000,
  "currency": "INR",
  "payment_method": "UPI"
}
```
### Response Fields

| Field | Type | Description |
|---------|--------|-------------|
| payment_id | string | Unique payment identifier |
| status | string | Current payment status |
| amount | integer | Payment amount |
| currency | string | Transaction currency |
| payment_method | string | Payment method used |

### Response Codes

| Code | Description |
|------|------------|
| 200 | Success |
| 404 | Payment not found |
| 401 | Unauthorized |

## Refund Payment

Initiates a full or partial refund for a completed payment.

### Endpoint

```http
POST /payments/{payment_id}/refund
```

### Path Parameters

| Parameter | Type | Required | Description |
|------------|--------|----------|-------------|
| payment_id | string | Yes | Unique payment identifier |

### Request Body

```json
{
  "amount": 500,
  "reason": "Customer requested refund"
}
```

### Request Parameters

| Field | Type | Required | Description |
|---------|--------|----------|-------------|
| amount | integer | Yes | Refund amount |
| reason | string | No | Reason for refund |

### Success Response

```json
{
  "refund_id": "ref_123456",
  "payment_id": "pay_123456",
  "status": "processed",
  "amount": 500
}
```
### Response Fields

| Field | Type | Description |
|---------|--------|-------------|
| refund_id | string | Unique refund identifier |
| payment_id | string | Associated payment identifier |
| status | string | Current refund status |
| amount | integer | Refunded amount |

### Response Codes

| Code | Description |
|------|------------|
| 200 | Refund processed |
| 400 | Invalid request |
| 404 | Payment not found |
| 401 | Unauthorized |

## Webhook Events

Webhook events provide real-time notifications when a payment status changes.

### Webhook Configuration

Configure a secure HTTPS endpoint to receive webhook notifications.

### Supported Events

| Event | Description |
|---------|-------------|
| payment.created | Payment request created |
| payment.processing | Payment is being processed |
| payment.success | Payment completed successfully |
| payment.failed | Payment failed |
| payment.cancelled | Payment cancelled |
| payment.refunded | Refund processed |

### Example Payload

```json
{
  "event": "payment.success",
  "payment_id": "pay_123456",
  "status": "success",
  "amount": 1000,
  "currency": "INR"
}
```

### Webhook Security

- Verify webhook signatures before processing events.
- Accept webhook requests only over HTTPS.
- Validate event payloads before updating application data.
- Return HTTP 200 status after successful processing.

### Signature Verification

Webhook requests include a signature header:

```http
X-Signature: sha256=5d41402abc4b2a76b9719d911017c592
```
Before processing a webhook event:

1. Retrieve the webhook secret from the merchant dashboard.
2. Generate an HMAC SHA-256 hash using the request payload.
3. Compare the generated signature with the `X-Signature` header.
4. Reject requests with invalid signatures.


## Error Handling

The API uses standard HTTP status codes to indicate request outcomes.

### Status Codes

| Code | Description |
|------|------------|
| 200 | Success |
| 201 | Resource created |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Resource not found |
| 409 | Conflict |
| 422 | Validation error |
| 429 | Too many requests |
| 500 | Internal server error |
| 503 | Service unavailable |

### Error Response Format

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Invalid request payload"
  }
}
```

### Common Error Codes

| Error Code | Description |
|------------|-------------|
| INVALID_REQUEST | Invalid request payload |
| INVALID_API_KEY | API key is invalid |
| PAYMENT_NOT_FOUND | Payment does not exist |
| UNSUPPORTED_PAYMENT_METHOD | Payment method not supported |
| RATE_LIMIT_EXCEEDED | Too many requests |


## Pagination

Pagination is supported for endpoints that return large collections of resources, such as:

```http
GET /payments
```
### Supported Endpoints

- GET /payments
- GET /refunds
- GET /transactions

### Query Parameters

| Parameter | Type | Description |
|------------|--------|-------------|
| page | integer | Page number to retrieve |
| limit | integer | Number of records per page |

### Example Request

```http
GET /payments?page=1&limit=20
```

### Example Response

```json
{
  "page": 1,
  "limit": 20,
  "total_records": 125,
  "total_pages": 7,
  "data": [
    {
      "payment_id": "pay_123456",
      "status": "success",
      "amount": 1000
    }
  ]
}
```

### Response Fields

| Field | Type | Description |
|---------|--------|-------------|
| page | integer | Current page number |
| limit | integer | Number of records returned per page |
| total_records | integer | Total available records |
| total_pages | integer | Total number of pages |
| data | array | Collection of returned resources |

### Notes

- Pagination parameters are optional.
- Default page value is 1.
- Default limit value is 20.
- Maximum limit value is 100.
- Results are returned in descending order of creation time by default.
- Requests for pages beyond the available range return an empty data array.

## Rate Limiting

To ensure platform stability, API requests are subject to rate limits.

### Limits

| Limit Type | Value |
|------------|-------|
| Requests Per Minute | 100 |
| Requests Per Hour | 5000 |

### Rate Limit Response

```json
{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later."
  }
}
```

### Best Practices

- Implement request retries with exponential backoff.
- Avoid sending duplicate requests.
- Cache frequently requested data where possible.

