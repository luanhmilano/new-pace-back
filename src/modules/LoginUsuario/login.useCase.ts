import { ILoginDTO } from '../../DTO/LoginDTO';
import { LoginSapiens } from '../../pythonRequest/loginSapiens';

export class LoginUseCase {
  async execute(data: ILoginDTO): Promise<string> {
    console.log(`login inicializado:`);
    console.log(await LoginSapiens(data));
    return await LoginSapiens(data);
  }
}
