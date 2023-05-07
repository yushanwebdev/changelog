import * as user from "../user";

describe("user handler", () => {
  it("should create a new user", async () => {
    const req = {
      body: {
        username: "yushan",
        password: "admin",
      },
    };

    const res = {
      json({ token }: { token: string }) {
        expect(token).toBeTruthy();
      },
    };

    expect.assertions(1);

    //@ts-ignore
    await user.createNewUser(req, res, () => {});
  });
});
