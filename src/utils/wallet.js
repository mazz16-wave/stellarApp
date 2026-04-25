import { getAddress, isAllowed, isConnected, requestAccess } from "@stellar/freighter-api";

function parseFreighterError(error) {
  if (!error) return "Unknown Freighter error.";
  if (typeof error === "string") return error;

  return error.message || error.name || JSON.stringify(error);
}

export async function connectFreighter() {
  const connection = await isConnected();
  if (connection.error) {
    throw new Error(`Freighter connection check failed: ${parseFreighterError(connection.error)}`);
  }

  if (!connection.isConnected) {
    throw new Error("Freighter extension not detected. Install/enable Freighter and refresh the page.");
  }

  const access = await requestAccess();
  if (access.error) {
    throw new Error(`Access was not granted: ${parseFreighterError(access.error)}`);
  }

  if (!access.address) {
    throw new Error("Freighter returned an empty address.");
  }

  return access.address;
}

export async function getConnectedWallet() {
  const connection = await isConnected();
  if (connection.error || !connection.isConnected) return null;

  const allowed = await isAllowed();
  if (allowed.error || !allowed.isAllowed) return null;

  const wallet = await getAddress();
  if (wallet.error || !wallet.address) return null;

  return wallet.address;
}
