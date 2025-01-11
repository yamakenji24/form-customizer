// フィールドの型定義
export type FieldType = "text" | "textarea" | "radio";

export type FormField = {
  id: string;
  type: FieldType;
  label: string;
  options?: string[]; // ラジオボタンの場合の選択肢
};