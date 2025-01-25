import { useState } from "react";

import { ModuleId } from "../../types";
import GameDisplay from "../GameDisplay/GameDisplay";
import ModuleSelector from "../ModuleSelector/ModuleSelector";

export default function App() {
  const [module, setModule] = useState<ModuleId>();

  return (
    <div>
      {module ? (
        <GameDisplay moduleId={module} />
      ) : (
        <>
          <h1>Pick yr module</h1>
          <ModuleSelector onClick={setModule} />
        </>
      )}
    </div>
  );
}
