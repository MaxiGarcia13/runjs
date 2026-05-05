export function getUrlParams() {
  return new URLSearchParams(window.location.search);
}

export function getUrlParam(key: string) {
  return getUrlParams().get(key);
}

export function setUrlParams(params: Record<string, string>) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  window.history.pushState({}, '', url.toString());
}

export function removeUrlParam(key: string) {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  window.history.pushState({}, '', url.toString());
}

export function encodeUrlParam(value: string) {
  const bytes = new TextEncoder().encode(value);
  const binary = Array.from(bytes, byte => String.fromCharCode(byte)).join('');
  return btoa(binary);
}

export function decodeUrlParam(value: string) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
