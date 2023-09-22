import React, { useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

const MultiLanguageDetail = () => {
  const languages = {
    chinese: `🇨🇳 作为 arweave 生态系统领先的研发孵化器，我们的使命是让网络空间对每个人来说更加自由和公平。
    前瞻性研究孵化了最优秀的构建者和创始人，专注于在 arweave 上创建全新的网络服务类别，并尊重用户权利。
    我们为每一位参与者提供量身定制的环境，并帮助您专注于最重要的事情：共建社区！
    您有什么突破性的想法吗？ 我们可以帮助您将其变为现实，从零起步直到适应市场。
`,
    polish: `🇵🇱 jako czołowy inkubator badawczo-rozwojowy w ekosystemie arweave, dążymy do stworzenia internetu bardziej otwartego i równego dla każdego.
    forward research wspiera najlepszych twórców i startupowców skupionych na tworzeniu zupełnie nowej klasy usług internetowych zbudowanych na arweave, które w pełni respektują prawa użytkowników.
    zapewniamy warunki, aby pomóc ci w pełni skoncentrować się na tym, co najważniejsze: realizacji twojego pomysłu. 
    masz przełomowy koncept? wspomożemy cię w jego realizacji, od zera aż do dostosowania go do wymagań rynku.`,
    hindi: `🇮🇳 हम अरवीव एकोसिस्टम के लिए एक लीडिंग रिसर्च और डेवलपमेंट इनक्यूबेटर हैं, और हमारा मिशन है कि साइबरस्पेस को सभी के लिए स्वतंत्र और निष्पक्ष बनाना।
    फॉरवर्ड रिसर्च उन बेहतरीन बिल्डर्स और नए वेब सेवाओं के निर्माण पर ध्यान केंद्रित करने वाले फाउंडर्स को इनक्यूबेट करता है जो यूज़र्स के वेब अधिकारों का सम्मान करें।
    हम एक ऐसा माहौल प्रदान करते हैं जो आपका ध्यान केवल निर्माण करने में मदद करता है। क्या आपके पास कोई नया और अभूतपूर्व विचार है? हम आपकी मदद कर सकते हैं।
    `,
  };
  return (
    <div className="multi-language-container">
      <span className="multi-language-text">
        {' '}
        <TypeAnimation
          preRenderFirstString={true}
          omitDeletionAnimation={true}
          sequence={[
            languages.chinese,
            3000,
            languages.polish,
            3000,
            languages.hindi,
            3000,
          ]}
          speed={50}
          repeat={Infinity}
        />
      </span>
    </div>
  );
};

export default MultiLanguageDetail;
