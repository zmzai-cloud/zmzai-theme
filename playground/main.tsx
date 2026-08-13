import { createRoot } from "react-dom/client";
import { Playground } from "./Playground";
import "../src/tokens/theme.css";
import "../src/tokens/fonts.css";
import "tailwindcss";

createRoot(document.getElementById("root")!).render(<Playground />);
