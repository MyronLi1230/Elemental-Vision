// Fix: Augment NodeJS.ProcessEnv to include API_KEY instead of redeclaring global process variable
declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string;
  }
}
