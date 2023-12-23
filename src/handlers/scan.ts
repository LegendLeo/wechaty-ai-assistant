import QRCode from "qrcode";
import { ScanStatus } from "wechaty";

export async function handleScan(qrcode: string, status: ScanStatus) {
  const url = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`;
  console.log(`Scan QR Code to login: ${status}\n${url}`);
  console.log(
    await QRCode.toString(qrcode, { type: "terminal", small: true })
  );
}
