export function isProtectedRoute(pathname: string): boolean {
  const protectedPatterns = [/^\/dashboard(\/.*)?$/];
  return protectedPatterns.some((pattern) => pattern.test(pathname));
}
