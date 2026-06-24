# API Documentation

## Authentication

All API requests require a valid API key in the request header.

### Header

Authorization: Bearer <API_KEY>

## Create Payment

### Endpoint

POST /payments

### Description

Creates a new payment transaction.

### Request Body

| Field | Type | Required | Description |
|:-----:|:----:|:--------:|:-----------:|
| amount|number|    Yes   | Payment amount |
| currency | string | Yes | Currency code |
| customerId | string | Yes | Customer identifier |

### Success Response

```json
{
  "paymentId": "pay_12345",
  "status": "success"
}
```

## Get Payment Details

### Endpoint

GET /payments/{paymentId}

### Description

Retrieves details of a specific payment transaction.

### Path Parameters

| Field | Type | Required | Description |
|:-----:|:----:|:--------:|:-----------:|
| paymentId | string | Yes | Unique payment identifier |

### Success Response

```json
{
  "paymentId": "pay_12345",
  "amount": 1000,
  "currency": "USD",
  "status": "success"
}
```
## Refund Payment

### Endpoint

POST /refunds

### Description

Processes a full or partial refund for an existing payment.

### Request Body

| Field | Type | Required | Description |
|:-----:|:----:|:--------:|:-----------:|
| paymentId | string | Yes | Unique payment identifier |
| amount | number | Yes | Refund amount |

### Success Response

```json
{
  "refundId": "ref_12345",
  "status": "success"
}
```




