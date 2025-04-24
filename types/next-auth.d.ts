import "next-auth";

declare module "next-auth" {
  interface User {
    imageUrl?: string;
    fullName?: string | null;
    emailAddresses: Array<{ emailAddress: string }>;
  }

  interface Session {
    user: User;
  }
}
