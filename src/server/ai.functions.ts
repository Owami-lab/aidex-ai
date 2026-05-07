import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  task: z.enum(["email", "summarize", "plan", "research", "chat"]),
  payload: z.record(z.string(), z.any()),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant", "system"]), content: z.string() }))
    .optional(),
});

function buildMessages(task: string, payload: any, history?: any[]) {
  let system = "";
  let user = "";
  switch (task) {
    case "email": {
      system =
        "You are an expert business communication assistant. Write polished, well-structured emails. Always include a subject line on the first line as 'Subject: ...' followed by a blank line, then the email body with greeting, body paragraphs, and closing.";
      user = `Write an email.\n\nPurpose: ${payload.purpose}\nRecipient type: ${payload.recipient}\nTone: ${payload.tone}\n\nReturn only the email.`;
      break;
    }
    case "summarize": {
      system =
        "You are a meeting notes specialist. Summarize meeting notes into a clear markdown document with the sections: ## Key Points, ## Decisions, ## Action Items (with owners if mentioned), ## Deadlines. Use bullet lists. Be concise.";
      user = `Summarize these meeting notes:\n\n${payload.notes}`;
      break;
    }
    case "plan": {
      system =
        "You are a productivity coach. Generate a daily schedule from a task list. Output markdown with: ## Prioritized Tasks (numbered), ## Suggested Daily Schedule (time-blocked table or list), ## Productivity Tips, ## Time Optimization. Be realistic and concrete.";
      user = `Tasks and priorities:\n\n${payload.tasks}\n\nWorkday context: ${payload.context || "Standard 9-5 workday."}`;
      break;
    }
    case "research": {
      system =
        "You are a research assistant. Given a topic or article, produce markdown with: ## Simplified Explanation, ## Key Insights (bullets), ## Recommendations, ## Further Reading Suggestions. Be accurate and neutral.";
      user = `Topic / Article:\n\n${payload.topic}`;
      break;
    }
    case "chat": {
      system =
        "You are a friendly, concise workplace productivity assistant. Help with workplace, career, and productivity questions. Use markdown formatting when helpful.";
      user = payload.message;
      break;
    }
  }
  const msgs: any[] = [{ role: "system", content: system }];
  if (history && task === "chat") msgs.push(...history);
  msgs.push({ role: "user", content: user });
  return msgs;
}

export const runAI = createServerFn({ method: "POST" })
  .inputValidator((d) => inputSchema.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured");

    const messages = buildMessages(data.task, data.payload, data.history);

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) throw new Error("Rate limit reached. Please try again in a moment.");
      if (res.status === 402) throw new Error("AI credits exhausted. Add credits in workspace settings.");
      throw new Error(`AI error (${res.status}): ${text.slice(0, 200)}`);
    }

    const json = await res.json();
    const content: string = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });