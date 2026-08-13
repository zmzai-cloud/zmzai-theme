/**
 * @zmzai/theme — zmzai 全品牌设计系统
 *
 * Usage in your app's globals.css:
 *   @import "tailwindcss";
 *   @import "@zmzai/theme/tokens";
 *   @import "@zmzai/theme/fonts";
 *
 * Usage in components:
 *   import { Button, Card, Logo, Wordmark } from "@zmzai/theme";
 */

// Components
export * from "./components";

// Brand assets
export * from "./brand";

// Utils
export { cn } from "./utils/cn";
export * as motionPresets from "./utils/motion";
