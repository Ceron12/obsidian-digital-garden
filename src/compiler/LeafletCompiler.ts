import { Notice } from "obsidian";
import { TCompilerStep } from "./GardenPageCompiler";
import { getAPI } from "obsidian-dataview";
import { PublishFile } from "src/publishFile/PublishFile";

export class LeafletCompiler {
	constructor() {}

	compile: TCompilerStep = (file) => async (text) => {
		// let replacedText = '```leaflet\n';
		let replacedText = text;
		const leafletRegex = /```leaflet\s(.+?)```/gms;
		const matches = text.matchAll(leafletRegex);

		if (!matches) {
			return text;
		}

		for (const leafletBlock of matches) {
			let compiledLeaflet = "";

			try {
				// const markerTagRegex = /markerTag: (.*)\\n/gm;
				const segments = leafletBlock[1].split("\n");

				const markerTagContainer = segments.find((x) =>
					x.startsWith("markerTag: "),
				);

				if (markerTagContainer) {
					const markerTag = markerTagContainer.split(" ")[1];

					const markerFiles = await this.getFilesWithTag(
						file,
						markerTag,
					);

					compiledLeaflet =
						leafletBlock[1]
							.replace(markerTagContainer, "")
							.trimEnd() + "\nmarker:\n";

					for (const markerFile of markerFiles["values"]) {
						if (markerFile[1] != null) {
							compiledLeaflet +=
								"    - default," +
								markerFile[1][0] +
								"," +
								markerFile[1][1] +
								",[[" +
								markerFile[0]["path"].replace(".md", "") +
								"]]," +
								markerFile[2] +
								"\n";
							// compiledLeaflet += 'marker: default,' + markerFile[1][0] + ',' + markerFile[1][1] + ',' + markerFile[0]['path'] + ',,,\n';
							// marker: default,7.785888671875,12.82603813559322,Redbrands,test,,
						}
					}
				}
			} catch (e) {
				new Notice(
					"Unable to render leaflet map. Please contact Ceron.",
				);
			}

			replacedText = replacedText.replace(
				leafletBlock[1],
				compiledLeaflet,
			);

			// replacedText += leafletBlock[1];
		}

		return replacedText;
	};

	getFilesWithTag(file: PublishFile, tag: string) {
		const dvApi = getAPI();

		return dvApi.tryQuery(
			"TABLE WITHOUT ID file.link, FM.location, file.name FROM #" +
				tag +
				" FLATTEN file.frontmatter as FM",
			file.getPath(),
		);
	}
}
