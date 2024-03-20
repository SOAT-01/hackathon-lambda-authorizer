const createUsuarioHandler = require("../post").handler;

jest.mock("bcryptjs", () => ({
  hash: jest.fn().mockResolvedValue("hashedPassword"),
}));

jest.mock("@/gateway/usuarioGateway", () => ({
  createUsuario: jest.fn().mockResolvedValue({}),
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
          error: "Missing required fields",
        },
        headers,
      });
    });
    it("should throw an error if the email is not sent", async () => {
      result = await createUsuarioHandler({
        body: JSON.stringify({
          nome: "Teste",
          matricula: "123456",
          senha: "123456",
        }),
      });

      result.body = JSON.parse(result.body);
    });
    it("should throw an error if the nome is not sent", async () => {
      result = await createUsuarioHandler({
        body: JSON.stringify({
          email: "email@email.com",
          matricula: "123456",
          senha: "123456",
        }),
      });

      result.body = JSON.parse(result.body);
    });
    it("should throw an error if the matricula is not sent", async () => {
      result = await createUsuarioHandler({
        body: JSON.stringify({
          email: "email@email.com",
          nome: "John Doe",
          senha: "123456",
        }),
      });

      result.body = JSON.parse(result.body);
    });
    it("should throw an error if the senha is not sent", async () => {
      result = await createUsuarioHandler({
        body: JSON.stringify({
          email: "email@email.com",
          nome: "John Doe",
          matricula: "123456",
        }),
      });

      result.body = JSON.parse(result.body);
    });
  });
  describe("When the required data is sent and no error happens", () => {
    it("should create the user on DB", async () => {
      const result = await createUsuarioHandler({
        body: JSON.stringify({
          email: "email@email.com",
          nome: "John Doe",
          matricula: "123456",
          senha: "123456",
        }),
      });

      result.body = JSON.parse(result.body);

      expect(result).toEqual({
        statusCode: 200,
        body: {
          message: "User created successfully",
        },
        headers,
      });
    });
  });
});
