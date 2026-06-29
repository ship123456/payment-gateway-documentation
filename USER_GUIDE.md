# Payment Gateway

# User Guide

**Version:** 1.0

**Last Updated:** June 2026

## Table of Contents

- [Introduction](#1-introduction)
- [System Requirements](#2-system-requirements)
- [Getting Started](#3-getting-started)
- [Authentication](#4-authentication)
- [Dashboard](#5-dashboard)
- [New Payment](#6-new-payment)
- [Payment History](#7-payment-history)
- [Webhooks](#8-webhooks)
- [Support](#9-support)
- [Profile](#10-profile)
- [Settings](#11-settings)
- [Logout](#12-logout)
- [Troubleshooting](#13-troubleshooting)
- [Frequently Asked Questions](#14-frequently-asked-questions)

## 1. Introduction

The Payment Gateway Dashboard is a web-based application designed to simplify payment management through a centralized and user-friendly interface. The application enables users to create and manage payments, monitor transaction history, configure webhook settings, submit support requests, and manage account information from a single dashboard.

In addition to payment management, the application provides features such as payment history search and filtering, CSV export, webhook monitoring, support ticket management, profile management, notification preferences, and Light/Dark theme customization.

This User Guide provides step-by-step instructions for using each feature of the application, helping users perform common tasks efficiently and navigate the dashboard with ease.

## 2. System Requirements

Before using the application, ensure that your system meets the following requirements.

### Hardware Requirements

- Desktop or laptop computer
- Minimum 4 GB RAM
- Internet connection

### Software Requirements

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

### Browser Requirements

- JavaScript enabled
- Cookies enabled
- Local Storage enabled

## 3. Getting Started

Follow these steps to begin using the application.

1. Open your preferred web browser.
2. Launch the Payment Gateway application.
3. Sign in using your account credentials.
4. After successful authentication, the Dashboard is displayed.
5. Use the navigation menu to access different application modules.

> **Note:** A valid user account is required to access the application.

## 4. Authentication

The application provides a complete authentication workflow for secure user access.

### Sign In

To access the application:

1. Open the Sign In page.
2. Enter your registered email address.
3. Enter your password.
4. Click **Sign In**.
5. You will be redirected to the Dashboard after successful authentication.

> **Screenshot:** Sign In Page

### Sign Up

To create a new account:

1. Open the Sign Up page.
2. Enter your full name.
3. Enter your email address.
4. Create a password.
5. Confirm your password.
6. Click **Sign Up**.

> **Screenshot:** Sign Up Page

### Forgot Password

If you forget your password:

1. Click **Forgot Password**.
2. Enter your registered email address.
3. Click **Submit**.
4. Follow the instructions displayed to reset your password.

> **Screenshot:** Forgot Password Page

### Reset Password

To create a new password:

1. Open the Reset Password page.
2. Enter your new password.
3. Confirm the new password.
4. Click **Reset Password**.
5. Return to the Sign In page using your new credentials.

> **Screenshot:** Reset Password Page

## 5. Dashboard

The Dashboard provides a centralized overview of payment activity and quick access to application features.

### Dashboard Overview

The Dashboard displays:

- Payment summary cards
- Monthly payment analytics
- Recent transactions
- Quick navigation to application modules
- Notification center
- Sidebar navigation

> **Screenshot:** Dashboard

### Notification Center

Click the notification bell in the header to view recent application notifications and payment-related updates.

> **Screenshot:** Notification Panel

## 6. New Payment

The New Payment page allows users to create a payment request.

### Creating a Payment

1. Open **New Payment** from the sidebar.
2. Enter the customer name.
3. Enter the email address.
4. Enter the phone number.
5. Enter the payment amount.
6. Select the currency.
7. Select a payment method.
8. Enter the Order ID.
9. Enter a description.
10. Click **Create Payment**.

### Validation

The application validates user input before creating a payment.

Validation includes:

- Customer Name is required.
- Email address must be valid.
- Phone number is required.
- Amount must be greater than zero.
- Currency must be selected.
- Payment Method must be selected.
- Order ID is required.

### Payment Success

After a successful submission:

- A success message is displayed.
- A unique Payment ID is generated.
- The payment is added to Payment History.
- A webhook event is generated automatically.

The generated payment is automatically available in **Payment History** and a corresponding webhook event is created if webhooks are enabled.

> **Screenshot:** Payment Success

## 7. Payment History

The Payment History page displays all previously created payment transactions in a tabular format.

![Payment History](images/payment-history.png)

### Searching Payments

1. Open **Payment History**.
2. Enter a Payment ID, Customer Name, or Order ID in the search box.
3. Matching transactions are displayed automatically.

### Filtering Payments

1. Click the **Status** filter.
2. Select a payment status.
3. The table updates to display matching transactions.

### Viewing Payment Details

1. Click **View** for any payment.
2. A modal window displays complete payment information.

The details include:

- Payment ID
- Customer Name
- Email Address
- Phone Number
- Amount
- Currency
- Payment Method
- Payment Status
- Order ID
- Description
- Payment Date

![Payment Details](images/payment-details.png)

### Pagination

Use the **Previous**, **Next**, or page number buttons to navigate through multiple pages of payment records.

### Exporting Payment History

1. Click **Export CSV**.
2. The application downloads the payment history as a CSV file.
3. Open the file using any spreadsheet application.

## 8. Webhooks

The Webhooks page allows users to configure webhook settings and monitor webhook delivery logs.

![Webhooks](images/webhooks.png)

### Webhook Configuration

The configuration section displays:

- Webhook URL
- Secret Key
- Webhook Status

### Enable / Disable Webhooks

Use the **Enable Webhooks** toggle to enable or disable webhook event generation.

### Copy Webhook URL

Click **Copy URL** to copy the configured webhook endpoint.

### Regenerate Secret

Click **Regenerate Secret** to generate a new webhook secret key.

### Searching Webhooks

Enter a Payment ID or Event Name in the search box to locate specific webhook records.

### Filtering Webhooks

Use the Status filter to display:

- Delivered
- Failed
- All

### Viewing Webhook Details

Click **View** to open the webhook details modal.

The modal displays:

- Event Name
- Payment ID
- Endpoint
- Response
- Payload

![Webhook Details](images/webhook-details.png)

### Pagination

Use the pagination controls at the bottom of the table to navigate through webhook records.

## 9. Support

The Support module allows users to submit support requests and monitor submitted tickets.

![Support](images/support.png)

### Contact Support

To submit a support request:

1. Open **Contact Support**.
2. Enter the Subject.
3. Select a Category.
4. Enter your Message.
5. Attach a file (optional).
6. Click **Submit**.

### Validation

The Contact Support form validates:

- Subject
- Category
- Message

### Uploading Attachments

Click **Choose File** to attach a supporting document or image before submitting the request.

### My Support Tickets

The **My Support Tickets** page displays all submitted support requests.

### Searching Support Tickets

Use the search box to locate tickets by Ticket ID or Subject.

### Filtering Support Tickets

Use the Status filter to display matching tickets.

### Viewing Ticket Details

Click **View** to display the complete ticket information in a modal window.

The modal includes:

- Ticket ID
- Subject
- Category
- Status
- Priority
- Date
- Description

![Support Ticket Details](images/support-ticket.png)

## 10. Profile

The Profile page allows users to view and update their personal information.

![Profile](images/profile.png)

### Viewing Profile

The page displays:

- Full Name
- Email Address
- Phone Number
- Company Name

### Updating Profile Information

1. Edit the required fields.
2. Click **Save Changes**.

### Validation

The application validates:

- Full Name
- Email Address
- Phone Number

## 11. Settings

The Settings page allows users to customize account preferences.

![Settings](images/settings.png)

### Personal Information

Update your personal details whenever required.

### Billing Information

Manage billing-related information associated with your account.

### Change Password

To change your password:

1. Enter the Current Password.
2. Enter the New Password.
3. Confirm the New Password.
4. Click **Save Changes**.

### Notification Preferences

Enable or disable application notifications using the available checkboxes.

### Appearance (Light & Dark Theme)

Choose between **Light** and **Dark** themes.

Changes are applied immediately after selection.

## 12. Logout

To securely exit the application:

1. Click **Logout** from the sidebar.
2. The application signs you out and redirects you to the Sign In page.

## 13. Troubleshooting

| Issue | Solution |
|--------|----------|
| Unable to sign in | Verify your email address and password. |
| Payment creation failed | Ensure all required fields are completed correctly. |
| Search returns no results | Verify the search keyword or clear active filters. |
| Webhook logs are empty | Ensure webhooks are enabled before creating payments. |
| File upload failed | Verify the selected file and try again. |
| Theme not changing | Refresh the application and try again. |
| Unable to submit a form | Verify that all required fields are completed and validation errors have been resolved.|

## 14. Frequently Asked Questions

### Can I edit a payment after creating it?

No. Existing payment records are read-only.

### Can I export payment history?

Yes. Use the **Export CSV** button on the Payment History page.

### How do I enable webhooks?

Open **Webhooks** and enable the **Enable Webhooks** toggle.

### Can I attach files to support requests?

Yes. The Contact Support form supports file attachments.

### How do I switch between Light and Dark themes?

Open **Settings** and select your preferred theme.

### Where are my support requests stored?

Submitted requests are available in **My Support Tickets**.

### Is application data stored permanently?

No. The application stores data locally in the browser using Local Storage.
