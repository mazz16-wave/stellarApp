import {
  requestAccess,
  getPublicKey,
  isAllowed,
  isConnected,
} from "@stellar/freighter-api";

export async function connectFreighter() {
  await requestAccess(); // THIS triggers popup
  const publicKey = await getPublicKey();
  return publicKey;
}

export async function getConnectedWallet() {
  const allowed = await isAllowed();
  const connected = await isConnected();

  if (allowed.isAllowed && connected.isConnected) {
    const pub = await getPublicKey();
    return pub;
  }

  return null;
}
