import { FlatCompat } from '@eslint/eslintrc'
 import tailwind from "eslint-plugin-tailwindcss";

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
})
 
const eslintConfig = [
  ...tailwind.configs["flat/recommended"],
  ...compat.config({
    
    extends: ['next/core-web-vitals', 'next/typescript'],
    rules: {
       "@typescript-eslint/no-unused-vars": [
        "error",
        { 
          "args": "all",
          "argsIgnorePattern": "^_",
          "caughtErrors": "all",
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
          "varsIgnorePattern": "^_",
          "ignoreRestSiblings": true}
       ],
       "@next/next/no-img-element": "off",
    }
  }),
]
 
export default eslintConfig
