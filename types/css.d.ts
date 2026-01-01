/**
 * Type declarations for CSS imports
 * Prevents TypeScript errors when importing CSS files
 */

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '@mantine/core/styles.css';
declare module '@mantine/charts/styles.css';
