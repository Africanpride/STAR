import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Fetching all articles
    console.log("Fetching all articles");
    const articles = await prisma.article.findMany({
      include: { author: true },
      orderBy: { publishedDate: "desc" },
    });

    // Return the articles as a JSON response
    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
