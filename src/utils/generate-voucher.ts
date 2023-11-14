export default function generateVoucherCode(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let voucherCode = "";
  for (let i = 0; i < length; i++) {
    voucherCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return voucherCode;
}
