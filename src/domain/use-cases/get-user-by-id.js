class GetUserByIdUseCase {
  constructor(repo) {
    this.repo = repo;
  }
  async execute(id) {
    const u = await this.repo.findById(id);
    if (!u) throw new Error("Not found");
    return u;
  }
}
module.exports = GetUserByIdUseCase;
