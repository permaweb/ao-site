import Typewriter from './Typewriter';

const MultiLanguageDetail = () => {
  const languages = {
    chinese: [
      `我们的使命是使网络空间对每个人更加自由和公平。`,

      `Forward Research 是 Arweave 生态系统的领先研究和开发孵化器。`,

      `我们支持那些致力于在 Arweave 上创造全新类别的网络服务、并能够证明尊重用户权利的最优秀的开发者和创始人。`,

      `我们提供一个专为帮助您专注于最重要的事情而定制的环境：从零开始构建，达到市场适应性。`,
    ],
    polish: [
      `Naszą misją jest uczynienie Internetu bardziej otwartym i równym dla każdego.`,

      `Forward Research to wiodący inkubator badawczo-rozwojowy w ekosystemu Arweave.`,

      `Wspieramy najlepszych twórców i startupowców skupionych na tworzeniu zupełnie nowej klasy usług internetowych zbudowanych na Arweave, które w pełni respektują prawa użytkowników.`,

      `Zapewniamy optymalne warunki, abyś mógł niezakłócenie rozwijać swój pomysł, od zera aż po dostosowanie do wymagań rynku.`,
    ],
    hindi: [
      `हमारा मिशन है साइबरस्पेस को सभी के लिए स्वतंत्र और निष्पक्ष बनाना।`,

      `फॉरवर्ड रिसर्च अरवीव एकोसिस्टम के लिए एक लीडिंग रिसर्च और डेवलपमेंट इनक्यूबेटर हैं,`,

      `हम उन बेहतरीन बिल्डर्स और नए वेब सेवाओं के निर्माण पर ध्यान केंद्रित करने वाले फाउंडर्स को इनक्यूबेट करते है जो यूज़र्स के वेब अधिकारों का सम्मान करें।`,

      `हम एक ऐसा माहौल प्रदान करते हैं जो आपका ध्यान केवल निर्माण करने में मदद करता है।शून्य से मार्केट फिट तक।`,
    ],
    german: [
      `Wir haben es uns zur Aufgabe gemacht, den Cyberspace für jeden freier und gerechter zu gestalten.`,

      `Forward Research ist ein führendes Forschungs- und Entwicklungsinkubator für das Arweave-Ökosystem.`,

      `Wir unterstützen die talentiertesten Entwickler und Gründer, die daran arbeiten, eine völlig neue Klasse von Webdiensten auf Arweave zu schaffen, die nachweislich die Rechte der Benutzer achten.`,

      `Wir bieten Ihnen eine Umgebung, die speziell darauf zugeschnitten ist, Ihnen zu ermöglichen, sich auf das Wesentliche zu konzentrieren: das Entwickeln und Bauen, von der ersten Idee bis zur Marktreife.`,
    ],
    spanish: [
      `Tenemos la misión de hacer que el ciberespacio sea más libre y justo para todos.`,

      `Forward Research es una incubadora líder en investigación y desarrollo para el ecosistema Arweave.`,

      `Apoyamos a los mejores desarrolladores y fundadores enfocados en crear en Arweave una nueva clase de servicios web que respete los derechos de los usuarios de forma demostrable.`,

      `Ofrecemos un entorno diseñado para ayudarle a centrarse en lo más importante: construir, desde cero hasta el éxito de mercado.`,
    ],
  };

  return (
    <div className="multi-language-text">
      <Typewriter languageSets={languages} speed={5} pauseDuration={3000} />
    </div>
  );
};

export default MultiLanguageDetail;
