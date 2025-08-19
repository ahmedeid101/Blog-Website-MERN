//User Repository (Data Access Layer)

class UserRepository {
  constructor(model) {
    this.model = model;
  }

  async findById(id){
     return this.model.findById(id).select('-password').populate('posts');
  }

    async findByEmail(email) {
    return this.model.findOne({ email });
  }
  
  async updateUser(userId, updateData){
    return this.model.findByIdAndUpdate(
        userId,
        updateData,
        {new: true, runValidators: true}
<<<<<<< HEAD
    ).select('-password').populate("posts");
=======
    ).select('-password');
>>>>>>> 02ee4c8648a884a8a762606d5a950c7b57c4a980
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

  async countUsers(filter = {}){
    return this.model.countDocuments(filter);
  }

}

module.exports = UserRepository;