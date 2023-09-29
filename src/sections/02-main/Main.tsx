import './MainStyles.css';
import alex from '../../assets/alex.svg';
import dataOS from '../../assets/dataOS.svg';
import facts from '../../assets/facts.svg';
import fair from '../../assets/fair.svg';
import stamp from '../../assets/stamp.svg';
import ucm from '../../assets/ucm.svg';
import udl from '../../assets/udl.svg';
import weavers from '../../assets/weavers.svg';
import ao from '../../assets/ao.svg';

import emailEnvelope from '../../assets/emailEnvelope.svg';
import MultiLanguageDetail from '../../globalHooks/MultiLanguageDetail';
import useParallaxScroll from '../../globalHooks/SlowScroll';
import arrowRight from '../../assets/arrowRight.svg';

const Main = () => {
  const projects = [
    {
      logo: alex,
      header: 'Alex.',
      content:
        'Alex. is a decentralized archival platform. Inspired by the great library of alexandria, the mission of Alex. is to preserve important historical artifacts for the enrichment of all people. Institutions and creators are incentivized to publicly archive digital content by allowing anyone to become sponsors of their digital artifacts.',
      link: 'http://alex.arweave.dev',
    },
    {
      logo: dataOS,
      header: 'Data OS',
      content:
        "Data OS is an operating system on top of arweave, aiming to build a versatile data & AI backbone. It offers clear insights into Arweave's data, and aids protocols in crafting user-focused, data-centric applications. Data os enables a new generation of tools, including large language models and infrastructure tooling.",
      link: 'https://www.dataos.so/',
    },
    {
      logo: facts,
      header: 'Facts Protocol',
      content:
        'That allows anyone to attach a truthiness market to any piece of data in any app on the permaweb. These markets incentivize participants to trade on their perception of how true and relevant a piece of data is, and gives users access to helpful market-derived assessments of the trustworthiness of data, anywhere on the web.',
      link: 'n/a',
    },
    {
      logo: fair,
      header: 'Fair Protocol',
      content:
        'An open source ai marketplace that decentralizes AI model inference using Arweave. Anyone can create, monetize, and use open source AI models directly on Fair, without being subject to the terms of a huge tech corporation.',
      link: 'http://fair.arweave.dev',
    },
    {
      logo: stamp,
      header: 'Stamp Protocol',
      content:
        'Stamps are the universal and composable “like” button of Arweave’s permaweb. Stamps enable users to show their support and preferences to creators, and can be used to curate and rank content across an unlimited number of applications.',
      link: 'https://stamps.arweave.dev/#/en/main',
    },
    {
      logo: ucm,
      header: 'Universal Content Marketplace',
      content:
        'UCM is a protocol that enables the trustless exchange of any atomic asset on the permaweb, implemented as a warp smart contract. It goes beyond just nfts, allowing for the exchange of images, music, videos, papers, names, components, and even entire web apps.',
      link: 'n/a',
    },
    {
      logo: udl,
      header: 'Universal Data License',
      content:
        'A standard framework for digital content monetization on the permaweb, UDL allows creators to set their own terms for the usage of content that they upload to Arweave, and for developers to permissionlessly license that data in their apps. The license provides programmable parameters for all aspects of monetization.',
      link: 'https://arwiki.wiki/#/en/Universal-Data-License-How-to-use-it',
    },
    {
      logo: weavers,
      header: 'Weavers',
      content:
        'The most exciting community of devs and creatives in the arweave ecosystem. Weavers creates a wide range of events and initiatives that empower community members to contribute, connect, and have their voices heard.',
      link: 'n/a',
    },
    {
      logo: ao,
      header: 'ao',
      content: `An actor oriented network that powers unlimited concurrent smart contracts on Arweave. ao comprehensively solves the problem of horizontal scalability for smart contracts, using the smartweave paradigm and concurrent message relaying.`,
      link: 'n/a',
    },
  ];

  projects.sort((a, b) => {
    if (a.header.toLowerCase() < b.header.toLowerCase()) {
      return -1;
    }
    if (a.header.toLowerCase() > b.header.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  useParallaxScroll();
  return (
    <main>
      <div className="main-wrapper">
        <div className="landing">
          <div className="landing-top">
            <div className="landing-left">
              <p>
                <sup>1</sup> We are on a mission to make cyberspace <u>freer</u>{' '}
                and <u>fairer</u> for <u>everyone</u>.
              </p>
              <p>
                <sup>2</sup> Forward Research is a leading research and
                development incubator for the <b>Arweave</b> ecosystem.
              </p>
              <p>
                <sup>3</sup> We support the best builders and founders focused
                on creating an entirely new class of web services on Arweave
                that provably respect users rights. We offer an environment
                tailored to help you focus on what matters most: building, from{' '}
                <sub>zero</sub> to <sup>market fit</sup>.
              </p>
            </div>
            <div className="landing-right">
              <MultiLanguageDetail />
            </div>
          </div>
          <div className="landing-bottom">
            <div className="join-us-button">
              <button>
                <p>WeaveMail Us</p>
              </button>
              <div
                className="tooltip"
                style={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <img src={emailEnvelope} alt="email-icon" />
                <span style={{ marginLeft: '5px' }}>Get Started Building</span>
              </div>
            </div>
          </div>
        </div>
        <div className="current-projects-wrapper">
          <div className="current-projects-header">
            <p className="spin" style={{ marginRight: '20px' }}>
              +
            </p>
            <h2>Current Projects.</h2>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <a key={index} href={project.link}>
                <div className={`project ${project.header} `}>
                  <div className="project-top">
                    <div className="logo-header underline">
                      <img
                        src={project.logo}
                        alt={`${project.header}-outline-logo`}
                      />

                      <h3>{project.header}</h3>
                    </div>
                    <p className="project-content">{project.content}</p>
                  </div>
                  <div className="project-bottom">
                    <span className="learn-more">Learn More</span>
                    <div className="project-links">
                      <img src={arrowRight} alt="arrow-right" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
