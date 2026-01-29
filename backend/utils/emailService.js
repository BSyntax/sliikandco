import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY,
);

export const sendPasswordResetEmail = async ({ email, name, resetUrl }) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email, name }];
    sendSmtpEmail.sender = {
      email: process.env.BREVO_FROM_EMAIL || "mzu.nqwiliso@gmail.com",
      name: "Sliik & Co.",
    };
    sendSmtpEmail.subject = "Password Reset Request - Sliik & Co.";
    sendSmtpEmail.htmlContent = `
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
                    <tr>
                      <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px 8px 0 0;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Sliik & Co.</h1>
                      </td>
                    </tr>
                    
                    <tr>
                      <td style="padding: 40px;">
                        <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px; font-weight: 600;">Reset Your Password</h2>
                        <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                          Hi ${name},
                        </p>
                        <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.6;">
                          We received a request to reset your password for your Sliik & Co. account. Click the button below to create a new password:
                        </p>
                        
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
      `;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { success: true };
  } catch (error) {
    console.error("Brevo error:", error);
    throw error;
  }
};

export const sendContactEmail = async ({ name, email, phone, message }) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.to = [
      { email: "mzu.nqwiliso@gmail.com", name: "Sliik & Co. Admin" },
    ];
    sendSmtpEmail.sender = {
      email: process.env.BREVO_FROM_EMAIL || "mzu.nqwiliso@gmail.com",
      name: "Sliik & Co.",
    };
    sendSmtpEmail.replyTo = { email, name };
    sendSmtpEmail.subject = `New Contact Form Submission from ${name}`;
    sendSmtpEmail.htmlContent = `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #333;">
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};

export const sendOrderConfirmationEmail = async (order, email) => {
  try {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const formattedDate = deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.to = [{ email, name: order.shippingAddress.name }];
    sendSmtpEmail.sender = {
      email: process.env.BREVO_FROM_EMAIL || "mzu.nqwiliso@gmail.com",
      name: "Sliik & Co.",
    };
    sendSmtpEmail.subject = `Order Confirmation - Order #${order._id}`;
    sendSmtpEmail.htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f4f4f4; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .order-details { margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px; }
            .item { padding: 10px 0; border-bottom: 1px solid #eee; }
            .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You for Your Order!</h1>
            </div>
            <div class="content">
              <p>Hi ${order.shippingAddress.name},</p>
              <p>We are pleased to confirm that your order <strong>#${order._id}</strong> has been received and is being processed.</p>
              
              <div style="background-color: #e8f5e9; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <h3 style="margin: 0; color: #2e7d32;">Expected Delivery</h3>
                <p style="margin: 5px 0 0 0; font-size: 18px;">${formattedDate}</p>
              </div>

              <div class="order-details">
                <h3>Order Summary</h3>
                ${order.orderItems
                  .map(
                    (item) => `
                  <div class="item">
                    <div style="display: flex; justify-content: space-between;">
                      <span>${item.name} x ${item.qty}</span>
                      <span> R${item.price}</span>
                    </div>
                  </div>
                `,
                  )
                  .join("")}
                
                <div style="margin-top: 15px; text-align: right;">
                  <p><strong>Total: R${order.totalPrice.toFixed(2)}</strong></p>
                </div>
              </div>

              <div style="margin-top: 20px;">
                <h3>Shipping Address</h3>
                <p>
                  ${order.shippingAddress.street}<br>
                  ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}<br>
                  ${order.shippingAddress.country}
                </p>
              </div>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Sliik & Co. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
