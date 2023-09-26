import { ResponsivePieCanvas } from '@nivo/pie'

    export default function MyResponsivePie({ data  }) {
     return <ResponsivePieCanvas
            data={data}
            margin={{ top: 40, right: 200, bottom: 40, left: 80 }}
            valueFormat=" >-.2%"
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={{ scheme: 'nivo' }}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.6
                    ]
                ]
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="white"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="white"
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: 'rgba(255, 255, 255, 0.3)',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            // fill={[
            //     {
            //         match: {
            //             id: 'ruby'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'c'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'go'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'python'
            //         },
            //         id: 'dots'
            //     },
            //     {
            //         match: {
            //             id: 'scala'
            //         },
            //         id: 'lines'
            //     },
            //     {
            //         match: {
            //             id: 'lisp'
            //         },
            //         id: 'lines'
            //     },
            //     {
            //         match: {
            //             id: 'elixir'
            //         },
            //         id: 'lines'
            //     },
            //     {
            //         match: {
            //             id: 'javascript'
            //         },
            //         id: 'lines'
            //     }
            // ]}
            legends={[
                {
                    anchor: 'right',
                    direction: 'column',
                    justify: false,
                    translateX: 140,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 60,
                    itemHeight: 14,
                    itemTextColor: '#999 dark:white',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 14,
                    symbolShape: 'circle'
                }
            ]}
        />
    
  
}
