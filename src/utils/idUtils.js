/**
 * Simple obfuscation using Base64 to hide actual IDs in URLs.
 * Not for security, just for aesthetics/hiding internal IDs.
 */

const SALT = "slijk-prod-";

export const encryptId = (id) => {
  if (!id) return "";
  try {
    return btoa(`${SALT}${id}`);
  } catch (e) {
    console.warn("Failed to encrypt ID", e);
    return id;
  }
};

export const decryptId = (encryptedId) => {
  if (!encryptedId) return "";
  try {
    const decoded = atob(encryptedId);
    if (decoded.startsWith(SALT)) {
      return decoded.replace(SALT, "");
    }
    // Fallback: if it doesn't have our salt, maybe it's not encrypted or old link
    // Try to return as is if it looks like a number, or just return it.
    // However, if we strictly enforce encryption, we might want to return null if invalid.
    // For safety during migration, let's assume if it fails prefix check, it might be raw ID (if numeric)
    // checking if raw ID is number-like (assuming our IDs are numbers or simple strings)
    if (!isNaN(decoded)) return decoded;

    // If decoding worked but salt missing, maybe someone manually typed it?
    // Just return decoded for resilience or original if decoding resulted in garbage?
    // Let's fallback to returning the input if decoding seems unrelated.
    return encryptedId;
  } catch (e) {
    // If it's not valid base64, it's likely a raw ID
    return encryptedId;
  }
};
