import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send password reset email
 * @param {Object} options - Email options
 * @param {string} options.email - Recipient email
 * @param {string} options.name - Recipient name
 * @param {string} options.resetUrl - Password reset URL
 */
export const sendPasswordResetEmail = async ({ email, name, resetUrl }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "Password Reset Request - Sliik & Co.",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
              <tr>
                <td align="center" style="padding: 40px 0;">
                  <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                      <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Sliik & Co.</h1>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">Reset Your Password</h2>
                        <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                          Hi ${name},
                        </p>
                        <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                          We received a request to reset your password for your Sliik & Co. account. Click the button below to create a new password:
                        </p>
                        
                        <!-- Button -->
                        <table role="presentation" style="margin: 30px 0;">
                          <tr>
                            <td style="border-radius: 6px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                              <a href="${resetUrl}" target="_blank" style="display: inline-block; padding: 16px 40px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 6px;">
                                Reset Password
                              </a>
                            </td>
                          </tr>
                        </table>
                        
                        <p style="margin: 20px 0; color: #666666; font-size: 14px; line-height: 1.6;">
                          Or copy and paste this link into your browser:
                        </p>
                        <p style="margin: 0 0 20px 0; color: #667eea; font-size: 14px; word-break: break-all;">
                          ${resetUrl}
                        </p>
                        
                        <div style="margin: 30px 0; padding: 20px; background-color: #fff3cd; border-left: 4px solid #ffc107; border-radius: 4px;">
                          <p style="margin: 0; color: #856404; font-size: 14px; line-height: 1.6;">
                            <strong>Important:</strong> This link will expire in 10 minutes for security reasons.
                          </p>
                        </div>
                        
                        <p style="margin: 20px 0 0 0; color: #666666; font-size: 14px; line-height: 1.6;">
                          If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="padding: 30px 40px; background-color: #f8f9fa; border-radius: 0 0 8px 8px; text-align: center;">
                        <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px;">
                          © ${new Date().getFullYear()} Sliik & Co. All rights reserved.
                        </p>
                        <p style="margin: 0; color: #999999; font-size: 12px;">
                          Where fashion meets style.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      throw new Error("Failed to send email");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email service error:", error);
    throw error;
  }
};
