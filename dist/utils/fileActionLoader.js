"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadRoutesFromFileSystem = void 0;
/**
 * Loads actions from the file system
 */
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const import_1 = require("@brillout/import");
const Action_1 = __importDefault(require("../classes/Action"));
const Page_1 = __importDefault(require("../classes/Page"));
const fs = fs_1.default.promises;
async function loadFolder(currentDirectory, logger) {
    var _a;
    const absPath = path_1.default.resolve(currentDirectory);
    const dirName = path_1.default.basename(absPath);
    const files = await fs.readdir(absPath);
    let router = new Page_1.default({
        name: slugToName(dirName),
    });
    for (const file of files) {
        const fullPath = path_1.default.resolve(currentDirectory, file);
        if (file.endsWith('.d.ts')) {
            continue;
        }
        const ext = path_1.default.extname(file);
        const slug = path_1.default.basename(file, ext || undefined);
        const attemptLoadRoute = (fileExports) => {
            if (slug === 'index') {
                if ('default' in fileExports) {
                    let defaultExport = fileExports.default;
                    if ('default' in defaultExport) {
                        defaultExport = defaultExport.default;
                    }
                    if (defaultExport instanceof Page_1.default) {
                        Object.assign(defaultExport.routes, router.routes);
                        router = defaultExport;
                    }
                    else {
                        logger.warn(`Default export of ${fullPath} is not a Page class instance, skipping.`);
                    }
                }
            }
            else {
                if ('default' in fileExports) {
                    let defaultExport = fileExports.default;
                    if ('default' in defaultExport) {
                        defaultExport = defaultExport.default;
                    }
                    if (defaultExport instanceof Page_1.default ||
                        defaultExport instanceof Action_1.default) {
                        router.routes[slug] = defaultExport;
                    }
                    else {
                        logger.warn(`Default export of ${fullPath} is not a Page or Action class instance, skipping.`);
                    }
                }
            }
        };
        if ((await fs.stat(fullPath)).isDirectory()) {
            const group = await loadFolder(path_1.default.join(currentDirectory, slug), logger);
            router.routes[slug] = group;
        }
        else if (ext === '.ts' || ext === '.js' || ext === '.mjs') {
            try {
                attemptLoadRoute(await (_a = fullPath, Promise.resolve().then(() => __importStar(require(_a)))));
            }
            catch (err) {
                logger.warn(`Failed loading file at ${fullPath} as CommonJS, trying again as module.`, err);
                try {
                    attemptLoadRoute(await (0, import_1.import_)(fullPath));
                }
                catch (err) {
                    logger.warn(`Failed loading file at ${fullPath}, skipping.`, err);
                }
            }
        }
    }
    return router;
}
async function loadRoutesFromFileSystem(dirPath, logger) {
    const { routes } = await loadFolder(dirPath, logger);
    return routes;
}
exports.loadRoutesFromFileSystem = loadRoutesFromFileSystem;
function ucfirst(s) {
    return s.charAt(0).toUpperCase() + s.substring(1);
}
function slugToName(slug) {
    if (slug.includes('/')) {
        slug = slug.substring(slug.lastIndexOf('/') + 1);
    }
    if (slug === slug.toUpperCase()) {
        slug = slug.toLowerCase();
    }
    // Don't split on multiple caps in a row like URL
    const matches = slug.match(/[A-Z][A-Z]+/g);
    if (matches && matches.length) {
        for (const match of matches) {
            const toReplace = match.substring(0, match.length - 1);
            slug = slug.replace(toReplace, ` ${toReplace.toLowerCase()} `);
        }
    }
    return ucfirst(slug
        .replace(/[-_.]+/g, ' ')
        // Split on camelCase and whitespace
        .split(/((?!^)(?=[A-Z]))|\s+/g)
        .filter(Boolean)
        .map(s => s.trim())
        .filter(s => s.length)
        .map(s => s.toLowerCase())
        .join(' '));
}
