export function getContextPrompt(code: string) {
  return `You are senior javascript developer.

You need to improve the code to make it more efficient and readable.

The code is:

\`\`\`javascript
  ${code}
\`\`\``;
}
