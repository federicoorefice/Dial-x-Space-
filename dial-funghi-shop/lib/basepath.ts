/** Prefix baked at build time via NEXT_PUBLIC_BASE_PATH env var.
 *  In dev: ""  (no prefix)
 *  In production GitHub Pages build: "/Dial-x-Space-"
 *  Usage: src={`${BASE_PATH}/images/logo.png`}
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
