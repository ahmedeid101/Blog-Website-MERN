//User Repository (Data Access Layer)

class UserRepository {
  constructor(model) {
    this.model = model;
  }

    async create(userData) {
      const user = new this.model(userData);
      return user.save();
  }

  async findById(id) {
    return this.model.findById(id).select('-password').populate('posts');
  }
  async findByEmail(email) {
    return this.model.findOne({ email });
  }

  async findByVerificationToken(token) {
    return await this.model.findOne({ verificationToken: token });
  }

  async verifyUser(userId) {
    return await this.model.findByIdAndUpdate(userId, {
      isAccountVerified: true,
      verificationToken: null
    }, { new: true });
  }

  async updateUser(userId, updateData) {
    return this.model.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password').populate("posts");
  }

  async deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }

  async deleteMany(filter) {
    return this.model.deleteMany(filter);
  }

  async findMany(filter) {
    return this.model.find(filter);
  }

  async getAllUsers() {
    return this.model.find().select('-password').populate('posts');
  }

  async countUsers(filter = {}) {
    return this.model.countDocuments(filter);
  }

}

module.exports = UserRepository;