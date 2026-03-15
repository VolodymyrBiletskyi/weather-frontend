import type { Dispatch, SetStateAction } from "react";
import Hamburger from "../assets/hamburger.svg?react";
import { LightDarkToggle } from "./LightDarkToggle";

type MobileHeaderProps = {
  setIsSidePanelOpen: Dispatch<SetStateAction<boolean>>;
};

export function MobileHeader({ setIsSidePanelOpen }: MobileHeaderProps) {
  return (
    <div className="w-full h-16 p-4 bg-background sticky top-0 xs:hidden flex justify-end z-1001 gap-8">
      <LightDarkToggle />
      <button onClick={() => setIsSidePanelOpen(true)}>
        <Hamburger className="size-6 "></Hamburger>
      </button>
    </div>
  );
}
