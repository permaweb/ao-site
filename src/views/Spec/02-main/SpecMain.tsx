import specsMarkdown from 'assets/specsMarkdown.md';

import './SpecMainStyles.css';

import MarkdownRenderer from '../../../components/MarkdownRenderer';

const SpecMain = () => {
	return (
		<>
			<main>
				<div className="specs-main-wrapper">
					<div className="text-content-wrapper">
						<MarkdownRenderer markdown={specsMarkdown} />
					</div>
				</div>
			</main>
		</>
	);
};

export default SpecMain;
