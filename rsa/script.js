let publicKey = null;
let privateKey = null;

// Función para generar las claves RSA
function generateKeys() {
  const p = 17;
  const q = 11;
  const phi = (p - 1) * (q - 1);
  const e = 7;
  const d = modInverse(e, phi);

  publicKey = { n: p * q, e };
  privateKey = d;

  document.getElementById("publicKey").textContent = `(${publicKey.n}, ${publicKey.e})`;
  document.getElementById("privateKey").textContent = `(${publicKey.n},${privateKey})`;
}

// Función para cifrar un mensaje
function encrypt() {
  if (!publicKey) {
    alert("Por favor, genera las claves primero.");
    return;
  }

  const message = document.getElementById("messageToEncrypt").value;
  document.getElementById("messageToEncryptDisplay").textContent = message;

  const encryptedMessage = rsaEncrypt(message, publicKey);
  document.getElementById("encryptedMessage").textContent = encryptedMessage;
}

// Función para descifrar un mensaje
function decrypt() {
  if (!privateKey) {
    alert("Por favor, genera las claves primero.");
    return;
  }

  const encryptedMessage = document.getElementById("messageToDecrypt").value;
  document.getElementById("messageToDecryptDisplay").textContent = encryptedMessage;

  const decryptedMessage = rsaDecrypt(encryptedMessage, privateKey, publicKey.n);
  document.getElementById("decryptedMessage").textContent = decryptedMessage;
}

// Función para calcular (base ^ exponent) % modulus
function modPow(base, exponent, modulus) {
  if (exponent === 0) return 1;
  let result = 1;
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % 2 === 1) {
      result = (result * base) % modulus;
    }
    base = (base * base) % modulus;
    exponent = Math.floor(exponent / 2);
  }
  return result;
}

// Función para calcular el inverso modular de 'a' en 'm'
function modInverse(a, m) {
  for (let x = 1; x < m; x++) {
    if ((a * x) % m === 1) return x;
  }
  return 1;
}

// Función para cifrar un mensaje utilizando RSA
function rsaEncrypt(message, publicKey) {
  const asciiValues = message.split("").map(charToAscii);
  const encryptedValues = asciiValues.map((charCode) => {
    return modPow(charCode, publicKey.e, publicKey.n);
  });
  return encryptedValues.join(" ");
}

// Función para descifrar un mensaje utilizando RSA
function rsaDecrypt(encryptedMessage, privateKey, modulus) {
const encryptedValues = encryptedMessage.split(" ").map(Number);
const decryptedValues = encryptedValues.map((value) => {
  return modPow(Math.floor(value), privateKey, modulus);
});
return decryptedValues.map(asciiToChar).join("");
}


// Función para convertir un carácter en su código ASCII
function charToAscii(char) {
  return char.charCodeAt(0);
}

// Función para convertir un código ASCII en un carácter
function asciiToChar(ascii) {
  return String.fromCharCode(ascii);
}