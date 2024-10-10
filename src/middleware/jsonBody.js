export function parseJson(event) {
  if (event.body) {
    try {
      const data = JSON.parse(event.body);
      event.body = data;
    } catch {}
  }
}
