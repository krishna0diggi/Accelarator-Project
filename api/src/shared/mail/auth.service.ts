import { Injectable } from "@nestjs/common";
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthMailerService{
    constructor(private readonly mailerService: MailerService){}
     async sendOtpEmail(email: string, code: string, type: string) {
    // console.log('OTP is', code);
    // console.log('Type for OTP is', type);

    if (!email || !code) {
      throw new Error('Email and code are required');
    }

    const normalizedType = type.toLowerCase();

    const subjectMap: Record<string, string> = {
      reset: 'OTP for Password Reset',
      register: 'OTP for Email Verification',
      login: 'OTP for Login',
    };

    const messageMap: Record<string, string> = {
      reset: `
      <p>Dear User,</p>
      <p>Your OTP for <strong>password reset</strong> is <strong>${code}</strong>.</p>
      <p>Please use this code to reset your password. It will expire in 3 minutes.</p>
      <p>Regards,<br/>IT Asset Management Team</p>
    `,
      register: `
      <p>Dear User,</p>
      <p>Your OTP for <strong>account registration</strong> is <strong>${code}</strong>.</p>
      <p>Please use this code to verify your email address and activate your account. It will expire in 3 minutes.</p>
      <p>Regards,<br/>IT Asset Management Team</p>
    `,
      login: `
      <p>Dear User,</p>
      <p>Your OTP for <strong>login</strong> is <strong>${code}</strong>.</p>
      <p>Please use this code to complete your login process. It will expire in 3 minutes.</p>
      <p>Regards,<br/>IT Asset Management Team</p>
    `,
      // resend:`
      //   <p>Dear User,</p>
      //   <p>Your OTP for <strong>login</strong> is <strong>${code}</strong>.</p>
      //   <p>Please use this code to complete your login process. It will expire in 3 minutes.</p>
      //   <p>Regards,<br/>IT Asset Management Team</p>
      // `,
    };

    const subject = subjectMap[normalizedType];
    const html = messageMap[normalizedType];

    if (!subject || !html) {
      throw new Error(`Invalid OTP type: ${type}`);
    }

    await this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }

}
