import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HistoryPanel } from "@/components/HistoryPanel";
import { EthicalNotice } from "@/components/EthicalNotice";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — WorkflowAI Productivity Suite" },
      {
        name: "description",
        content:
          "AI-powered workplace productivity assistant. Generate emails, summarize meetings, plan tasks, research topics and chat.",
      },
    ],
  }),
  component: Dashboard,
});

const features = [
  {
    title: "Smart Email Generator",
    description: "Draft formal, friendly or persuasive emails in seconds.",
    icon: Mail,
    url: "/email",
  },
  {
    title: "Meeting Summarizer",
    description: "Turn long notes into key points, decisions and action items.",
    icon: FileText,
    url: "/meetings",
  },
  {
    title: "AI Task Planner",
    description: "Prioritized schedule and time-optimization tips.",
    icon: ListChecks,
    url: "/tasks",
  },
  {
    title: "Research Assistant",
    description: "Distill articles into insights and recommendations.",
    icon: Search,
    url: "/research",
  },
  {
    title: "AI Chatbot",
    description: "Ask anything workplace-related, conversationally.",
    icon: MessageSquare,
    url: "/chat",
  },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      <section
        className="relative overflow-hidden rounded-2xl border border-border p-8 md:p-12"
        style={{ background: "var(--gradient-subtle)" }}
      >
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl" style={{ background: "var(--gradient-primary)" }} />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AI-powered workplace productivity
          </div>
          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Work smarter,
            <br />
            not harder.
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            A suite of AI tools to automate the writing, planning and research that drains your day.
            Built for professionals and students.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/email">
                Get started <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/chat">Try the chatbot</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Link key={f.url} to={f.url}>
              <Card className="group h-full p-6 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]">
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg shadow-sm"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <f.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.description}</p>
                <div className="mt-4 flex items-center text-xs font-medium text-primary">
                  Open
                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        <HistoryPanel />
        <EthicalNotice />
      </section>
    </div>
  );
}
