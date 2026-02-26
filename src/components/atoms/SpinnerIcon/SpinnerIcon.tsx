import React from 'react';

import * as S from '../Loader/styles';

export interface SpinnerIconProps {
  size?: number;
  height?: number;
  width?: number;
  className?: string;
}

const DEFAULT_SIZE = 16.5;
const DEFAULT_HEIGHT = 5.5;
const DEFAULT_WIDTH = 1.95;

export default function SpinnerIcon(props: SpinnerIconProps) {
  const size = props.size ?? DEFAULT_SIZE;
  const height = props.height ?? DEFAULT_HEIGHT;
  const width = props.width ?? DEFAULT_WIDTH;

  return (
    <S.Spinner size={size} height={height} width={width} noPosition>
      <S.Blade noPosition />
      <S.Blade noPosition />
      <S.Blade noPosition />
      <S.Blade noPosition />
      <S.Blade noPosition />
      <S.Blade noPosition />
      <S.Blade noPosition />
      <S.Blade noPosition />
      <S.Blade noPosition />
      <S.Blade noPosition />
      <S.Blade noPosition />
      <S.Blade noPosition />
    </S.Spinner>
  );
}
