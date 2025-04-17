import "./index.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReactProvider } from "react-redux";

import App from "./components/App/App";
import { addLibrary } from "./engine/Engine";
import { LibraryContext } from "./hooks/LibraryProvider";
import { store } from "./state/store";

const app = document.getElementById("app");
if (!app) throw new Error(`#app not found`);

const library = addLibrary(store);
library.engine.createRandomParty();

const root = createRoot(app);
root.render(
  <StrictMode>
    <ReactProvider store={store}>
      <LibraryContext.Provider value={library}>
        <App />
      </LibraryContext.Provider>
    </ReactProvider>
  </StrictMode>,
);
