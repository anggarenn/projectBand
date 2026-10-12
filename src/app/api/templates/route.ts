import { NextResponse } from "next/server";
import { getAllTemplates, getPreviewableTemplates } from "@/lib/db/templates";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const previewOnly = searchParams.get("preview_only") === "true";

  const templates = previewOnly ? getPreviewableTemplates() : getAllTemplates();

  return NextResponse.json({
    success: true,
    count: templates.length,
    previewOnly,
    data: templates,
  });
}
