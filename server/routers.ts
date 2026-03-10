import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createStudentSignup, createOrgSignup } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  signup: router({
    student: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "請輸入姓名"),
          email: z.string().email("請輸入有效的電郵地址"),
          school: z.string().min(1, "請輸入就讀院校"),
          phone: z.string().min(1, "請輸入聯絡電話"),
        })
      )
      .mutation(async ({ input }) => {
        await createStudentSignup(input);

        // Send notification to owner
        await notifyOwner({
          title: "新學生報名 - HKIUSL 2026",
          content: `姓名：${input.name}\n電郵：${input.email}\n院校：${input.school}\n電話：${input.phone}`,
        }).catch((err) => {
          console.warn("[Signup] Failed to notify owner:", err);
        });

        return { success: true, message: "報名成功！我們將盡快與您聯繫。" };
      }),

    org: publicProcedure
      .input(
        z.object({
          orgName: z.string().min(1, "請輸入機構名稱"),
          email: z.string().email("請輸入有效的電郵地址"),
          contactPhone: z.string().min(1, "請輸入聯絡人電話"),
        })
      )
      .mutation(async ({ input }) => {
        await createOrgSignup(input);

        // Send notification to owner
        await notifyOwner({
          title: "新機構申請 - HKIUSL 2026",
          content: `機構名稱：${input.orgName}\n電郵：${input.email}\n聯絡電話：${input.contactPhone}`,
        }).catch((err) => {
          console.warn("[Signup] Failed to notify owner:", err);
        });

        return { success: true, message: "申請成功！我們將盡快與您聯繫。" };
      }),
  }),
});

export type AppRouter = typeof appRouter;
