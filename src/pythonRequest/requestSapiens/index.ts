import { requestSapiens } from './requestSapiens';

export async function RequestSapiens(
  coockie: string,
  operation: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  const response = await requestSapiens(coockie, operation);
  return response[0].result.records;
}
