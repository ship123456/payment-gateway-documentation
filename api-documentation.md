# Payment Gateway API Documentation

## Table of Contents

- [Version Information](#version-information)
- [Overview](#overview)
- [Base URLs](#base-urls)
- [Authentication](#authentication)
- [Headers](#headers)
- [Create Payment](#create-payment)
- [Get Payment Status](#get-payment-status)
- [Refund Payment](#refund-payment)
- [Webhook Events](#webhook-events)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)

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
