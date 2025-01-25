import { BECMILibrary } from "./types";

declare global {
  interface Window {
    BECMI: BECMILibrary;
  }
}
