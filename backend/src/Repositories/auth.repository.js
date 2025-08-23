//User Repository (Data Access Layer)

class AuthRepository {
  constructor(model) {
    this.model = model;
  }

  async findByEmail(email, includePassword = false) {
    const query = this.model.findOne({ email });
    if(includePassword){
        query.select('+password');
    }
    return query.exec();
  }

  async create(userData) {
    const user = new this.model(userData);
    return user.save();
  }

      async verifyUser(userId) {
    return await this.model.findByIdAndUpdate(userId, {
      isAccountVerified: true,
      verificationToken: null
    }, { new: true });
  }
}

module.exports = AuthRepository;