import { access, cp, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const outputDirectory = fileURLToPath(new URL('../out/', import.meta.url));
const portugueseDirectory = path.join(outputDirectory, 'pt');

// GitHub Pages cannot run next-intl's middleware to map /about to /pt/about.
// Publish the default locale at the root, including Next's navigation payloads.
// Keep /pt files for existing links and internal Next.js route references.
await access(path.join(portugueseDirectory, 'index.html'));
for (const entry of await readdir(portugueseDirectory)) {
  await cp(
    path.join(portugueseDirectory, entry),
    path.join(outputDirectory, entry),
    { recursive: true, force: true },
  );
}

console.log('Published Portuguese pages at / and English pages at /en/.');
