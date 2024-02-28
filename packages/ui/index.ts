export * from "./components";
export * from "./screens";
export { default as StyledRegistry } from "./config/registry";
export { Providers } from "./config/providers";

export const fetcher = (url: string) =>
	fetch(url)
		.then((res) => res.json())
		.catch((err) => console.error(err));
