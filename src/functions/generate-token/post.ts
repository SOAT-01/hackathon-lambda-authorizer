import { APIGatewayEvent } from "aws-lambda";
import ApiResponse from "../../utils/ApiResponse";
import jwt from "jsonwebtoken";
import { getUsuarioByMatricula } from "@/gateway/usuarioGateway";
import bcrypt from "bcryptjs";

const generateUserToken = async (event: APIGatewayEvent) => {
  const { matricula, senha } = JSON.parse(event.body || "{}");
  try {
    if (!matricula || !senha) {
      return ApiResponse(400, { error: "Missing required infos" });
    }

    const usuario = await getUsuarioByMatricula(matricula);

    if (usuario.length === 0) {
      return ApiResponse(401, { error: "Invalid user or password" });
    }

    const { senha: hash }: any = usuario[0];

    const isPasswordCorrect = await bcrypt.compare(senha, hash);

    if (!isPasswordCorrect) {
      return ApiResponse(401, { error: "Invalid user or password" });
    }

    const token = jwt.sign({ matricula }, process.env.PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    });
    return ApiResponse(200, { token });
  } catch (error) {
    console.log(error);
    return ApiResponse(500, { error: "Internal Server Error" });
  }
};

module.exports.handler = generateUserToken;
