export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ValidationErrorKey =
  | 'nameRequired'
  | 'emailRequired'
  | 'emailInvalid'
  | 'subjectRequired'
  | 'messageRequired';

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, ValidationErrorKey>>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(email: string): ValidationErrorKey | null {
  const trimmed = email.trim();
  if (!trimmed) return 'emailRequired';
  if (!EMAIL_PATTERN.test(trimmed)) return 'emailInvalid';
  return null;
}

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, ValidationErrorKey>> = {};

  if (!input.name.trim()) {
    errors.name = 'nameRequired';
  }

  const emailErr = validateEmail(input.email);
  if (emailErr) {
    errors.email = emailErr;
  }

  if (!input.subject.trim()) {
    errors.subject = 'subjectRequired';
  }

  if (input.message.trim().length < 10) {
    errors.message = 'messageRequired';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
