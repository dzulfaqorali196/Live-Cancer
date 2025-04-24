export async function hashPassword(
  password: string,
  salt?: string
): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode((salt ?? "") + password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function comparePassword(
  inputPassword: string,
  storedHash: string,
  salt?: string
): Promise<boolean> {
  const inputHash = await hashPassword(inputPassword, salt);
  return inputHash === storedHash;
}

export function generateSalt(): string {
  return crypto.randomUUID();
}
