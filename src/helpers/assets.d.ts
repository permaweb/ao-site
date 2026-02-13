// Asset declarations
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.md' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.riv' {
  const content: any;
  export default content;
}

declare module 'remark-code-blocks';

// Styled components theme
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    scheme: 'dark' | 'light';
    colors: any;
    typography: any;
  }
}

// Global window extensions
declare global {
  interface Window {
    arweaveWallet: any;
    ethereum: any;
    solana: any;
  }
}

export {};
