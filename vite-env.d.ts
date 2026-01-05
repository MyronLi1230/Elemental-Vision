// Replaces broken reference to vite/client
declare var process: {
  env: {
    API_KEY: string;
    [key: string]: string | undefined;
  }
}
