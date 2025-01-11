import { useState } from "react";
import { CustomFormBuilder } from "./CustomFormBuilder"
import { AnswerForm } from "./AnswerForm";

function App() {
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");


  return (
    <>
      <div>
        <button onClick={() => setActiveTab("edit")}>編集モード</button>
        <button onClick={() => setActiveTab("preview")}>プレビューモード</button>
      </div>

      {activeTab === "edit" && (
        <CustomFormBuilder />
      )}

      {activeTab === "preview" && (
        <div>
          <h2>プレビュー</h2>
          <AnswerForm />
        </div>
      )}
    </>
  )
}

export default App
