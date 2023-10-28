/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-secrets/no-secrets */

const fs = require("fs/promises");
const path = require("path");

const envExport = `
/* eslint-disable no-secrets/no-secrets */

/**
 * This should be an Environment variable, or Vault secret.
 */
export default {
  USERNAME: "",
  BASE_API_URL:
    "",
};
`;

const filePath = path.join(__dirname, "../api/infrastructure/environment.ts");

async function replaceFileContent() {
  try {
    await fs.writeFile(filePath, envExport, "utf-8");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

replaceFileContent();
