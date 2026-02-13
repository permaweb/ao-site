import React from 'react';
import { useTheme } from 'styled-components';

import { Button } from 'components/atoms/Button';
import { AO, ASSETS } from 'helpers/config';
import { formatPercentage } from 'helpers/utils';
import { useAllocationProvider } from 'providers/AllocationProvider';
import { useArweaveProvider } from 'providers/ArweaveProvider';
import { useLanguageProvider } from 'providers/LanguageProvider';

import * as S from './styles';
import { IProps } from './types';

export default function AllocationDisplay(props: IProps) {
  const theme = useTheme();
  const arProvider = useArweaveProvider();
  const allocationProvider = useAllocationProvider();
  const languageProvider = useLanguageProvider();
  const language = languageProvider.object[languageProvider.current];

  const keys = React.useMemo(() => {
    return [
      theme.colors.stats.primary,
      theme.colors.stats.alt1,
      theme.colors.stats.alt2,
      theme.colors.stats.alt3,
      theme.colors.stats.alt4,
      theme.colors.stats.alt5,
      theme.colors.stats.alt6,
      theme.colors.stats.alt7,
      theme.colors.stats.alt8,
      theme.colors.stats.alt9,
      theme.colors.stats.alt10,
    ];
  }, [theme]);

  const coreMap = React.useMemo(
    () => ({
      ao: { color: theme.colors.stats.alt1, id: arProvider?.walletAddress || '' },
      pi: { color: theme.colors.stats.primary, id: AO.piProcess },
      arweave: { color: theme.colors.stats.alt3, id: '' },
    }),
    [theme, arProvider?.walletAddress]
  );

  const getColor = React.useCallback(
    (processId: string) => {
      // Check if it's a core project
      const coreEntry = Object.values(coreMap).find((c) => c.id === processId);
      if (coreEntry) return coreEntry.color;

      // Get all records and find the index of this ecosystem project
      const coreIds = Object.values(coreMap).map((c) => c.id);
      const ecosystemRecords = allocationProvider?.records?.filter((r) => !coreIds.includes(r.id)) || [];
      const ecosystemIndex = ecosystemRecords.findIndex((r) => r.id === processId);

      if (ecosystemIndex !== -1) {
        const assignedColors = new Set(Object.values(coreMap).map((c) => c.color));
        const availableColors = keys.filter((color) => !assignedColors.has(color));
        return availableColors[ecosystemIndex % availableColors.length];
      }

      // Fallback
      return theme.colors.stats.primary;
    },
    [coreMap, allocationProvider?.records, keys, theme]
  );

  if (!arProvider.walletAddress) {
    return (
      <S.Wrapper>
        <span>-</span>
      </S.Wrapper>
    );
  }

  const existingRecord = allocationProvider.records?.find((allocation) => allocation.id === props.processId);

  if (existingRecord) {
    const indicatorColor = getColor(props.processId);
    return (
      <S.Wrapper>
        <S.Indicator color={indicatorColor} />
        <p>{formatPercentage(existingRecord.value)}</p>
        {props.showAllocatedLabel && <span>{`Allocated`}</span>}
      </S.Wrapper>
    );
  }

  if (props.disabled) {
    return (
      <S.Wrapper>
        <span>{`Coming Soon`}</span>
      </S.Wrapper>
    );
  }

  return (
    <Button
      type={'alt2'}
      label={language.add}
      handlePress={(e: any) => {
        e.preventDefault();
        e.stopPropagation();

        allocationProvider.addToken({
          id: props.tokenId,
          label: props.tokenLabel,
        });
      }}
      disabled={props.disabled}
      icon={ASSETS.plus}
    />
  );
}
