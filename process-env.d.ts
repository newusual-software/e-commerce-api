declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB: string;
    }
  }
}