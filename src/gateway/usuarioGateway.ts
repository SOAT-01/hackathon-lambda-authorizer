import { createConnection } from "@/external/postgres/createConnection";

export const getUsuarioByMatricula = async (matricula: string) => {
  const connection = await createConnection();
  const result = await connection.query(
    `SELECT * FROM usuarios WHERE matricula = '${matricula}';`
  );
  connection.close();
  return result[0];
};

export const createUsuario = async (
  email: string,
  nome: string,
  matricula: string,
  senha: string
) => {
  const connection = await createConnection();
  const result = await connection.query(
    `INSERT INTO usuarios (email, nome, matricula, senha) VALUES ('${email}', '${nome}', '${matricula}', '${senha}');`
  );
  connection.close();
  return result;
};
