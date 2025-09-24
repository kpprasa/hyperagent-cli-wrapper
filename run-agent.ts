// run-agent.ts
import { HyperAgent } from "@hyperbrowser/agent";
import { ChatOpenAI } from "@langchain/openai";

async function main() {
  const argv = process.argv.slice(2);
  if (argv.length === 0) {
    console.error(
      'Usage: npx ts-node run-agent.ts "Your task here" [--user-data-dir=/path] [--profile-directory="Profile 2"] [--starting-page=https://example.com]'
    );
    process.exit(1);
  }

  const launchArgs: string[] = [];
  const taskParts: string[] = [];
  let startingPage: string | undefined;

  for (const a of argv) {
    if (
      a.startsWith("--user-data-dir=") ||
      a.startsWith("--profile-directory=") ||
      a.startsWith("--proxy-server=")
    ) {
      launchArgs.push(a);
    } else if (a.startsWith("--starting-page=")) {
      startingPage = a.split("=", 2)[1];
    } else {
      taskParts.push(a);
    }
  }

  const task = taskParts.join(" ");

  console.log("Task is:", task);
  console.log("Arguments:", argv);
  if (startingPage) {
    console.log("Starting page:", startingPage);
  }

  const startTime = Date.now();
  console.log("Starting task execution...");

  const agent = new HyperAgent({
    browserProvider: "Local",
    // Pass Chrome flags through to Playwright launch (Local provider)
    localConfig: {
      args: ["--no-first-run", "--no-default-browser-check", ...launchArgs],
    },
    llm: new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-4o",
    }) as any,
    debug: !!process.env.DEBUG,
    ...(startingPage && { startingPage }),
  });

  try {
    const res = await agent.executeTask(task);
    const endTime = Date.now();
    const duration = endTime - startTime;

    console.log(res?.output ?? res);
    console.log(
      `\nTask completed in ${duration}ms (${(duration / 1000).toFixed(2)}s)`
    );
  } finally {
    await agent.closeAgent();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
