export class Crypt {
  static async hash(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  static async compare(password, hashedPassword){
    const hashedInputPassword = await this.hash(password)

    return hashedInputPassword === hashedPassword
  }
}
