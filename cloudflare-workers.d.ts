// The invitation does not use the optional D1 scaffold, but this declaration
// lets the static GitHub Pages build type-check that unused starter module.
declare module "cloudflare:workers" {
  export const env: { DB?: unknown };
}
