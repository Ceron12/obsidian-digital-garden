import { Notice } from "obsidian";
import { TCompilerStep } from "./GardenPageCompiler";

export class LeafletCompiler {
	constructor() {}

	compile: TCompilerStep = (file) => async (text) => {
		const replacedText = text;
		const leafletRegex = /```leaflet\s(.+?)```/gms;
		const matches = text.matchAll(leafletRegex);

		console.log("testFile", file);

		if (!matches) {
			return text;
		}

		for (const leafletBlock of matches) {
			try {
				console.log("leafletBlock", leafletBlock);
				const markerTagRegex = /markerTag: (.*)/gms;

				console.log(
					"markerTag",
					leafletBlock[0].matchAll(markerTagRegex),
				);
				// TODO Collect all notes with leaflet marker tag and generate list of markers with there location
			} catch (e) {
				new Notice(
					"Unable to render leaflet map. Please contact Ceron.",
				);
			}
		}

		return replacedText;
	};
}
