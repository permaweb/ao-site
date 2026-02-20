import { AllocationDisplay } from 'components/atoms/AllocationDisplay';
import { AO, ASSETS } from 'helpers/config';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

export default function DelegateCore() {
  const arProvider = useArweaveProvider();
  const languageProvider = useLanguageProvider();
  const language = languageProvider.object[languageProvider.current];

  const CORE_PROJECTS = [
    {
      id: 'pi',
      name: 'Permaweb Index',
      ticker: 'PI',
      logo: ASSETS.pi,
      disabled: false,
      process: AO.piProcess,
      description:
        'Diversify your AO rewards with PI, a token representing the permaweb. PI is composed of 1/3 AO, 1/3 Arweave (AR), and 1/3 ecosystem project tokens.',
    },
    {
      id: 'arweave',
      name: 'Arweave',
      ticker: 'AR',
      logo: ASSETS.arweave,
      disabled: true,
      process: '',
      description:
        'Turn your AO yield into Arweave. Your AO yield will return you back AR tokens for permanent data storage use.',
    },
    {
      id: 'ao',
      name: 'AO',
      ticker: 'AO',
      logo: ASSETS.aoCircled,
      disabled: false,
      process: arProvider.walletAddress,
      description:
        'Keep earning AO. Your AR holding yield and deposits will continue to accrue AO without any reallocation.',
    },
  ];

  return (
    <S.Wrapper className={'border-wrapper-primary'}>
      <S.HeaderWrapper>
        <p>{`${language.getStarted}.`}</p>
        <span>{`${language.addCoreProjects}.`}</span>
      </S.HeaderWrapper>
      <S.BodyWrapper>
        {CORE_PROJECTS.map((project) => {
          return (
            <S.BodySection key={project.id}>
              <S.BodySectionHeader>
                <S.BodySectionName>
                  <img src={project.logo} alt={`${project.name} logo`} />
                  <p>{project.name}</p>
                </S.BodySectionName>
                <span>{`$${project.ticker}`}</span>
              </S.BodySectionHeader>
              <S.BodySectionDescription>
                <p>{project.description}</p>
              </S.BodySectionDescription>
              <S.BodySectionAction>
                <AllocationDisplay
                  processId={project.process}
                  tokenId={project.id}
                  tokenLabel={project.ticker}
                  disabled={project.disabled}
                  showAllocatedLabel={true}
                />
              </S.BodySectionAction>
            </S.BodySection>
          );
        })}
      </S.BodyWrapper>
    </S.Wrapper>
  );
}
