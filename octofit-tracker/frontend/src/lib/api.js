const getBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export async function fetchCollection(name) {
  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/${name}`);

  if (!response.ok) {
    throw new Error(`Failed to load ${name}`);
  }

  const payload = await response.json();

  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && Array.isArray(payload.items)) {
    return payload.items;
  }

  if (payload && payload.results && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
}
