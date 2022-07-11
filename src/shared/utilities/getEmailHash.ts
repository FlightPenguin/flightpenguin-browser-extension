interface GetEmailHashInput {
  email: string;
}

export const getEmailHash = async ({ email }: GetEmailHashInput): Promise<string> => {
  const encodedEmail = new TextEncoder().encode(email);
  const buffer = await crypto.subtle.digest("SHA-256", encodedEmail);
  return Array.from(new Uint8Array(buffer))
    .map((bytes) => bytes.toString(16).padStart(2, "0"))
    .join("");
};
