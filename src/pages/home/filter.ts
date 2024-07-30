export function filterContent(content: unknown, query: string) {
  if (!content) return [];
  // @ts-expect-error -- mock data
  const filteredContent = content.filter(
    // @ts-expect-error -- mock data
    (content) =>
      content["title"].toLowerCase().includes(query.toLowerCase()) ||
      content["city"].toLowerCase().includes(query.toLowerCase()) ||
      content["tags"].includes(query.toLowerCase()),
  );
  return filteredContent;
}
