import { selectAllModules } from "../../state/selectors";
import { useAppSelector } from "../../state/store";
import { ModuleId } from "../../types";

interface ModuleSelectorProps {
  onClick(moduleId: ModuleId): void;
}

export default function ModuleSelector({ onClick }: ModuleSelectorProps) {
  const modules = useAppSelector(selectAllModules);

  return (
    <div>
      {modules.map((module) => (
        <button key={module.id} onClick={() => onClick(module.id)}>
          {module.name}
        </button>
      ))}
    </div>
  );
}
