import { useCallback } from 'react';
import styled, { css } from 'styled-components';

import { FlexDiv, FlexDivCol } from 'components/layout/flex';
import { Body } from 'components/Text';
import { setSelectedChart } from 'state/futures/reducer';
import { useAppSelector, useAppDispatch } from 'state/hooks';

const CHART_OPTIONS: ('price' | 'funding')[] = ['price', 'funding'];

const ChartToggle = () => {
	const dispatch = useAppDispatch();
	const selectedChart = useAppSelector(({ futures }) => futures.selectedChart);

	const handleChartChange = useCallback(
		(chart: 'price' | 'funding') => () => {
			dispatch(setSelectedChart(chart));
		},
		[dispatch]
	);

	return (
		<>
			<FlexDivCol>
				<Body color="secondary">Chart</Body>
				<FlexDiv columnGap="10px">
					{CHART_OPTIONS.map((value) => (
						<ToggleButton
							color="secondary"
							$active={selectedChart === value}
							onClick={handleChartChange(value)}
						>
							{value}
						</ToggleButton>
					))}
				</FlexDiv>
			</FlexDivCol>
		</>
	);
};

const ToggleButton = styled(Body)<{ $active: boolean }>`
	cursor: pointer;
	text-transform: capitalize;

	${(props) =>
		props.$active &&
		css`
			color: ${props.theme.colors.selectedTheme.newTheme.text.primary};
			font-weight: 700;
		`}
`;

export default ChartToggle;
