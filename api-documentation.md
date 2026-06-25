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
- [List Payments](#list-payments)
- [List Refunds](#list-refunds)
- [List Transactions](#list-transactions)
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

## API Versioning

The Payment Gateway API uses URI-based versioning.

### Current Version

```http
https://api.paymentgateway.com/v1
```

### Versioning Policy

- Breaking changes are introduced only in a new API version.
- Backward-compatible improvements may be released without changing the API version.
- Deprecated API versions remain available for a limited period before retirement.

## Deprecation Policy

When an API version or feature is scheduled for retirement, advance notice will be provided to developers.

### Policy

- Deprecated features remain available during the announced deprecation period.
- Migration guidance is provided before a feature is removed.
- Developers should migrate to the latest supported API version to receive new features and security updates.

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

## Sandbox Test Data

Use the following sample values while testing in the sandbox environment.

| Item | Sample Value |
|------|--------------|
| API Key | `sk_test_123456789` |
| Customer ID | `cust_12345` |
| Payment ID | `pay_123456` |
| Refund ID | `ref_123456` |

> **Note:** Sandbox transactions do not process real payments and are intended for testing purposes only.

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
| Idempotency-Key | No | Unique key used to prevent duplicate requests |

### Example

```http
Authorization: Bearer sk_test_123456789
Content-Type: application/json
Accept: application/json
```
### Request Tracking

Every API response includes a unique request identifier that can be used for debugging and support.

| Header | Description |
|--------|-------------|
| X-Request-ID | Unique identifier assigned to each API request. Include this value when contacting support. |

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

### Validation Rules

| Field | Validation |
|--------|------------|
| amount | Must be greater than 0. |
| currency | Supported values: INR, USD, EUR. |
| customer_id | Must be a valid customer identifier. |
| payment_method | Supported values: UPI, Credit Card, Debit Card, Net Banking, Wallet. |

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

### Payment Status Values

| Status | Description |
|---------|-------------|
| pending | Payment has been created but is awaiting processing. |
| processing | Payment is currently being processed. |
| success | Payment completed successfully. |
| failed | Payment could not be completed. |
| cancelled | Payment was cancelled before completion. |

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

### Validation Rules

| Field | Validation |
|--------|------------|
| amount | Must be greater than 0 and cannot exceed the original payment amount. |
| reason | Maximum length of 255 characters. |

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

### Refund Status Values

| Status | Description |
|---------|-------------|
| pending | Refund request has been created and is awaiting processing. |
| processed | Refund has been completed successfully. |
| failed | Refund could not be processed. |

## List Payments

Retrieves a paginated list of payments.

### Endpoint

```http
GET /payments
```

### Query Parameters

| Parameter | Type | Required | Description |
|------------|--------|----------|-------------|
| page | integer | No | Page number |
| limit | integer | No | Records per page |
| status | string | No | Filter by payment status |

### Example Request

```http
GET /payments?page=1&limit=20&status=success
```

### Success Response

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
      "amount": 1000,
      "currency": "INR"
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
| data | array | List of payment objects |

### Response Codes

| Code | Description |
|------|------------|
| 200 | Success |
| 401 | Unauthorized |


## List Refunds

Retrieves a paginated list of refunds.

### Endpoint

```http
GET /refunds
```

### Query Parameters

| Parameter | Type | Required | Description |
|------------|--------|----------|-------------|
| page | integer | No | Page number |
| limit | integer | No | Records per page |
| status | string | No | Filter by refund status |

### Example Request

```http
GET /refunds?page=1&limit=20&status=processed
```

### Success Response

```json
{
  "page": 1,
  "limit": 20,
  "total_records": 50,
  "total_pages": 3,
  "data": [
    {
      "refund_id": "ref_123456",
      "payment_id": "pay_123456",
      "status": "processed",
      "amount": 500
    }
  ]
}
```
### Response Fields

| Field | Type | Description |
|---------|--------|-------------|
| page | integer | Current page number |
| limit | integer | Number of records returned per page |
| total_records | integer | Total available refund records |
| total_pages | integer | Total number of pages |
| data | array | List of refund objects |

### Response Codes

| Code | Description |
|------|------------|
| 200 | Success |
| 401 | Unauthorized |

## List Transactions

Retrieves a paginated list of payment transactions.

### Endpoint

```http
GET /transactions
```

### Query Parameters

| Parameter | Type | Required | Description |
|------------|--------|----------|-------------|
| page | integer | No | Page number |
| limit | integer | No | Records per page |
| status | string | No | Filter by transaction status |

### Example Request

```http
GET /transactions?page=1&limit=20&status=success
```

### Success Response

```json
{
  "page": 1,
  "limit": 20,
  "total_records": 200,
  "total_pages": 10,
  "data": [
    {
      "transaction_id": "txn_123456",
      "payment_id": "pay_123456",
      "status": "success",
      "amount": 1000,
      "currency": "INR"
    }
  ]
}
```
### Response Fields

| Field | Type | Description |
|---------|--------|-------------|
| page | integer | Current page number |
| limit | integer | Number of records returned per page |
| total_records | integer | Total available transaction records |
| total_pages | integer | Total number of pages |
| data | array | List of transaction objects |

### Response Codes

| Code | Description |
|------|------------|
| 200 | Success |
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
### Payload Fields

| Field | Type | Description |
|---------|--------|-------------|
| event | string | Webhook event type |
| payment_id | string | Unique payment identifier |
| status | string | Current payment status |
| amount | integer | Payment amount |
| currency | string | Transaction currency |

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

### Verification Example

```pseudo
payload = request.body
receivedSignature = request.headers["X-Signature"]

expectedSignature = HMAC_SHA256(payload, WEBHOOK_SECRET)

if receivedSignature != expectedSignature:
    return HTTP 401 Unauthorized

processWebhookEvent()
return HTTP 200 OK
```


## Error Handling

All error responses follow a consistent JSON structure across every API endpoint.

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
  },
  "request_id": "req_123456"
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

### Response Headers

| Header | Description |
|--------|-------------|
| X-RateLimit-Limit | Maximum requests allowed within the current time window. |
| X-RateLimit-Remaining | Number of requests remaining in the current time window. |
| X-RateLimit-Reset | Time when the rate limit window resets (Unix timestamp). |

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

## SDK Examples

### cURL Example

```bash
curl -X POST https://api.paymentgateway.com/v1/payments \
  -H "Authorization: Bearer sk_test_123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1000,
    "currency": "INR",
    "customer_id": "cust_12345",
    "payment_method": "UPI"
  }'
```

### JavaScript Example

```javascript
const response = await fetch(
  "https://api.paymentgateway.com/v1/payments",
  {
    method: "POST",
    headers: {
      Authorization: "Bearer sk_test_123456789",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: 1000,
      currency: "INR",
      customer_id: "cust_12345",
      payment_method: "UPI"
    })
  }
);

const data = await response.json();
console.log(data);
```
### Python Example

```python
import requests

url = "https://api.paymentgateway.com/v1/payments"

headers = {
    "Authorization": "Bearer sk_test_123456789",
    "Content-Type": "application/json"
}

payload = {
    "amount": 1000,
    "currency": "INR",
    "customer_id": "cust_12345",
    "payment_method": "UPI"
}

response = requests.post(
    url,
    headers=headers,
    json=payload
)

print(response.json())
```

## Troubleshooting

| Issue | Possible Cause | Resolution |
|--------|----------------|------------|
| 401 Unauthorized | Invalid or missing API key | Verify the `Authorization` header and API key. |
| 404 Not Found | Resource does not exist | Verify the resource identifier (for example, `payment_id`). |
| 429 Too Many Requests | Rate limit exceeded | Wait until the rate limit resets before retrying. |
| Webhook not received | Endpoint unavailable or signature validation failed | Verify the webhook URL, HTTPS configuration, and signature verification logic. |

