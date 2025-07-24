import { useThemeColor } from '@/hooks/useThemeColor';
import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface IconProps extends SvgProps {
    width?: number;
    height?: number;
    color?: string;
    strokeWidth?: number;
    fill?: string;
    paths?: string[];
    viewBox?: string;
}

export function Icon({
    width = 24,
    height = 24,
    color,
    strokeWidth = 2,
    fill = 'none',
    paths = [],
    viewBox = "0 0 24 24",
    ...props
}: IconProps) {
    const defaultColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
    const iconColor = color || defaultColor;

    // If strokeWidth is 0, use the color for fill instead of stroke
    const useFill = strokeWidth === 0;

    return (
        <Svg
            width={width}
            height={height}
            viewBox={viewBox}
            fill={useFill ? iconColor : fill}
            stroke={useFill ? 'none' : iconColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {paths.map((d, index) => (
                <Path d={d} key={`path-${index}`} />
            ))}
            {/* You can add your custom SVG elements here */}
        </Svg>
    );
}