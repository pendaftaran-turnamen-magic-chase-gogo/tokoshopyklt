import { crc16ccitt } from './crc16';

// Default Static QRIS from the transcript
export const DEFAULT_STATIC_QRIS = "00020101021126570011ID.DANA.WWW011893600915380003780002098000378000303UMI51440014ID.CO.QRIS.WWW0215ID10243620012490303UMI5204549953033605802ID5910Warr2 Shop6015Kab. Bandung Ba6105402936304BF4C";

/**
 * Generates a Dynamic QRIS string by injecting the transaction amount
 * and recalculating the CRC16 checksum.
 * 
 * @param staticQris The base static QRIS string
 * @param amount The transaction amount (e.g., 15000)
 * @returns The dynamic QRIS string
 */
export function generateDynamicQris(staticQris: string, amount: number): string {
  // 1. Remove the CRC16 (last 4 chars)
  // We assume the input is a valid QRIS string which ends with CRC
  // But we will reconstruct it anyway.
  
  // Parse TLV
  const tlv: { [key: string]: string } = {};
  let i = 0;
  
  // Safety check: if string is too short, return as is
  if (staticQris.length < 10) return staticQris;

  try {
    while (i < staticQris.length) {
      const tag = staticQris.substring(i, i + 2);
      const lenStr = staticQris.substring(i + 2, i + 4);
      const len = parseInt(lenStr, 10);
      
      if (isNaN(len)) break;
      
      // If we are at the end (CRC), usually tag '63'
      if (tag === '63') {
        break;
      }
      
      const value = staticQris.substring(i + 4, i + 4 + len);
      tlv[tag] = value;
      i += 4 + len;
    }
  } catch (e) {
    console.error("Error parsing QRIS:", e);
    return staticQris; // Fallback
  }

  // 3. Update/Add Tag 54 (Amount)
  // Amount must be string, no currency symbol, no separators.
  const amountStr = amount.toString();
  tlv['54'] = amountStr;

  // 4. Reconstruct
  let newQris = "";
  const sortedTags = Object.keys(tlv).sort((a, b) => parseInt(a) - parseInt(b));
  
  for (const tag of sortedTags) {
    const value = tlv[tag];
    const len = value.length.toString().padStart(2, '0');
    newQris += tag + len + value;
  }

  // 5. Append Tag 63 (CRC) ID and Length
  newQris += "6304";

  // 6. Calculate CRC16-CCITT (0xFFFF)
  const crcValue = crc16ccitt(newQris);

  return newQris + crcValue;
}
