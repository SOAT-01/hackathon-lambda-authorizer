import { APIGatewayEvent } from "aws-lambda";
import ApiResponse from "../../utils/ApiResponse";
import jwt from "jsonwebtoken";
import { getClienteByCpf } from "@/gateway/clienteGateway";
import { assertArgumentIsValidCpf } from "@/utils/assertionConcern";

const generateUserToken = async (event: APIGatewayEvent) => {
  const { cpf } = JSON.parse(event.body || "{}");
  try {
    if (cpf) {
      const isAValidCPF = assertArgumentIsValidCpf(cpf);
      if (!isAValidCPF) {
        return ApiResponse(400, {
          error: "Incorrect cpf format, ex: 123.456.789-00",
        });
      }
      const results = await getClienteByCpf(cpf);
      if (results[0].length === 0) {
        return ApiResponse(404, { error: "User not found" });
      }
    }

    const token = jwt.sign({ cpf }, process.env.PRIVATE_KEY, {
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
