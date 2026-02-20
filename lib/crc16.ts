/**
 * Calculates CRC16-CCITT (0xFFFF) checksum for QRIS.
 * Polynomial: 0x1021
 * Initial Value: 0xFFFF
 */
export function crc16ccitt(text: string): string {
  let crc = 0xFFFF;
  for (let c = 0; c < text.length; c++) {
    crc ^= text.charCodeAt(c) << 8;
    for (let i = 0; i < 8; i++) {
      if (crc & 0x8000) {
        crc = (crc << 1) ^ 0x1021;
      } else {
        crc = crc << 1;
      }
    }
  }
  // Ensure it's 4 chars long, uppercase
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}
