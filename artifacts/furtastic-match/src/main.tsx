import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initPostHog } from "./lib/analytics";

// Initialise PostHog before React renders so the first pageview is captured.
// No-ops if VITE_POSTHOG_KEY is not set in the environment.
initPostHog();

createRoot(document.getElementById("root")!).render(<App />);
