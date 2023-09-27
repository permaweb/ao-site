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
import link from '../../assets/link.svg';
import emailEnvelope from '../../assets/emailEnvelope.svg';
import plusSign from '../../assets/plus-bold.svg';
import MultiLanguageDetail from '../../globalHooks/MultiLanguageDetail';

const Main = () => {
  const projects = [
    {
      logo: alex,
      header: 'alex.',
      content:
        'alex. is a decentralized archival platform. inspired by the great library of alexandria, the mission of alex. is to preserve important historical artifacts for the enrichment of all people. institutions and creators are incentivized to publicly archive digital content by allowing anyone to become sponsors of their digital artifacts.',
      link: 'http://alex.arweave.dev',
    },
    {
      logo: dataOS,
      header: 'data os',
      content: '',
      link: 'https://www.dataos.so/',
    },
    {
      logo: facts,
      header: 'facts',
      content:
        'that allows anyone to attach a truthiness market to any piece of data in any app on the permaweb. these markets incentivize participants to trade on their perception of how true and relevant a piece of data is, and gives users access to helpful market-derived assessments of the trustworthiness of data, anywhere on the web.',
      link: 'n/a',
    },
    {
      logo: fair,
      header: 'fair',
      content:
        'an open source ai marketplace that decentralizes ai model inference using arweave. anyone can create, monetize, and use open source ai models directly on fair, without being subject to the terms of a huge tech corporation.',
      link: 'http://fair.arweave.dev',
    },
    {
      logo: stamp,
      header: 'stamp',
      content:
        'stamps are the universal and composable “like” button of arweave’s permaweb. stamps enable users to show their support and preferences to creators, and can be used to curate and rank content across an unlimited number of applications.',
      link: 'https://stamps.arweave.dev/#/en/main',
    },
    {
      logo: ucm,
      header: 'universal content marketplace',
      content:
        'ucm is a protocol that enables the trustless exchange of any atomic asset on the permaweb, implemented as a warp smart contract. it goes beyond just nfts, allowing for the exchange of images, music, videos, papers, names, components, and even entire web apps.',
      link: 'n/a',
    },
    {
      logo: udl,
      header: 'universal data license',
      content:
        'a standard framework for digital content monetization on the permaweb, udl allows creators to set their own terms for the usage of content that they upload to arweave, and for developers to permissionlessly license that data in their apps. the license provides programmable parameters for all aspects of monetization.',
      link: 'https://arwiki.wiki/#/en/Universal-Data-License-How-to-use-it',
    },
    {
      logo: weavers,
      header: 'weavers',
      content:
        'the most exciting community of devs and creatives in the arweave ecosystem. weavers creates a wide range of events and initiatives that empower community members to contribute, connect, and have their voices heard.',
      link: 'n/a',
    },
    {
      logo: ao,
      header: 'ao',
      content: '',
      link: 'n/a',
    },
  ];

  return (
    <main>
      <div className="main-wrapper">
        <div className="landing">
          <div className="landing-top">
            <div className="landing-left">
              <p>
                <sup>1</sup> as a leading research and development incubator for
                the arweave ecosystem, we are on a mission to make cyberspace{' '}
                <u>freer</u> and <u>fairer</u> for <u>everyone</u>.
              </p>
              <p>
                <sup>2</sup> forward research incubates the best builders and
                founders focused on creating an entirely new class of web
                services on arweave that provably respect users rights. we
                provide an environment tailored to help you focus on what
                matters most: <b>building</b>.
              </p>
              <p>
                <sup>3</sup> do you have a ground-breaking idea? we can help you
                make it a reality, from <sub>zero</sub> to <sup>market fit</sup>
                .
              </p>
            </div>
            <div className="landing-right">
              <MultiLanguageDetail />
            </div>
          </div>
          <div className="landing-bottom">
            <div className="join-us-button">
              <button>join us.</button>
              <div
                className="tooltip"
                style={{ alignItems: 'center', justifyContent: 'center' }}
              >
                <img src={emailEnvelope} alt="email-icon" />
                <span style={{ marginLeft: '5px' }}>
                  email us to start building
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="current-projects-wrapper">
          <div className="current-projects-header">
            <h2>current projects</h2>
          </div>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className={`project ${project.header} `}>
                <div className="project-top">
                  <div className="logo-header underline">
                    <div className="tooltip">
                      <img src={link} alt="link-icon" />
                      <a href={project.link}>
                        <span>{project.link}</span>
                      </a>
                    </div>
                    <img
                      src={project.logo}
                      alt={`${project.header}-outline-logo`}
                    />
                    <a href={project.link}>
                      {project.header.length > 10 ? (
                        <>
                          <h4>{project.header}</h4>
                        </>
                      ) : (
                        <>
                          <h3>{project.header}</h3>
                        </>
                      )}
                    </a>
                  </div>
                  <p className="project-content">{project.content}</p>
                </div>
                <div className="project-bottom">
                  <div className="project-links">
                    <a href={project.link}>
                      <p>website</p>
                    </a>
                    <span>|</span>
                    <p>docs</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
