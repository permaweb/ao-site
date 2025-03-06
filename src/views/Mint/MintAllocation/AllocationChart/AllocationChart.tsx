import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useTheme } from 'styled-components';

import { AllocationRecordType } from 'helpers/types';
import { formatPercentage } from 'helpers/utils';

import * as S from './styles';
import { IProps } from './types';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AllocationChart(props: IProps) {
	const theme = useTheme();

	const [data, setData] = React.useState<any>(null);

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

	const colorMap: Record<string, string> = {
		pi: theme.colors.stats.primary,
		ao: theme.colors.stats.alt1,
		arweave: theme.colors.stats.alt3,
	};

	React.useEffect(() => {
		if (props.records) {
			const pieData: any = {
				labels: props.records?.map((record: AllocationRecordType) => record.label),
				datasets: [],
			};

			const assignedColors = new Set(Object.values(colorMap));
			const availableColors = keys.filter((color) => !assignedColors.has(color));
			const backgroundColors = props.records.map((record: AllocationRecordType, index: number) => {
				return colorMap[record.id] || availableColors[index % availableColors.length];
			});

			pieData.datasets.push({
				data: props.records?.map((record: AllocationRecordType) => record.value),
				backgroundColor: backgroundColors,
				borderColor: [theme.colors.border.alt4],
				borderWidth: 1.15,
			});

			setData(pieData);
		}
	}, [props.records, theme]);

	return data ? (
		<S.Chart>
			<Pie
				data={data}
				options={{
					plugins: {
						legend: {
							display: false,
						},
						tooltip: {
							callbacks: {
								label: (tooltipItem) => {
									return `${formatPercentage(tooltipItem.raw)}`;
								},
							},
						},
					},
				}}
			/>
		</S.Chart>
	) : null;
}
