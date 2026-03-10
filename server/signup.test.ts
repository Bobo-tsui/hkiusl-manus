import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createStudentSignup: vi.fn().mockResolvedValue(true),
  createOrgSignup: vi.fn().mockResolvedValue(true),
}));

// Mock the notification function
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("signup.student", () => {
  it("accepts valid student signup", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.signup.student({
      name: "陳同學",
      email: "test@example.com",
      school: "都會大學",
      phone: "98765432",
    });

    expect(result).toEqual({
      success: true,
      message: "報名成功！我們將盡快與您聯繫。",
    });
  });

  it("rejects empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.signup.student({
        name: "",
        email: "test@example.com",
        school: "都會大學",
        phone: "98765432",
      })
    ).rejects.toThrow();
  });

  it("rejects invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.signup.student({
        name: "陳同學",
        email: "not-an-email",
        school: "都會大學",
        phone: "98765432",
      })
    ).rejects.toThrow();
  });
});

describe("signup.org", () => {
  it("accepts valid org signup", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.signup.org({
      orgName: "測試機構",
      email: "org@example.com",
      contactPhone: "98765432",
    });

    expect(result).toEqual({
      success: true,
      message: "申請成功！我們將盡快與您聯繫。",
    });
  });

  it("rejects empty org name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.signup.org({
        orgName: "",
        email: "org@example.com",
        contactPhone: "98765432",
      })
    ).rejects.toThrow();
  });
});
