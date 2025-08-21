class PostRepository {
  constructor(model) {
    this.model = model;
  }
  async create(postData) {
    return this.model.create(postData);
  }

    async findAll() {
    return this.model.find().sort({ createdAt: -1 }).populate("user", ["-password"]).populate("comments");
  }

    async findByCategory(category) {
    return this.model.find({ category })
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }

  async findPaginated(page, limit) {
    return this.model.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user", ["-password"]);
  }

  async findById(id) {
    return this.model.findById(id).populate("user", "username profilePhoto")
    //.populate("comments");
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "username profilePhoto"
      }
    });
  }

//   async findAll(filter = {}, skip = 0, limit = 0) {
//   const query = this.model
//     .find(filter)
//     .sort({ createdAt: -1 })
//     .populate("user", ["-password"]).populate("comments");

//   if (limit > 0) {
//     query.skip(skip).limit(limit);
//   }

//   return query;
// }

async countAll(filter = {}) {
  return this.model.countDocuments(filter);
}

  async findByTitleAndUser(title, userId) {
    return this.model.findOne({ title, user: userId });
  }

  async update(id, data, options = {}) {
    let query = this.model.findByIdAndUpdate(id, { $set: data }, { new: true });

    if (options.populate) {
      options.populate.forEach((field) => {
        query = query.populate(
          field,
          field === "user" ? "-password" : undefined
        );
      });
    }

    return query;
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }

  async findMany(filter) {
    return this.model.find(filter);
  }

  async deleteMany(filter) {
    return this.model.deleteMany(filter);
  }

  async updateLikes(id, data, options = {}) {
    let query = this.model.findByIdAndUpdate(id, data, { new: true });

    if (options.populate) {
      options.populate.forEach((field) => {
        query = query.populate(
          field,
          field === "user" ? "-password" : "username"
        );
      });
    }

    return query;
  }
}

module.exports = PostRepository;
