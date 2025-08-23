// Auth Service (Refactored)
const crypto = require("crypto");
const sendEmail = require("../Utils/sendEmail");
const ErrorResponse = require("../Utils/errorResponse");
const VerificationToken = require("../Models/VerificationToken");
const User = require("../Models/User");

class AuthService {
  constructor(userRepository, passwordHasher, jwtService) {
    if (!jwtService?.generateToken) {
      throw new ErrorResponse("Valid JWT service must be provided", 401);
    }
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.jwtService = jwtService;
  }

  // Generate and save token
  async #generateVerificationToken(userId) {
    const token = crypto.randomBytes(32).toString("hex");
    await new VerificationToken({ userId, token }).save();
    return token;
  }

  // Send verification email
  async #sendVerificationEmail(user, token) {
    const url = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${token}`;
    const html = `<h2>Hello ${user.username}</h2>
                  <p>Please verify your email:</p>
                  <a href="${url}">Verify</a>`;
    await sendEmail({ to: user.email, subject: "Verify Your Email", html });
  }

  async register({ email, password, ...rest }) {
    if (await this.userRepository.findByEmail(email)) {
      throw new ErrorResponse("Email already registered", 401);
    }

    const hashedPassword = await this.passwordHasher.hash(password);
    const user = await this.userRepository.create({ ...rest, email, password: hashedPassword });

    const token = await this.#generateVerificationToken(user._id);
    await this.#sendVerificationEmail(user, token);

    return { user };
  }

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new ErrorResponse("Invalid Email", 401);

    if (!user.isAccountVerified) {
      let token = (await VerificationToken.findOne({ userId: user._id }))?.token;
      if (!token) token = await this.#generateVerificationToken(user._id);

      await this.#sendVerificationEmail(user, token);
      throw new ErrorResponse("Verification email sent. Please check your inbox.");
    }

    if (!(await this.passwordHasher.compare(password, user.password))) {
      throw new ErrorResponse("Invalid Password", 401);
    }

    const token = this.jwtService.generateToken({
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    const { _id, username, isAdmin, isAccountVerified, profilePhoto } = user;
    return { user: { _id, username, isAdmin, isAccountVerified, profilePhoto }, token };
  }

  verifyToken(token) {
    return this.jwtService.verifyToken(token);
  }

  async verifyEmail(userId, token) {
    const user = await User.findById(userId);
    if (!user) throw new ErrorResponse("User not found", 404);

    const validToken = await VerificationToken.findOne({ userId, token });
    if (!validToken) throw new ErrorResponse("Invalid or expired token", 400);

    user.isAccountVerified = true;
    await user.save();
    await VerificationToken.deleteOne({ userId, token });

    return { user, message: "Email verified successfully, you can now log in" };
  }
}

module.exports = AuthService;
