declare module 'three-spritetext' {
  import { Sprite } from 'three';

  class SpriteText extends Sprite {
    constructor(text?: string, textHeight?: number, color?: string);
    
    text: string;
    textHeight: number;
    color: string;
    backgroundColor: string | boolean;
    padding: number;
    borderRadius: number;
    
    [key: string]: any;
  }
  
  export default SpriteText;
} 