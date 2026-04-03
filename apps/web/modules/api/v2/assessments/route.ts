import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getAssessmentConfig } from "@/modules/assessment/lib/assessment-config.service";
import {
  getAssessmentAggregateStats,
  getAssessmentResult,
  getAssessmentResultByToken,
  getAssessmentResults,
} from "@/modules/assessment/lib/assessment-result.service";

const ZGetResultsQuery = z.object({
  surveyId: z.string().cuid2(),
  limit: z.coerce.number().int().positive().optional().default(50),
  offset: z.coerce.number().int().min(0).optional().default(0),
});

const ZGetResultByTokenQuery = z.object({
  accessToken: z.string().min(1),
});

/**
 * GET /api/v2/assessments
 *
 * Query params:
 * - action=config&surveyId=xxx         -> Get assessment config
 * - action=results&surveyId=xxx        -> List results
 * - action=result&accessToken=xxx      -> Get single result by access token (public)
 * - action=aggregate&surveyId=xxx      -> Get aggregate stats
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");

    if (action === "config") {
      const surveyId = searchParams.get("surveyId");
      if (!surveyId) {
        return NextResponse.json({ error: "surveyId required" }, { status: 400 });
      }
      const config = await getAssessmentConfig(surveyId);
      if (!config) {
        return NextResponse.json({ error: "Assessment config not found" }, { status: 404 });
      }
      return NextResponse.json({ data: config });
    }

    if (action === "results") {
      const parsed = ZGetResultsQuery.safeParse({
        surveyId: searchParams.get("surveyId"),
        limit: searchParams.get("limit"),
        offset: searchParams.get("offset"),
      });
      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
      }
      const config = await getAssessmentConfig(parsed.data.surveyId);
      if (!config) {
        return NextResponse.json({ error: "Assessment config not found" }, { status: 404 });
      }
      const results = await getAssessmentResults(config.id, {
        limit: parsed.data.limit,
        offset: parsed.data.offset,
      });
      return NextResponse.json({ data: results });
    }

    if (action === "result") {
      const parsed = ZGetResultByTokenQuery.safeParse({
        accessToken: searchParams.get("accessToken"),
      });
      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
      }
      const result = await getAssessmentResultByToken(parsed.data.accessToken);
      if (!result) {
        return NextResponse.json({ error: "Result not found" }, { status: 404 });
      }
      return NextResponse.json({ data: result });
    }

    if (action === "aggregate") {
      const surveyId = searchParams.get("surveyId");
      if (!surveyId) {
        return NextResponse.json({ error: "surveyId required" }, { status: 400 });
      }
      const config = await getAssessmentConfig(surveyId);
      if (!config) {
        return NextResponse.json({ error: "Assessment config not found" }, { status: 404 });
      }
      const stats = await getAssessmentAggregateStats(config);
      return NextResponse.json({ data: stats });
    }

    return NextResponse.json({ error: "Unknown action. Use: config, results, result, aggregate" }, { status: 400 });
  } catch (error) {
    console.error("Assessment API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
