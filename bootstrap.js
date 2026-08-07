/* eslint-env browser */
/* global Zotero */

/**
 * DOI Column for Zotero
 *
 * Zotero exposes DOI as a real item field but does not offer it in the
 * column picker for the items list. This plugin adds that column.
 *
 * Bootstrapped plugin — no restart required to enable or disable.
 */

const PLUGIN_ID = "doi-column@anfang886.github.io";
const DATA_KEY = "doi";

let registeredDataKey = null;

function log(msg) {
  Zotero.debug("[doi-column] " + msg);
}

/**
 * Strip the parts of a DOI string that add noise to a narrow column.
 * Turns "https://doi.org/10.1007/x" and "doi:10.1007/x" into "10.1007/x".
 */
function normalizeDOI(raw) {
  return String(raw)
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, "")
    .replace(/^doi:\s*/i, "")
    .trim();
}

/**
 * Read a DOI from an item.
 *
 * Zotero 8 moved DOI onto nearly every item type, so getField() is the
 * normal path. Two cases still need the Extra fallback:
 *   - libraries not yet migrated off the old "DOI: 10.x/y" convention
 *   - users still on Zotero 7, where only a few types have the field
 */
function getDOI(item) {
  try {
    if (!item || typeof item.getField !== "function") {
      return "";
    }
    if (typeof item.isRegularItem === "function" && !item.isRegularItem()) {
      return "";
    }

    let doi = "";
    try {
      doi = item.getField("DOI") || "";
    } catch (e) {
      // Field is not valid for this item type on this Zotero version.
      doi = "";
    }
    if (doi) {
      return normalizeDOI(doi);
    }

    let extra = "";
    try {
      extra = item.getField("extra") || "";
    } catch (e) {
      return "";
    }
    if (!extra) {
      return "";
    }
    for (const line of extra.split(/\r?\n/)) {
      const match = line.match(/^\s*DOI\s*:\s*(.+?)\s*$/i);
      if (match) {
        return normalizeDOI(match[1]);
      }
    }
    return "";
  } catch (e) {
    Zotero.logError(e);
    return "";
  }
}

async function registerColumn() {
  const manager = Zotero.ItemTreeManager;
  if (!manager) {
    throw new Error(
      "Zotero.ItemTreeManager is unavailable — Zotero 7.0 or later is required."
    );
  }

  const options = {
    dataKey: DATA_KEY,
    label: "DOI",
    pluginID: PLUGIN_ID,
    // Remember the user's width, visibility and sort direction across restarts.
    zoteroPersist: ["width", "hidden", "sortDirection"],
    dataProvider: (item, _dataKey) => getDOI(item),
  };

  // registerColumn() is the current API. Early Zotero 7 betas shipped the
  // plural registerColumns(); accept either so the plugin does not hard-fail
  // on an out-of-date client.
  if (typeof manager.registerColumn === "function") {
    registeredDataKey = await manager.registerColumn(options);
  } else if (typeof manager.registerColumns === "function") {
    registeredDataKey = await manager.registerColumns(options);
  } else {
    throw new Error("No usable column registration API found on ItemTreeManager.");
  }

  log("registered column as " + registeredDataKey);
}

async function unregisterColumn() {
  if (!registeredDataKey) {
    return;
  }
  const manager = Zotero.ItemTreeManager;
  try {
    if (manager && typeof manager.unregisterColumn === "function") {
      await manager.unregisterColumn(registeredDataKey);
    } else if (manager && typeof manager.unregisterColumns === "function") {
      await manager.unregisterColumns(registeredDataKey);
    }
    log("unregistered column " + registeredDataKey);
  } catch (e) {
    Zotero.logError(e);
  } finally {
    registeredDataKey = null;
  }
}

/* ---------------------------------------------------------------- *
 * Plugin lifecycle hooks called by Zotero
 * ---------------------------------------------------------------- */

function install() {}

async function startup({ id, version, rootURI }) {
  try {
    await Zotero.initializationPromise;
    await registerColumn();
  } catch (e) {
    Zotero.logError(e);
  }
}

async function shutdown() {
  await unregisterColumn();
}

function uninstall() {}

// Columns are registered globally rather than per-window, so nothing to do
// here. Kept as explicit no-ops to document the decision.
function onMainWindowLoad({ window }) {}

function onMainWindowUnload({ window }) {}
