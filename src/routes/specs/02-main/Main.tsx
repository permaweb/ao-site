import MarkdownRenderer from '../../../components/MarkdownRenderer';
import './MainStyles.css';
import specsMarkdown from '../../../assets/specsMarkdown.md?raw';

const Main = () => {
  return (
    <>
      <main>
        <div className="main-wrapper">
          <div className="text-content-wrapper">
            <MarkdownRenderer markdown={specsMarkdown} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
