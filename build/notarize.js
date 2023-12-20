/*eslint-env node */
const { notarize } = require("electron-notarize");

exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;
  if (electronPlatformName !== "darwin") {
    return;
  }

  if (process.env.CSC_IDENTITY_AUTO_DISCOVERY === "false") {
    console.log("Skipped signing and notarizing");
    return;
  }

  if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD) {
    console.log("Notarize credentials missing, skipping");
    return;
  }

  console.log("Notarizing...");

  const appName = context.packager.appInfo.productFilename;

  return await notarize({
    tool: "notarytool",
    teamId: process.env.APPLE_TEAM_ID,
    appBundleId: "net.webrecorder.archiveweb.page",
    appPath: `${appOutDir}/${appName}.app`,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
  });
};
