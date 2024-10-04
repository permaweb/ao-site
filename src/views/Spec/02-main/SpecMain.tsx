import specsMarkdown from 'assets/specsMarkdown.md';
import Footer from 'components/Footer/Footer';

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
					<Footer />
				</div>
			</main>
		</>
	);
};

export default SpecMain;
