//Auth Service (Business Logic)
const ErrorResponse = require('../Utils/errorResponse');

class AuthService {
  constructor(userRepository, passwordHasher, jwtService) {
    if (!jwtService || !jwtService.generateToken) {
      throw new ErrorResponse('Valid JWT service must be provided', 401);
    }
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.jwtService = jwtService;
  }

  async register(userData) {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ErrorResponse("User already exists", 401);
    }

    const hashedPassword = await this.passwordHasher.hash(userData.password);
    const newUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      bio: newUser.bio
    };
  }

  async login(loginData){
    // Find user by email
    const user = await this.userRepository.findByEmail(loginData.email);
    if(!user) throw new ErrorResponse('Invalid credentials: Something wrong with Email', 401);

    // Verify password
    const isMatch = await this.passwordHasher.compare(
      loginData.password,
      user.password
    )
    if(!isMatch) throw new ErrorResponse('Invalid credentials: Something wrong with Password', 401);

    //Apply JWT
      const token = this.jwtService.generateToken({
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    });

    // Return user data (excluding password)
    return {
      user: {
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
      isAccountVerified: user.isAccountVerified,
      profilePhoto: user.profilePhoto
      },
      token
    };
  }

  async verifyToken(token){
    return this.jwtService.verifyToken(token);
  }
}

module.exports = AuthService;

