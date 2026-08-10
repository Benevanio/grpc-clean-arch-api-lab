class UserController {
  constructor(uc) {
    this.uc = uc;
  }
  async getUserById(call, cb) {
    try {
      const u = await this.uc.execute(call.request.id);
      cb(null, u);
    } catch (e) {
      cb({ code: 5, message: e.message });
    }
  }
}
module.exports = UserController;
