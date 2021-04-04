import { fabric } from 'fabric';

export type State = {
  canvas: fabric.Canvas | null;
  width: number;
  color: string;
  fieldCode: string;
};

export type Action =
  | {
      type: 'init';
      canvas: fabric.Canvas;
    }
  | {
      type: 'download';
    }
  | { type: 'upload' }
  | {
      type: 'update';
      color?: string;
      width?: number;
    }
  | {
      type: 'clear';
    };
