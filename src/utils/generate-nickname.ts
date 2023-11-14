export function generateNickname(email: string): string {
  const username = email.split("@")[0]; // Get the username from the email
  const randomString = Math.random().toString(36).substring(2, 8); // Generate a random string
  const result = `${username}${randomString}`; // Combine the username and random string
  return result;
}
