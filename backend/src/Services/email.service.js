const crypto = require("crypto");
const sendEmail = require("../Utils/sendEmail");
const VerificationToken = require("../Models/VerificationToken");
const ErrorResponse = require("../Utils/errorResponse");

class EmailService {
  constructor(tokenModel) {
    this.tokenModel = tokenModel;
  }

  async sendTokenEmail(user, type = "verify") {
    // 1) Generate token
    const token = crypto.randomBytes(32).toString("hex");

    // 2) Save token in DB
    await new this.tokenModel({
      userId: user._id,
      token,
      type, // either "verify" or "reset"
    }).save();

    // 3) Choose subject + URL
    let subject, url;
    if (type === "verify") {
      subject = "Verify Your Email";
      url = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${token}`;
    } else if (type === "reset") {
      subject = "Reset Your Password";
      url = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${token}`;
    } else {
      throw new ErrorResponse("Invalid email type provided");
    }
  //\n\n${url}\n\n
    // 4) Send email
    await sendEmail({
      to: user.email,
      subject: subject,
      html: `Hello ${user.username},
            \n\nPlease click the link below to ${type === "verify" 
            ? "verify your email" : 
            "reset your password"}: <a href="${url}">Click Here</a> 
            If you didn’t request this, you can ignore this email.`
  });
  }

  async deleteToken(token) {
    await this.tokenModel.findOneAndDelete({ token });
  }

  async findToken(token, type) {
    return await this.tokenModel.findOne({ token, type });
  }

}

module.exports = EmailService;