let pk = document.querySelector("#priv-key");
let wa = document.querySelector("#wallet-addr");
let val = document.querySelector("#btc-val");
let btn = document.querySelector("#generate-btn");

function genPubPriv() {
  let elliptic;
  elliptic =
    elliptic ||
    require("https://rawgit.com/indutny/elliptic/v6.4.1/dist/elliptic.min.js");
  const ec = new elliptic.ec("secp256k1");
  const keyPair = ec.genKeyPair();
  const privKey = keyPair.getPrivate();
  const pubKey = keyPair.getPublic();
  return { privKey, pubKey };
}
function generateKey() {
  let { privKey, pubKey } = genPubPriv();
  let unCompressedPubKey = pubKey.encode("hex");

  let x = "";

  for (let i = 2; i < 66; i++) {
    x += unCompressedPubKey[i];
  }

  let lastByte = unCompressedPubKey[128] + unCompressedPubKey[129];
  lastByte = parseInt(lastByte, 16);
  if (lastByte & 1) unCompressedPubKey = "03" + x;
  else {
    unCompressedPubKey = "02" + x;
  }
  let encryptedPubKey = CryptoJS.RIPEMD160(
    CryptoJS.SHA256(CryptoJS.enc.Hex.parse(unCompressedPubKey))
  );

  let mainNetEncPubKey = "00";
  mainNetEncPubKey += encryptedPubKey;
  let checkSum = CryptoJS.SHA256(
    CryptoJS.SHA256(CryptoJS.enc.Hex.parse(mainNetEncPubKey))
  ).toString(CryptoJS.enc.HEX);
  let fourBytes = "";
  for (let i = 0; i < 8; i++) fourBytes += checkSum[i];
  let nonEncodedWalletAddr = mainNetEncPubKey + fourBytes;

  var s = nonEncodedWalletAddr;
  var result = [];

  for (var i = 0; i < s.length; i += 2) {
    result.push(parseInt(s.substring(i, i + 2), 16));
  }
  result = Uint8Array.from(result);
  let walletAddr = Base58.encode(result);
  return { privKey, walletAddr };
}
async function updateBal(walletAddr) {
  fetch("https://blockchain.info/balance?active=" + walletAddr)
    .then((res) => res.json())
    .then((data) => {
      let bal = data[walletAddr].final_balance + " ";
      val.innerHTML = bal;
    });
}
function gen() {
  let { privKey, walletAddr } = generateKey();
  pk.value = privKey;
  wa.value = walletAddr;
  val.innerHTML = "...";
  updateBal(walletAddr);
}
btn.addEventListener("click", (e) => {
  gen();
});
