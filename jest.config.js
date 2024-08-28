module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'], // Para carregar as variáveis de ambiente
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'], // Para configurar o ambiente de teste
};
