"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInstallCommand = exports.detectPackageManager = void 0;
function detectPackageManager() {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent && userAgent.includes('yarn/')) {
        return 'yarn';
    }
    return 'npm';
}
exports.detectPackageManager = detectPackageManager;
function getInstallCommand(packageName, packageManager) {
    switch (packageManager) {
        case 'npm':
            return `npm install ${packageName}`;
        case 'yarn':
            return `yarn add ${packageName}`;
    }
}
exports.getInstallCommand = getInstallCommand;
