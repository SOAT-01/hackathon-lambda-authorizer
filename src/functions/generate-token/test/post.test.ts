const generateUserToken = require("../post").handler;

jest.mock("bcryptjs", () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock("@/gateway/usuarioGateway", () => ({
  getUsuarioByMatricula: jest.fn().mockResolvedValue([
    {
      senha: "hashedPassword",
    },
  ]),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn().mockReturnValue("token"),
}));

describe("Given createUsuario", () => {
  const headers = {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };
  describe("When the required data is not sent", () => {
    let result: any;
    afterEach(() => {
      expect(result).toEqual({
        statusCode: 400,
        body: {
          error: "Missing required infos",
        },
        headers,
      });
    });
    it("should throw an error if the matricula is not sent", async () => {
      result = await generateUserToken({
        body: JSON.stringify({
          senha: "123456",
        }),
      });

      result.body = JSON.parse(result.body);
    });
    it("should throw an error if the senha is not sent", async () => {
      result = await generateUserToken({
        body: JSON.stringify({
          matricula: "123456",
        }),
      });

      result.body = JSON.parse(result.body);
    });
  });
  describe("When the required data is sent and no error happens", () => {
    it("should return the created token", async () => {
      const result = await generateUserToken({
        body: JSON.stringify({
          matricula: "123456",
          senha: "123456",
        }),
      });

      result.body = JSON.parse(result.body);

      expect(result).toEqual({
        statusCode: 200,
        body: {
          token: "token",
        },
        headers,
      });
    });
  });
});
