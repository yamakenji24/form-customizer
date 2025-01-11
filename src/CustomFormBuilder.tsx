import { useState } from "react";

export const CustomFormBuilder: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([]);

  // フィールドを追加する
  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type,
      label: "",
      options: type === "radio" ? [""] : undefined,
    };
    setFields([...fields, newField]);
  };

  // フィールドを更新する
  const updateField = (id: string, updatedField: Partial<FormField>) => {
    setFields(fields.map((field) => (field.id === id ? { ...field, ...updatedField } : field)));
  };

  // フィールドを削除する
  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // ラジオボタンの選択肢を更新する
  const updateOption = (fieldId: string, optionIndex: number, value: string) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options?.map((option, index) =>
                index === optionIndex ? value : option
              ),
            }
          : field
      )
    );
  };

  // ラジオボタンの選択肢を追加する
  const addOption = (fieldId: string) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? { ...field, options: [...(field.options || []), ""] }
          : field
      )
    );
  };

  // ラジオボタンの選択肢を削除する
  const removeOption = (fieldId: string, optionIndex: number) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options?.filter((_, index) => index !== optionIndex),
            }
          : field
      )
    );
  };

  return (
    <div className="flex p-4 border rounded-md">
      {/* 左側のボタンエリア */}
      <div className="w-1/4 space-y-2">
        <button
          type="button"
          onClick={() => addField("text")}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          テキストフィールドを追加
        </button>
        <button
          type="button"
          onClick={() => addField("textarea")}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          テキストエリアを追加
        </button>
        <button
          type="button"
          onClick={() => addField("radio")}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          ラジオボタンを追加
        </button>
      </div>

      {/* 右側のフィールド表示エリア */}
      <div className="w-3/4 pl-4 space-y-4">
        <h2 className="text-lg font-semibold mb-4">カスタムフォーム</h2>
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="p-4 border rounded-md">
              <div className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  placeholder="ラベルを入力"
                  value={field.label}
                  onChange={(e) => updateField(field.id, { label: e.target.value })}
                  className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 mr-4"
                />
                <button
                  type="button"
                  onClick={() => removeField(field.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  削除
                </button>
              </div>
              {field.type === "text" && (
                <input
                  type="text"
                  disabled
                  placeholder="テキストフィールド（プレビュー）"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              )}
              {field.type === "textarea" && (
                <textarea
                  disabled
                  placeholder="テキストエリア（プレビュー）"
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              )}
              {field.type === "radio" && (
                <div>
                  {field.options?.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="radio"
                        disabled
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updateOption(field.id, index, e.target.value)
                        }
                        className="ml-2 flex-grow border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(field.id, index)}
                        className="ml-2 text-red-500 hover:text-red-700"
                        disabled={field.options.length === 1}
                      >
                        －
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(field.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ＋ オプションを追加
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
