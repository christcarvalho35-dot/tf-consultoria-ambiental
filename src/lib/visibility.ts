export function isPublished(item: { status: string }) {
  return item.status === "published";
}
