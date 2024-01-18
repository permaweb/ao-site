import MarkdownRenderer from '../../../components/MarkdownRenderer';
import './SpecMainStyles.css';
import specsMarkdown from '../../../assets/specsMarkdown.md?raw';

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
