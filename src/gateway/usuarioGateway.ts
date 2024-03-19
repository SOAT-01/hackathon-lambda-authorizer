import { createConnection } from "@/external/postgres/createConnection";

export const getClienteByCpf = async (cpf: string) => {
  const connection = await createConnection();
  const result = await connection.query(
    `SELECT * FROM clientes WHERE cpf = '${cpf}';`
  );
  connection.close();
  return result;
};

export const createUser = async (
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
