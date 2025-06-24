declare module 'react-live' {
  import * as React from 'react';

  export interface LiveProviderProps {
    code?: string;
    scope?: Record<string, any>;
    noInline?: boolean;
    transformCode?: (code: string) => string;
    language?: string;
    disabled?: boolean;
    children?: React.ReactNode;
  }

  export interface LiveEditorProps {
    onChange?: (code: string) => void;
    code?: string;
    disabled?: boolean;
    language?: string;
    style?: React.CSSProperties;
    className?: string;
  }

  export interface LiveErrorProps {
    className?: string;
  }

  export interface LivePreviewProps {
    className?: string;
  }

  export class LiveProvider extends React.Component<LiveProviderProps> {}
  export class LiveEditor extends React.Component<LiveEditorProps> {}
  export class LiveError extends React.Component<LiveErrorProps> {}
  export class LivePreview extends React.Component<LivePreviewProps> {}
} 