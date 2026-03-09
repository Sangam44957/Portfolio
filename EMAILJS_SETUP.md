# EmailJS Setup Guide

To make the contact form work, follow these steps:

## 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account (300 emails/month free)

## 2. Add Email Service
- Go to "Email Services" in dashboard
- Click "Add New Service"
- Choose your email provider (Gmail recommended)
- Connect your email account
- Copy the **Service ID**

## 3. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- Use this template:

```
Subject: New Portfolio Contact: {{subject}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

- Copy the **Template ID**

## 4. Get Public Key
- Go to "Account" → "General"
- Copy your **Public Key**

## 5. Update Contact.tsx
Open `components/Contact.tsx` and replace:
- `YOUR_SERVICE_ID` with your Service ID
- `YOUR_TEMPLATE_ID` with your Template ID  
- `YOUR_PUBLIC_KEY` with your Public Key

## Example:
```typescript
await emailjs.send(
  'service_abc123',      // Your Service ID
  'template_xyz789',     // Your Template ID
  { ... },
  'user_def456'          // Your Public Key
);
```

## Done!
Your contact form will now send real emails to: **sangammehta44@gmail.com**
