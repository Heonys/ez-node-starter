jest.mock("../src/models/user");
import { getAllUser } from "../src/controllers/api";
import { User } from "../src/models/user";

describe("getAllUser", () => {
  it("유저정보를 JSON으로 반환한다", async () => {
    const req: any = {};
    const res: any = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };
    const next: any = ()=> {};
    (User.find as jest.Mock).mockReturnValue(Promise.resolve({}));
    await getAllUser(req, res, next);
    return expect(res.json).toHaveBeenCalled();
  });
});
