import { MailerOptions } from '@nestjs-modules/mailer';

export const mailConfig: MailerOptions = {
  transport: {
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // STARTTLS, so must be false
    auth: {
      user: 'diggisupport@diggibyte.com',
      pass: 'mdggcdlxftswyzhg',
    },
    tls: {
      rejectUnauthorized: false, // Add this if you're behind a firewall/proxy or using self-signed certs
    },
  },
  defaults: {
    from: '"Diggi Support" <diggisupport@diggibyte.com>',
  },
};
