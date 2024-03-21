import { APIGatewayEvent } from "aws-lambda";
import ApiResponse from "../../utils/ApiResponse";
import { createUsuario, getUsuarioByMatricula } from "@/gateway/usuarioGateway";
import bcrypt from "bcryptjs";

const createUsuarioHandler = async (event: APIGatewayEvent) => {
  const salt = Number(process.env.PASSWORD_SALT);
  const { email, nome, matricula, senha } = JSON.parse(event.body || "{}");
  try {
    if (!email || !nome || !matricula || !senha) {
      return ApiResponse(400, {
        error: "Missing required fields",
      });
    }

    const user = await getUsuarioByMatricula(matricula);

    if (user.length > 0) {
      return ApiResponse(401, { error: "User already exists" });
    }

    const hash = await bcrypt.hash(senha, salt);

    await createUsuario(email, nome, matricula, hash);

    return ApiResponse(200, {
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return ApiResponse(500, { error: "Internal Server Error" });
  }
};

module.exports.handler = createUsuarioHandler;
