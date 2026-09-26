/**
 * Laravel API のベース URL。frontend/.env.local の NEXT_PUBLIC_API_BASE_URL から読む。
 * NEXT_PUBLIC_ が付いているので、ビルド時にブラウザ向けのコードへ埋め込まれる。
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/** Laravel API を呼び、JSON を返す。path は `/api/...` の形で渡す。 */
export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL が設定されていません。frontend/.env.local を確認してください。',
    );
  }

  const headers = new Headers(init?.headers);
  headers.set('Accept', 'application/json');

  const response = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  if (!response.ok) {
    throw new Error(`API エラー: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}
