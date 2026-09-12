const crypto = require('crypto');

function hashValue(text) {
  return crypto
    .createHash('sha256')
    .update(text)
    .digest('hex');
}

function deriveKey(key) {
  return crypto
    .createHash('sha256')
    .update(key)
    .digest();
}

function encryptValue(text, key) {
  const algorithm = 'aes-256-cbc';
  const derivedKey = deriveKey(key);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(
    algorithm,
    derivedKey,
    iv
  );

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return `${iv.toString('hex')}:${encrypted}`;
}

function decryptValue(encrypted, key) {
  const algorithm = 'aes-256-cbc';
  const derivedKey = deriveKey(key);

  const [ivHex, encryptedText] = encrypted.split(':');

  const iv = Buffer.from(ivHex, 'hex');

  const decipher = crypto.createDecipheriv(
    algorithm,
    derivedKey,
    iv
  );

  let decrypted = decipher.update(
    encryptedText,
    'hex',
    'utf8'
  );

  decrypted += decipher.final('utf8');

  return decrypted;
}

module.exports = {
  hashValue,
  encryptValue,
  decryptValue
};