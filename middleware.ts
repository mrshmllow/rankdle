export { default } from "next-auth/middleware";

export const config = { matcher: ["/submit", "/approve", "/api/approve"] };
