/** @format */

export type AppConfig = {
  apiPrefix: string;
  authenticatedEntryPath: string;
  // unAuthenticatedEntryPath: string;
  // tourPath: string;
  locale: string;
  enableMock: boolean;
};

const appConfig: AppConfig = {
  apiPrefix: "http://localhost:8000/api",
  authenticatedEntryPath: "/",
  // unAuthenticatedEntryPath: "/sign-in",
  // tourPath: "/app/ankit/dashboard",
  locale: "en",
  enableMock: true,
};

export default appConfig;
