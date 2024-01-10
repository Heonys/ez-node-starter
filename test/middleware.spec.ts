import { isLoggedIn, isNotLoggedIn } from "../src/middleware/auth";

describe("isLoggedIn", () => {
  it("로그인 되어있으면 :: next()를 호출", () => {
    const req: any = {
      isAuthenticated: jest.fn(() => true),
    };
    const res: any = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    const next = jest.fn();
    isLoggedIn(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it("로그인 되어있지 않으면 :: 403 로그인이 필요합니다 ", () => {
    const req: any = {
      isAuthenticated: jest.fn(() => false),
    };
    const res: any = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    const next = jest.fn();
    isLoggedIn(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("로그인이 필요합니다");
  });
});

describe("isNotLoggedIn", () => {
  it("로그인 되어있으면 :: redirect ", () => {
    const req: any = {
      isAuthenticated: jest.fn(() => true),
    };
    const res: any = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
    isNotLoggedIn(req, res, next);
    const message = encodeURIComponent("이미 로그인한 상태입니다");
    expect(res.redirect).toHaveBeenCalledWith(`/?error=${message}`);
  });

  it("로그인 되어있지 않으면 :: next()를 호출", () => {
    const req: any = {
      isAuthenticated: jest.fn(() => false),
    };
    const res: any = {
      redirect: jest.fn(),
    };
    const next = jest.fn();
    isNotLoggedIn(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
