export type PackageManager = 'npm' | 'yarn';
export declare function detectPackageManager(): PackageManager;
export declare function getInstallCommand(packageName: string, packageManager: PackageManager): string;
