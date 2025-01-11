import React, { useEffect, useState } from "react";

import type { FormField } from "./Field.type";

type Answer = {
  fieldId: string;
  answer: string;
};

export const AnswerForm = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [fields, setFields] = useState<FormField[]>([]);

  useEffect(() => {
    const customFields = localStorage.getItem("customFormFields");
    if (customFields) {
      setFields(JSON.parse(customFields));
    }
  }, [])

  // フィールドの回答を更新する
  const updateAnswer = (fieldId: string, value: string) => {
    setAnswers((prevAnswers) => {
      const existingAnswer = prevAnswers.find((answer) => answer.fieldId === fieldId);
      if (existingAnswer) {
        return prevAnswers.map((answer) =>
          answer.fieldId === fieldId ? { ...answer, answer: value } : answer
        );
      }
      return [...prevAnswers, { fieldId, answer: value }];
    });
  };

  // ラジオボタンの回答を更新する
  const updateRadioAnswer = (fieldId: string, value: string) => {
    updateAnswer(fieldId, value);
  };

  // フォーム送信
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("回答内容:", answers);
    // ここで回答データをサーバーに送信するなどの処理を行います。
  };

  if (fields.length === 0) {
    return <div>フォームが作成されていません</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-4">フォームに回答</h2>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="p-4 border rounded-md">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">{field.label}</label>
              {field.type === "text" && (
                <input
                  type="text"
                  value={answers.find((answer) => answer.fieldId === field.id)?.answer || ""}
                  onChange={(e) => updateAnswer(field.id, e.target.value)}
                  placeholder="回答を入力"
                  className="block w-full mt-2 p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              )}
              {field.type === "textarea" && (
                <textarea
                  value={answers.find((answer) => answer.fieldId === field.id)?.answer || ""}
                  onChange={(e) => updateAnswer(field.id, e.target.value)}
                  placeholder="回答を入力"
                  className="block w-full mt-2 p-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              )}
              {field.type === "radio" && (
                <div>
                  {field.options?.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        type="radio"
                        id={`${field.id}-${option}`}
                        name={field.id}
                        value={option}
                        checked={answers.find((answer) => answer.fieldId === field.id)?.answer === option}
                        onChange={(e) => updateRadioAnswer(field.id, e.target.value)}
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <label htmlFor={`${field.id}-${option}`} className="ml-2 text-sm">{option}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        回答を送信
      </button>
    </form>
  );
};
