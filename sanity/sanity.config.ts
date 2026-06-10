// USM Content Studio. Interns: see README step 3 for deployment.
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'usm',
  title: 'USM Content Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_ME',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
