// import { api } from "../convex/_generated/api";
// Since we don't have the generated API, we'll mock the hook types or use `any` for now
// to prevent build errors while keeping the structure correct.
// In a real setup, `npx convex dev` generates these.

export const apiMock = {
  transactions: {
    create: "transactions:create",
    getStatus: "transactions:getStatus",
    updateStatus: "transactions:updateStatus",
  }
};
