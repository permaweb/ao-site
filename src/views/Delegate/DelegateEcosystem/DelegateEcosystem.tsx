import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import { AllocationDisplay } from 'components/atoms/AllocationDisplay';
import { Button } from 'components/atoms/Button';
import { FormField } from 'components/atoms/FormField';
import { ASSETS, ENDPOINTS } from 'helpers/config';
import { FLPTabType } from 'helpers/types';
import {
  formatAddress,
  formatDate,
  formatNumber,
  getRelativeDate,
  parseBigIntAsNumber,
} from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';

type ExploreSortKey = 'index' | 'project' | 'delegated' | 'launched' | 'allocation';
type SortDirection = 'asc' | 'desc';

function Project(props: {
  index: number;
  project: any;
  totalDelegated: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [copied, setCopied] = React.useState<boolean>(false);

  const languageProvider = useLanguageProvider();
  const language = languageProvider.object[languageProvider.current];

  const copyTokenId = React.useCallback(async (address: string) => {
    if (address) {
      if (address.length > 0) {
        await navigator.clipboard.writeText(address);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  }, []);

  return (
    <S.TableBodyRowWrapper>
      <S.TableBodyRow onClick={props.onToggle} open={props.isOpen}>
        <S.TableBodyCell flex={0.075} width={50} align={'center'}>
          <span>{props.index}</span>
        </S.TableBodyCell>
        <S.TableBodyCell flex={1.5} align={'left'}>
          <S.TableBodyImage hasImage={props.project.flp_token_logo}>
            {props.project.flp_token_logo && (
              <img src={ENDPOINTS.tx(props.project.flp_token_logo)} alt={'Project Logo'} />
            )}
          </S.TableBodyImage>
          <S.ProjectNameWrapper>
            <span>{props.project.flp_name ?? '-'}</span>
            {props.project.flp_token_ticker && (
              <span className={'ticker'}>{`$${props.project.flp_token_ticker}`}</span>
            )}
          </S.ProjectNameWrapper>
        </S.TableBodyCell>
        <S.TableBodyCell flex={1} align={'right'}>
          <span>{formatNumber(props.totalDelegated)}</span>
          <S.TableBodyImage hasImage={true} size={17.5}>
            <img src={ASSETS.aoCircled} />
          </S.TableBodyImage>
        </S.TableBodyCell>
        <S.TableBodyCell flex={1} align={'right'}>
          <span>{getRelativeDate(props.project.starts_at_ts)}</span>
        </S.TableBodyCell>
        <S.TableBodyCell flex={1} align={'right'}>
          <AllocationDisplay
            processId={props.project.id}
            tokenId={props.project.id}
            tokenLabel={props.project.flp_token_ticker ? `$${props.project.flp_token_ticker}` : ''}
            showAllocatedLabel={true}
          />
        </S.TableBodyCell>
      </S.TableBodyRow>
      <S.TableBodyRowDetail open={props.isOpen}>
        <S.TableBodyRowDetailInner>
          <S.PanelWrapper>
            <S.PanelWrapperStart>
              <S.ProjectBody>
                <S.ProjectId onClick={() => copyTokenId(props.project?.flp_token_process ?? '-')}>
                  <span>{`${language.tokenId}:`}</span>
                  <p>
                    {props.project?.flp_token_process ? formatAddress(props.project.flp_token_process, false) : '-'}
                  </p>
                  <ReactSVG src={copied ? ASSETS.checkmark : ASSETS.copy} />
                </S.ProjectId>
                {props.project?.flp_short_description && (
                  <S.ProjectShortDescription>
                    <p>{props.project?.flp_short_description ?? 'No description'}</p>
                  </S.ProjectShortDescription>
                )}
                {props.project?.flp_long_description && (
                  <S.ProjectLongDescription>
                    <p>{props.project.flp_long_description}</p>
                  </S.ProjectLongDescription>
                )}
                <S.ProjectLinesWrapper>
                  <S.ProjectLineWrapper>
                    <S.ProjectLineDates>
                      <S.ProjectInfoLine>
                        <span>{language.startDate}</span>
                        <p>
                          {props.project?.starts_at_ts ? formatDate(props.project.starts_at_ts, 'dateString') : 'None'}
                        </p>
                      </S.ProjectInfoLine>
                      <S.ProjectInfoLine>
                        <span>{language.endDate}</span>
                        <p>{props.project?.ends_at_ts ? formatDate(props.project.ends_at_ts, 'dateString') : 'None'}</p>
                      </S.ProjectInfoLine>
                    </S.ProjectLineDates>
                    <S.ProjectLinks>
                      {props.project?.website_url && (
                        <S.ProjectLink>
                          <Link to={props.project.website_url} target={'_blank'} onClick={(e) => e.stopPropagation()}>
                            <ReactSVG src={ASSETS.website} />
                          </Link>
                        </S.ProjectLink>
                      )}
                      {props.project?.twitter_handle && (
                        <S.ProjectLink>
                          <Link
                            to={`https://x.com/${props.project.twitter_handle}`}
                            target={'_blank'}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ReactSVG src={ASSETS.x} />
                          </Link>
                        </S.ProjectLink>
                      )}
                    </S.ProjectLinks>
                  </S.ProjectLineWrapper>
                </S.ProjectLinesWrapper>
              </S.ProjectBody>
            </S.PanelWrapperStart>
            {props.project?.disclaimer && (
              <S.PanelWrapperEnd>
                <S.ProjectDisclaimer>
                  <p>{props.project.disclaimer}</p>
                </S.ProjectDisclaimer>
              </S.PanelWrapperEnd>
            )}
          </S.PanelWrapper>
        </S.TableBodyRowDetailInner>
      </S.TableBodyRowDetail>
    </S.TableBodyRowWrapper>
  );
}

export default function DelegateEcosystem() {
  const allocationProvider = useAllocationProvider();
  const languageProvider = useLanguageProvider();
  const language = languageProvider.object[languageProvider.current];

  const [currentTab, setCurrentTab] = React.useState<FLPTabType>('featured');
  const [currentProjects, setCurrentProjects] = React.useState<any[] | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [visibleCount, setVisibleCount] = React.useState<number>(10);
  const [openProjectId, setOpenProjectId] = React.useState<string | null>(null);
  const [activeSortKey, setActiveSortKey] = React.useState<ExploreSortKey | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('desc');

  const totalProjectYields = React.useMemo(() => {
    if (!allocationProvider.totalDelegated || !allocationProvider.totalDelegated.combined) return {};

    return Object.entries(allocationProvider.totalDelegated.combined).reduce((acc, [key, value]: any) => {
      acc[key] = Number(parseBigIntAsNumber(value || '0', 12));
      return acc;
    }, {});
  }, [allocationProvider.totalDelegated]);

  const totalDelegatedByProject = React.useCallback(
    (flpId: string) => {
      return totalProjectYields[flpId] || 0;
    },
    [totalProjectYields]
  );

  const compareValues = React.useCallback((aValue: number | string | null, bValue: number | string | null) => {
    const isEmpty = (value: number | string | null) => {
      if (value === null || value === undefined) return true;
      if (typeof value === 'string') return value.trim().length === 0;
      if (typeof value === 'number') return Number.isNaN(value);
      return false;
    };

    const aEmpty = isEmpty(aValue);
    const bEmpty = isEmpty(bValue);

    if (aEmpty && bEmpty) return 0;
    if (aEmpty) return 1;
    if (bEmpty) return -1;

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return aValue - bValue;
    }

    return String(aValue).localeCompare(String(bValue), undefined, { sensitivity: 'base' });
  }, []);

  const getAllocationValue = React.useCallback(
    (projectId: string) => {
      const allocationRecord = allocationProvider.records?.find((record) => record.id === projectId);
      return typeof allocationRecord?.value === 'number' ? allocationRecord.value : null;
    },
    [allocationProvider.records]
  );

  const getSortValue = React.useCallback(
    (
      sortKey: ExploreSortKey,
      project: any,
      baseIndexMap: Map<string, number>
    ): number | string | null => {
      switch (sortKey) {
        case 'index':
          return baseIndexMap.get(project.id) ?? null;
        case 'project':
          return project.flp_name?.trim() ?? null;
        case 'delegated':
          return totalDelegatedByProject(project.id);
        case 'launched':
          return project.starts_at_ts ? Number(project.starts_at_ts) : null;
        case 'allocation':
          return getAllocationValue(project.id);
        default:
          return null;
      }
    },
    [getAllocationValue, totalDelegatedByProject]
  );

  const handleSortHeader = React.useCallback((sortKey: ExploreSortKey) => {
    setActiveSortKey((previous) => {
      if (previous === sortKey) {
        setSortDirection((previousDirection) => (previousDirection === 'asc' ? 'desc' : 'asc'));
        return previous;
      }

      setSortDirection('asc');
      return sortKey;
    });
  }, []);

  React.useEffect(() => {
    if (allocationProvider?.projects?.length > 0) {
      const query = searchQuery.toLowerCase();

      let filteredProjects = allocationProvider.projects;

      if (query) {
        filteredProjects = allocationProvider.projects.filter(
          (flp) =>
            flp.id?.toLowerCase().includes(query) ||
            flp.flp_name?.toLowerCase().includes(query) ||
            flp.flp_token_name?.toLowerCase().includes(query) ||
            flp.flp_token_ticker?.toLowerCase().includes(query) ||
            flp.flp_token_process?.toLowerCase().includes(query)
        );
      }

      const defaultSortedProjects = [...filteredProjects].sort((a, b) => {
        switch (currentTab) {
          case 'featured':
            const aDelegated = totalProjectYields[a.id] || 0;
            const bDelegated = totalProjectYields[b.id] || 0;
            return bDelegated - aDelegated;
          case 'all':
          default:
            return (b.starts_at_ts || 0) - (a.starts_at_ts || 0);
        }
      });

      if (currentTab !== 'all' || !activeSortKey) {
        setCurrentProjects(defaultSortedProjects);
        return;
      }

      const baseIndexMap = new Map(defaultSortedProjects.map((project, index) => [project.id, index]));
      const sortedProjects = [...defaultSortedProjects].sort((a, b) => {
        const primaryComparison = compareValues(
          getSortValue(activeSortKey, a, baseIndexMap),
          getSortValue(activeSortKey, b, baseIndexMap)
        );

        if (primaryComparison === 0) {
          return (baseIndexMap.get(a.id) || 0) - (baseIndexMap.get(b.id) || 0);
        }

        return sortDirection === 'asc' ? primaryComparison : -primaryComparison;
      });

      setCurrentProjects(sortedProjects);
    }
  }, [
    allocationProvider?.projects,
    currentTab,
    totalProjectYields,
    searchQuery,
    activeSortKey,
    sortDirection,
    compareValues,
    getSortValue,
  ]);

  React.useEffect(() => {
    setVisibleCount(10);
  }, [currentTab, searchQuery]);

  React.useEffect(() => {
    if (openProjectId && currentProjects && !currentProjects.some((project) => project.id === openProjectId)) {
      setOpenProjectId(null);
    }
  }, [currentProjects, openProjectId]);

  const headerCells: Array<{
    key: ExploreSortKey;
    label: string;
    flex: number;
    width?: number;
    align: 'left' | 'right' | 'center';
  }> = [
    { key: 'index', label: '#', flex: 0.075, width: 50, align: 'center' },
    { key: 'project', label: 'Project', flex: 1.5, align: 'left' },
    { key: 'delegated', label: 'Total AO Delegated', flex: 1, align: 'right' },
    { key: 'launched', label: 'Launched', flex: 1, align: 'right' },
    { key: 'allocation', label: 'Allocation', flex: 1, align: 'right' },
  ];

  const showExploreSort = currentTab === 'all';

  return (
    <S.Wrapper>
      <S.TableWrapper className={'border-wrapper-primary'}>
        <S.HeaderWrapper>
          <p>{`${language.explore}.`}</p>
          <span>{`${language.pickEcosystemProjects}.`}</span>
        </S.HeaderWrapper>
        <S.BodyWrapper>
          <S.TableNavigation>
            <S.TabsWrapper>
              <S.Tab active={currentTab === 'featured'}>
                <Button
                  type={'primary'}
                  label={'Popular Delegations'}
                  handlePress={() => setCurrentTab('featured')}
                  active={currentTab === 'featured'}
                  icon={ASSETS.trendUp}
                  iconLeftAlign
                />
              </S.Tab>
              <S.Tab active={currentTab === 'all'}>
                <Button
                  type={'primary'}
                  label={'Explore Delegations'}
                  handlePress={() => setCurrentTab('all')}
                  active={currentTab === 'all'}
                  icon={ASSETS.searchList}
                  iconLeftAlign
                />
              </S.Tab>
            </S.TabsWrapper>
            <S.SearchWrapper>
              <FormField
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                disabled={false}
                invalid={{ status: false, message: null }}
                placeholder={'Search for Project...'}
                hideErrorMessage
              />
              <ReactSVG src={ASSETS.search} />
            </S.SearchWrapper>
          </S.TableNavigation>
          <S.TableHeaderRow>
            {headerCells.map((headerCell) => {
              const isActive = showExploreSort && activeSortKey === headerCell.key;
              const indicator = isActive ? (sortDirection === 'asc' ? '↑' : '↓') : '↕';

              return (
                <S.TableHeaderCell
                  key={headerCell.key}
                  flex={headerCell.flex}
                  width={headerCell.width}
                  align={headerCell.align}
                  sortable={showExploreSort}
                  active={isActive}
                  onClick={showExploreSort ? () => handleSortHeader(headerCell.key) : undefined}
                  onKeyDown={
                    showExploreSort
                      ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handleSortHeader(headerCell.key);
                          }
                        }
                      : undefined
                  }
                  role={showExploreSort ? 'button' : undefined}
                  tabIndex={showExploreSort ? 0 : undefined}
                >
                  <span>{headerCell.label}</span>
                  {showExploreSort && <S.SortIndicator active={isActive}>{indicator}</S.SortIndicator>}
                </S.TableHeaderCell>
              );
            })}
          </S.TableHeaderRow>
          <S.Table>
            {currentProjects ? (
              <>
                {currentProjects.length > 0 ? (
                  <>
                    {currentProjects.slice(0, visibleCount).map((project, index) => {
                      return (
                        <Project
                          key={project.id}
                          index={index + 1}
                          project={project}
                          totalDelegated={totalDelegatedByProject(project.id)}
                          isOpen={openProjectId === project.id}
                          onToggle={() => setOpenProjectId((previous) => (previous === project.id ? null : project.id))}
                        />
                      );
                    })}
                  </>
                ) : (
                  <S.TableEmpty>
                    <span>No Results</span>
                  </S.TableEmpty>
                )}
              </>
            ) : (
              <S.TableEmpty>
                <span>{`${language.loading}...`}</span>
              </S.TableEmpty>
            )}
          </S.Table>
        </S.BodyWrapper>
      </S.TableWrapper>
      {currentProjects && currentProjects.length > visibleCount && (
        <S.LoadMoreWrapper>
          <Button
            type={'primary'}
            label={'Load More'}
            handlePress={() => setVisibleCount((prev) => prev + 10)}
            height={45}
            width={175}
          />
        </S.LoadMoreWrapper>
      )}
    </S.Wrapper>
  );
}
