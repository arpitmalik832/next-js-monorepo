/**
 * Common paths for the project build.
 * @file The file is saved as `build_utils/config/commonPaths.js`.
 */
import path from 'path';

const PROJECT_ROOT = path.resolve();

const projectRootPath = PROJECT_ROOT;
const entryPath = path.join(PROJECT_ROOT, 'src', 'app', 'layout.jsx');
const outputPath = path.join(PROJECT_ROOT, 'dist');

export { projectRootPath, entryPath, outputPath };
