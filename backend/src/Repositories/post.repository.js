class PostRepository {
  constructor(model) {
    this.model = model;
  }
  async create(postData) {
    return this.model.create(postData);
  }

  async findById(id) {
    return this.model.findById(id).populate("user", "username").populate("comments");
  }

  async findAll(filter = {}, skip = 0, limit = 0) {
  const query = this.model
    .find(filter)
    .sort({ createdAt: -1 })
    .populate("user", ["-password"]);

  if (limit > 0) {
    query.skip(skip).limit(limit);
  }

  return query;
}

async countAll(filter = {}) {
  return this.model.countDocuments(filter);
}

  // async findAll({ page = 1, limit = 3, category }) {
  //   const query = category ? { category } : {};
  //   const skip = (page - 1) * limit;

  //   const [posts, total] = await Promise.all([
  //     this.model.find(query)
  //       .sort({ createdAt: -1 })
  //       .skip(skip)
  //       .limit(limit)
  //       .populate('user', ['-password']),
  //     this.model.countDocuments(query)
  //   ]);

  //   return {
  //     posts,
  //     total,
  //     page,
  //     totalPages: Math.ceil(total / limit)
  //   };
  // }


  // async findAll(filter = {}, skip = 0, limit = 0) {
  //   const query = this.model
  //     .find(filter)
  //     .sort({ createdAt: -1 })
  //     .populate("user", ["-password"]);

  //   if (limit > 0) {
  //     query.skip(skip).limit(limit);
  //   }

  //   return query;
  // }

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
