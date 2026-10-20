// @ts-nocheck
import { InstallCommand } from "@default/ui/primitives/code-block";

export default function CodeBlockInstallCommand() {
  return (
    <div className="w-full max-w-lg">
      <InstallCommand registryUrl="@default-space/code-block-03" />
    </div>
  );
}
