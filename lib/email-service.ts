// Email service configuration
export interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

export interface EmailResponse {
  success: boolean
  message: string
  error?: string
}

// Mock Email Service (for development/testing)
export class MockEmailService {
  async sendEmail(data: EmailData): Promise<EmailResponse> {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const isSuccess = Math.random() > 0.1
    
    if (isSuccess) {
      console.log('Mock email sent:', data)
      return {
        success: true,
        message: 'Mock email sent successfully!'
      }
    } else {
      throw new Error('Mock email service error')
    }
  }
}

// Factory function to get the appropriate email service
export function getEmailService() {
  return new MockEmailService()
}

// Utility function to validate email data
export function validateEmailData(data: EmailData): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long')
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please provide a valid email address')
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters long')
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Rate limiting utility
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map()
  private maxAttempts = 5
  private windowMs = 15 * 60 * 1000 // 15 minutes

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const attempt = this.attempts.get(identifier)

    if (!attempt || now > attempt.resetTime) {
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs })
      return true
    }

    if (attempt.count >= this.maxAttempts) {
      return false
    }

    attempt.count++
    return true
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier)
  }
}
