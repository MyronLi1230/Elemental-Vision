// Manually declare process for the frontend context since @types/node is not installed
// and we are using process.env.API_KEY in the Gemini service.
// 
// Note: process is already defined in the compilation context (likely via implicit types or bundler shims),
// so manual declaration is removed to prevent conflicts. API_KEY usage is handled in the service.
