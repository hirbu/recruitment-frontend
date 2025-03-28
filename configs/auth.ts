export const AUTH_CONFIG = {
  // API endpoints
  endpoints: {
    login: "/login",
    logout: "/logout",
    me: "/me",
  },

  protectedRoutes: ["/add-posting", "/my-postings", "/account/logout"],

  authRoutes: ["/account/login"],

  cookie: {
    name: "PHPSESSID",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      path: "/",
    },
  },

  redirects: {
    afterLogin: "/my-postings",
    afterLogout: "/",
    onAuthError: "/account/login",
  },
} as const;
