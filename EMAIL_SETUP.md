# Email Setup Guide for Contact Form

This guide explains how to set up proper email functionality for your portfolio contact form.

## Option 1: EmailJS (Recommended for Client-Side)

EmailJS is a service that allows you to send emails directly from client-side JavaScript without a backend server.

### Setup Steps:

1. **Sign up for EmailJS**
   - Go to [EmailJS.com](https://www.emailjs.com/)
   - Create a free account
   - Verify your email

2. **Create an Email Service**
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the authentication steps
   - Note down your Service ID

3. **Create an Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Design your email template using variables:
     - `{{from_name}}` - Sender's name
     - `{{from_email}}` - Sender's email
     - `{{subject}}` - Email subject
     - `{{message}}` - Email message
   - Note down your Template ID

4. **Get Your Public Key**
   - Go to "Account" → "API Keys"
   - Copy your Public Key

5. **Install EmailJS Package**
   ```bash
   npm install @emailjs/browser
   ```

6. **Update Environment Variables**
   Create a `.env.local` file in your project root:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```

7. **Update the Email Service**
   Replace the mock service in `lib/email-service.ts` with EmailJS implementation.

## Option 2: SendGrid (Server-Side)

SendGrid is a powerful email service that requires a backend server.

### Setup Steps:

1. **Sign up for SendGrid**
   - Go to [SendGrid.com](https://sendgrid.com/)
   - Create an account
   - Verify your domain

2. **Get API Key**
   - Go to Settings → API Keys
   - Create a new API Key
   - Note down your API Key

3. **Create API Route**
   Create `pages/api/send-email.ts` or `app/api/send-email/route.ts`:
   ```typescript
   import { NextApiRequest, NextApiResponse } from 'next'
   import sgMail from '@sendgrid/mail'

   sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

   export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     if (req.method !== 'POST') {
       return res.status(405).json({ message: 'Method not allowed' })
     }

     try {
       const { name, email, subject, message } = req.body

       const msg = {
         to: 'your-email@domain.com',
         from: 'noreply@yourdomain.com',
         subject: `Portfolio Contact: ${subject}`,
         text: `
           Name: ${name}
           Email: ${email}
           Subject: ${subject}
           Message: ${message}
         `,
         html: `
           <h3>New Contact Form Submission</h3>
           <p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Subject:</strong> ${subject}</p>
           <p><strong>Message:</strong></p>
           <p>${message}</p>
         `,
       }

       await sgMail.send(msg)
       res.status(200).json({ message: 'Email sent successfully' })
     } catch (error) {
       console.error('SendGrid error:', error)
       res.status(500).json({ message: 'Failed to send email' })
     }
   }
   ```

4. **Install SendGrid Package**
   ```bash
   npm install @sendgrid/mail
   ```

5. **Update Environment Variables**
   ```env
   SENDGRID_API_KEY=your_sendgrid_api_key
   FROM_EMAIL=noreply@yourdomain.com
   TO_EMAIL=your-email@domain.com
   ```

## Option 3: Formspree (No Setup Required)

Formspree is a simple form handling service that requires no setup.

### Setup Steps:

1. **Go to Formspree**
   - Visit [Formspree.io](https://formspree.io/)
   - Sign up for a free account

2. **Create a Form**
   - Click "New Form"
   - Give it a name (e.g., "Portfolio Contact")
   - Copy the form endpoint URL

3. **Update Contact Form**
   Replace the form action with Formspree endpoint:
   ```tsx
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
     {/* form fields */}
   </form>
   ```

## Current Implementation

The current implementation uses a mock email service for development purposes. To enable real email functionality:

1. Choose one of the options above
2. Follow the setup steps
3. Update the `getEmailService()` function in `lib/email-service.ts`
4. Test the contact form

## Security Considerations

- **Rate Limiting**: Implement rate limiting to prevent spam
- **Validation**: Always validate form data on both client and server
- **CORS**: Configure CORS properly if using external services
- **Environment Variables**: Never expose API keys in client-side code

## Testing

1. Fill out the contact form
2. Submit the form
3. Check your email inbox
4. Verify the email was received correctly

## Troubleshooting

- **Emails not sending**: Check API keys and service configuration
- **Spam folder**: Check your spam/junk folder
- **Rate limits**: Ensure you haven't exceeded service limits
- **Console errors**: Check browser console for error messages

## Support

If you encounter issues:
1. Check the service's documentation
2. Verify your configuration
3. Test with the service's testing tools
4. Contact the service's support team
