import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Svg, { Rect, Text as SvgText, G } from 'react-native-svg';
import { AppContext } from '../Context/AppContext';

const AccessDeniedPerDayHeatMap = () => {
    const { Device_DeniedDaySum, selectedPersonName } = useContext(AppContext);
    const name = "User";
    const loading = false;

    const [tooltip, setTooltip] = useState(null);

    const getDatasource = () => {
        let temp = {};
        temp.dataSource = [];
        temp.xAis = [];
        temp.yAis = [];

        // Extract unique x-axis and y-axis labels
        const xLabels = [...new Set(Device_DeniedDaySum?.map((item) => item.Day))];
        const yLabels = [...new Set(Device_DeniedDaySum?.map((item) => item.Group))];

        for (let y = 0; y < yLabels.length; y++) {
            temp.dataSource.push([]);
            temp.yAis.push(y);
            temp.xAis.push(yLabels[y]);

            for (let x = 0; x < xLabels.length; x++) {
                const item = Device_DeniedDaySum?.find((d) => d.Day === xLabels[x] && d.Group === yLabels[y]);
                temp.dataSource[y].push(item ? item : { Values: '' });
            }
        }

        return temp;
    }

    const data = getDatasource();

    const getColor = (value) => {
        if (value === '') return '#cccccc';  // Red for no data
        if (value <= 10) return '#6EB5D0';
        if (value <= 20) return '#7EDCA2';
        if (value <= 30) return '#DCD57E';
        return '#DCD57E';  // Adjust as needed
    };

    const handlePress = (item, x, y) => {
        if (item.Values !== '') {
            setTooltip({ ...item, x, y });
        } else {
            setTooltip(null);
        }
    };

    const handleOutsidePress = () => {
        setTooltip(null);
    };

    const renderTooltip = () => {
        if (!tooltip) return null;
        return (
            <View style={[styles.tooltip, { top: tooltip.y * 50 + 50, left: tooltip.x * 50 + 10 }]}>
                <Text>Group: {tooltip.Group}</Text>
                <Text>Day: {tooltip.Day}</Text>
                <Text>Values: {tooltip.Values}</Text>
            </View>
        );
    };

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.container}>
                <Text style={styles.title}>Access Denied for {selectedPersonName ? selectedPersonName : name}</Text>
                {Device_DeniedDaySum.length > 0 ? (
                    loading ? (
                        <View style={styles.spinner}><Text>Loading...</Text></View>
                    ) : (
                        <View style={styles.containerv2}>
                            <View style={styles.groupContainer}>
                                {data.xAis.map((group, index) => (
                                    <Text key={index} style={styles.groupLabel}>{group}</Text>
                                ))}
                            </View>
                            <ScrollView horizontal>
                                <View>
                                    <View style={styles.height_vt}>
                                        <Svg height={data.yAis.length * 50} width={data.xAis.length * 50}>
                                            {data.yAis.map((y, i) => (
                                                data.xAis.map((x, j) => {
                                                    const item = data?.dataSource[i][j];
                                                    return (
                                                        <TouchableWithoutFeedback key={`${i}-${j}`} onPress={() => handlePress(item, j, i)}>
                                                            <G>
                                                                <Rect
                                                                    y={i * 50}
                                                                    x={j * 50}
                                                                    width="50"
                                                                    height="50"
                                                                    fill={getColor(item?.Values)}
                                                                    stroke="lightgreen"
                                                                    strokeWidth="0.5"
                                                                />
                                                                {item?.Values ? (
                                                                    <SvgText
                                                                        y={(i * 50) + 25}
                                                                        x={(j * 50) + 25}
                                                                        fontSize="12"
                                                                        fill="#000"
                                                                        textAnchor="middle"
                                                                    >
                                                                        {item?.Values}
                                                                    </SvgText>
                                                                ) : null}
                                                            </G>
                                                        </TouchableWithoutFeedback>
                                                    );
                                                })
                                            ))}
                                        </Svg>
                                    </View>
                                    <View style={styles.xLabelsBottom}>
                                        {data.dataSource[0].map((_, index) => (
                                            <Text key={index} style={styles.dayLabelBottom}>{index + 1}</Text>
                                        ))}
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    )
                ) : (
                    <View style={styles.noData}>
                        <Text>No Data</Text>
                    </View>
                )}
                
                {renderTooltip()}
                 <View>
                
                <Text style={styles.titleBottom}>Days</Text>
            </View>
            </View>
           
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
    },
    containerv2: {
        flexDirection: "row",
        justifyContent: 'center',
        width: "100%",
    },
    group_v6: {
        width: 60,
        paddingTop: "30%",
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center",
        marginBottom: 20,
    },
    
    titleBottom: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center",
        marginTop: 10,
    },
    height_vt: { 
        // height: ,
    },
    spinner: {
        marginTop: 20,
    },
    noData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tooltip: {
        position: 'absolute',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    xLabels: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        
    },
    dayLabel: {
        width: 50,
        textAlign: 'center',
        fontSize: 10,
        
    },
    xLabelsBottom: {
        flexDirection: 'row',
        // justifyContent: 'center',
        marginTop: 10,
        
    },
    dayLabelBottom: {
        width: 50,
        textAlign: 'center',
        fontSize: 10,
        
    },
    groupLabel: {
        // width: 50,
        // paddingHorizontal:20,
        paddingVertical:16.5,
        paddingRight: 5,
        textAlign: 'center',
        fontSize: 10,
        // transform: [{ rotate: '-90deg' }],
    },
});

export default AccessDeniedPerDayHeatMap;
