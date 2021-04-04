import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { fabric } from 'fabric';

export const uploadCanvas = async (fieldCode: string, canvas: fabric.Canvas) => {
  const blob = await getBlob(canvas);

  console.log({ blob });

  if (!blob) {
    console.error('blobオブジェクトが取得できませんでした');
  }

  const client = new KintoneRestAPIClient();
  const { fileKey } = await client.file.uploadFile({ file: { name: 'handwritten.png', data: blob } });

  const app = kintone.app.getId() || kintone.mobile.app.getId()!;
  const id = kintone.app.record.getId() || kintone.mobile.app.record.getId()!;

  if (!app || !id) {
    console.error('レコードを更新できませんでした', { fileKey });
  }

  await client.record.updateRecord({
    app,
    id,
    record: {
      [fieldCode]: { value: [{ fileKey }] },
    },
  });

  location.reload();
};

const getBlob = (canvas: fabric.Canvas) => {
  return new Promise<Blob | null>((resolve) => {
    canvas.getElement().toBlob((blob) => {
      resolve(blob);
    });
  });
};
