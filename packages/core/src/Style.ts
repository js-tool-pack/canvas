import type { DataType } from 'csstype';
// import type { StandardProperties, DataType } from 'csstype';

// type CSS = StandardProperties<string | number>;
export interface Style extends Position, Border {
  backgroundColor?: DataType.Color | string;
  height: number;
  zIndex: number;
  width: number;
}

interface Position {
  position?: 'absolute' | 'relative' | 'static';
  bottom?: number;
  right?: number;
  left?: number;
  top?: number;
}

interface Border {
  borderStyle?: DataType.LineStyle;
  borderColor?: DataType.Color;
  borderRadius?: number;
  borderWidth?: number;
}
