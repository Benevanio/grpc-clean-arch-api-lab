const User = require("../../domain/entities/user");
class FakeUserRepository {
  constructor() {
    this.users = [
      new User("1", "João", "j@em.com"),
      new User("2", "Maria", "m@em.com"),
    ];
  }
  async findById(id) {
    return this.users.find((u) => u.id === id) || null;
  }
}
module.exports = FakeUserRepository;
