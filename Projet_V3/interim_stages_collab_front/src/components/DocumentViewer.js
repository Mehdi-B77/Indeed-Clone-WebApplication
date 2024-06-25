import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export function DocumentViewer({ url }) {
	const docs = [{ uri: url }];

	return (
		<DocViewer
			documents={docs}
			initialActiveDocument={docs[0]}
			pluginRenderers={DocViewerRenderers}
		/>
	);
}
