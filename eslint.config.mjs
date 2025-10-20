import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // TypeScript + type-aware
  {
    ignores: ['dist', 'node_modules'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'], // tsc -b fonctionne déjà chez toi
      },
    },
    plugins: {
      // react plugins (optionnel si tu veux des règles React)
      // ils s’activent via des rules si besoin
    },
    rules: {
      // tes règles perso ici
    },
  }
);
