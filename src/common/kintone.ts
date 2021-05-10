/**
 * このスクリプトが動作している環境がモバイルであればtrueを返します
 * @param eventType 発生したイベントタイプ
 * @returns モバイルであればtrue
 */
export const isMobile = (eventType?: string) => (eventType ? eventType.includes('mobile.') : !kintone.app.getId());

/**
 * 実行されているデバイス毎のグローバル変数を返却します
 * @param eventType 発生したイベントタイプ
 * @returns グローバル変数
 */
export const getApp = (eventType?: string) => (isMobile(eventType) ? kintone.mobile.app : kintone.app);

export const getAppId = () => getApp().getId();
export const getRecordId = () => getApp().record.getId();

/**
 * 現在表示しているレコード情報を返却します
 * - デバイス毎に最適な情報を返します
 * @returns レコード情報
 */
export const getCurrentRecord = () => getApp().record.get();

/**
 * 現在表示しているレコード情報へデータを反映します
 * @param record レコード情報
 */
export const setCurrentRecord = (record: { record: any }) => getApp().record.set(record);

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getChangeEvents = <T>(events: ('create' | 'edit' | 'index.edit')[], fields: (keyof T)[]) =>
  events.reduce<string[]>(
    (accu, event) => [...accu, ...fields.map((field) => `app.record.${event}.change.${field}`)],
    []
  );

/**
 * ヘッダー部分のHTML要素を返却します
 * - デバイス毎に最適な情報を返します
 * - レコード一覧以外で実行した場合はnullが返ります
 * @returns ヘッダー部分のHTML要素
 */
export const getHeaderSpace = (eventType: string) => {
  if (isMobile(eventType)) {
    kintone.mobile.app.getHeaderSpaceElement();
  } else if (!~eventType.indexOf('index')) {
    return kintone.app.record.getHeaderMenuSpaceElement();
  }
  return kintone.app.getHeaderMenuSpaceElement();
};

export const getSpaceElement = (spaceId: string) => getApp().record.getSpaceElement(spaceId);

/**
 * 現在の検索条件を返却します
 * @returns 検索条件
 */
export const getQuery = () => getApp().getQuery();

/**
 * 現在の検索条件のうち、絞り込み情報の部分のみを返却します
 * @returns 検索条件の絞り込み情報
 */
export const getQueryCondition = () => getApp().getQueryCondition();

export const setFieldShown = <T = any>(code: keyof T, visible: boolean) =>
  getApp().record.setFieldShown(String(code), visible);

export const getHeaderSpaceWrapper = (id: string) => {
  const span = document.createElement('span');
  span.style.padding = '0 8px';
  span.id = id;

  return span;
};
