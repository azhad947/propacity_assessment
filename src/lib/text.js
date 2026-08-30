export function splitLines(text, wordsPerLine = 7) {
  const words = text.split(" ");
  const lines = [];
  for (let i = 0; i < words.length; i += wordsPerLine)
    lines.push(words.slice(i, i + wordsPerLine).join(" "));
  return lines;
}
