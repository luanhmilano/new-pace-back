/* eslint-disable @typescript-eslint/no-explicit-any */
import { ILoginDTO } from '../../DTO/LoginDTO';
import dotenv from 'dotenv';

export async function LoginSapiens(login: ILoginDTO): Promise<string> {
  dotenv.config();
  const CMD_Python = process.env.CMD_Python;
  // const requestLoginSapiens = new RequestLoginSapiens(login);
  // const result = await  requestLoginSapiens.handle()
  // console.log("", result)
  // return result
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { spawn } = require('child_process');

  // const childPython = spawn("python", ["--version"])
  const childPython = spawn(CMD_Python, [
    './python/loginPython.py',
    login.cpf,
    login.senha,
  ]);
  let dataPython: any;
  return new Promise(function (resolve, reject) {
    childPython.stdout.on('data', (data: any) => {
      dataPython = `${data}`.replace('\r\n', '');
    });
    childPython.stderr.on('data', (data: any) => {
      console.log(`${data} login`);
      reject(`${data}`);
    });
    childPython.on('close', () => {
      resolve(dataPython);
    });
  });
}
