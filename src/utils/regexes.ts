export const FRONTMATTER_REGEX = /^\s*?---\n([\s\S]*?)\n---/g;
export const BLOCKREF_REGEX = /(\^\w+(\n|$))/g;

export const CODE_FENCE_REGEX = /`(.*?)`/g;

export const CODEBLOCK_REGEX = /```(?!leaflet)(?!$)[\s\S]*?```/gm; // Ignore Leaflet codeblocks

export const EXCALIDRAW_REGEX = /:\[\[(\d*?,\d*?)\],.*?\]\]/g;

export const TRANSCLUDED_SVG_REGEX =
	/!\[\[(.*?)(\.(svg))\|(.*?)\]\]|!\[\[(.*?)(\.(svg))\]\]/g;
