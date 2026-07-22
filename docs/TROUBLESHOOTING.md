# Troubleshooting Guide

## Overview

This guide provides solutions to common issues that users may encounter while using the PayFlow application. Follow the recommended solutions below before contacting support.

## Table of Contents

- [Application Does Not Start](#application-does-not-start)
- [npm install Fails](#npm-install-fails)
- [Port 3000 Is Already in Use](#port-3000-is-already-in-use)
- [Invalid Login Credentials](#invalid-login-credentials)
- [Unable to Create a Payment](#unable-to-create-a-payment)
- [CSV Export Is Not Working](#csv-export-is-not-working)
- [Profile Changes Are Not Saved](#profile-changes-are-not-saved)
- [Password Cannot Be Updated](#password-cannot-be-updated)
- [Unable to Submit a Support Ticket](#unable-to-submit-a-support-ticket)
- [Screenshot Upload Fails](#screenshot-upload-fails)
- [Application Data Is Missing](#application-data-is-missing)
- [Browser Compatibility](#browser-compatibility)
- [Best Practices](#best-practices)
- [Additional Support](#additional-support)

# Application Does Not Start

## Possible Cause

Project dependencies have not been installed.

## Solution

1. Open the project directory.
2. Run:

```bash
npm install
```

3. Start the application.

```bash
npm start
```

# npm install Fails

## Possible Cause

- Node.js is not installed.
- Internet connection is unavailable.
- npm cache is corrupted.

## Solution

- Verify that Node.js is installed.
- Check your internet connection.
- Clear the npm cache.

```bash
npm cache clean --force
```

Run the installation again.

```bash
npm install
```

---

# Port 3000 Is Already in Use

## Possible Cause

Another application is already using port **3000**.

## Solution

Stop the existing application or run the project using another available port.

# Invalid Login Credentials

## Possible Cause

- Incorrect email address.
- Incorrect password.
- Account does not exist.

## Solution

- Verify the email address.
- Verify the password.
- Create a new account if required.

# Unable to Create a Payment

## Possible Cause

Required information has not been entered correctly.

## Solution

- Complete all required fields.
- Verify the payment amount.
- Select a valid payment method.
- Correct any validation errors before submitting.

# CSV Export Is Not Working

## Possible Cause

There are no payment records available for export.

## Solution

Create one or more payments before exporting the payment history.

# Profile Changes Are Not Saved

## Possible Cause

One or more fields contain invalid information.

## Solution

Verify the entered information and click **Update Profile** again.

# Password Cannot Be Updated

## Possible Cause

- Current password is incorrect.
- New Password and Confirm Password do not match.
- Required fields are empty.

## Solution

- Enter the correct current password.
- Ensure both password fields match.
- Complete all required fields before updating.

# Unable to Submit a Support Ticket

## Possible Cause

Required information has not been provided.

## Solution

Verify that the following fields are completed:

- Subject
- Description

Then submit the support request again.

# Screenshot Upload Fails

## Possible Cause

The selected file is not a supported image format.

## Solution

Upload only supported image files.

Supported formats include:

- JPG
- JPEG
- PNG

# Application Data Is Missing

## Possible Cause

Application data stored in localStorage has been cleared.

## Solution

Create the required data again.

Since the application stores information locally, clearing browser data removes all saved records.

# Browser Compatibility

PayFlow is supported on modern desktop browsers, including:

- Google Chrome
- Microsoft Edge
- Mozilla Firefox

Using the latest browser version is recommended.

# Best Practices

- Use the latest version of Node.js.
- Keep your browser updated.
- Complete all required fields before submitting forms.
- Export payment records regularly if needed.
- Avoid clearing browser storage while using the application.

# Additional Support

If the issue cannot be resolved using this guide, submit a support request using the **Contact Support** page within the application.
