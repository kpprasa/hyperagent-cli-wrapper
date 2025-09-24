# HyperAgent CLI Wrapper

A CLI wrapper around the user_profile_directory fork of HyperAgent (https://github.com/kpprasa/HyperAgent-BrowserProfile) for executing web automation tasks with natural language commands.

## Features

- **Task Execution**: Execute natural language tasks on web pages
- **Custom Starting Page**: Specify a starting URL for your automation tasks
- **Execution Timing**: Built-in timing to measure task completion duration
- **Chrome Configuration**: Support for custom Chrome profiles and user data directories

## Prerequisites

- Node.js 22.19.0 (managed via Volta)
- OpenAI API key

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set your OpenAI API key:
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```

## Usage

Basic usage:

```bash
npx ts-node run-agent.ts "Your task description here"
```

With a custom starting page:

```bash
npx ts-node run-agent.ts "Navigate to the menu and find pizza options" --starting-page=https://example.com
```

With custom Chrome profile:

```bash
npx ts-node run-agent.ts "Add items to cart" --user-data-dir=/path/to/chrome/data --profile-directory="Profile 2"
```

### Command Line Options

- `--starting-page=<url>` - Specify the initial page to load
- `--user-data-dir=<path>` - Set Chrome user data directory
- `--profile-directory=<name>` - Set Chrome profile directory
- `--proxy-server=<url>` - Configure proxy server

### Environment Variables

- `OPENAI_API_KEY` - Required for LLM functionality
- `DEBUG=true` - Enable debug mode for detailed logging

## Examples

```bash
# Navigate to a website and find information
npx ts-node run-agent.ts "Find Italian restaurants in my area" --starting-page=https://doordash.com

# E-commerce automation
npx ts-node run-agent.ts "Add a large pepperoni pizza to my cart" --starting-page=https://dominos.com

# Search and browse
npx ts-node run-agent.ts "Search for laptops under $1000" --starting-page=https://amazon.com

# Social media automation
npx ts-node run-agent.ts "Check my notifications" --starting-page=https://twitter.com
```

## Output

The agent provides:

- Task confirmation and arguments display
- Real-time execution feedback
- Task completion time in milliseconds and seconds
- Structured output from the automation process
