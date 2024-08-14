import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, Modal, TouchableOpacity } from 'react-native';
import Svg, { Rect, Text as SvgText, G } from 'react-native-svg';
import { AppContext } from '../Context/AppContext';

const CardByCardholderGraph = () => {
    const { Device_DeniedHourSum, selectedPersonName } = useContext(AppContext);
    const name = "User";
    const loading = false;

    const [tooltip, setTooltip] = useState(null);

    const getDatasource = () => {
        let temp = {};
        temp.dataSource = [];
        temp.xAis = [];
        temp.yAis = [];

        // Extract unique x-axis and y-axis labels
        const xLabels = [...new Set(Device_DeniedHourSum?.map((item) => item.Hour))];
        const yLabels = [...new Set(Device_DeniedHourSum?.map((item) => item.Group))];

        for (let y = 0; y < yLabels.length; y++) {
            temp.dataSource.push([]);
            temp.yAis.push(yLabels[y]);

            for (let x = 0; x < xLabels.length; x++) {
                const item = Device_DeniedHourSum?.find((d) => d.Hour === xLabels[x] && d.Group === yLabels[y]);
                temp.dataSource[y].push(item ? item : { Values: '' });
            }
        }

        temp.xAis = xLabels;

        return temp;
    }

    const data = getDatasource();

    const getColor = (value) => {
        if (value === '') return '#FF0000';  // Red for no data
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

    const renderTooltip = () => {
        if (!tooltip) return null;
        return (
            <Modal
                visible={true}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setTooltip(null)}
            >
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setTooltip(null)}>
                    <View style={styles.modalContent}>
                        <Text>Group: {tooltip.Group}</Text>
                        <Text>Hour: {tooltip.Hour}</Text>
                        <Text>Values: {tooltip.Values}</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Access Denied for {selectedPersonName ? selectedPersonName : name}</Text>
            {Device_DeniedHourSum.length > 0 ? (
                loading ? (
                    <View style={styles.spinner}><Text>Loading...</Text></View>
                ) : (
                    <View style={styles.containerv2}>
                        <View>
                            {data.yAis.map((group, index) => (
                                <Text key={index} style={styles.groupLabel}>{group}</Text>
                            ))}
                        </View>
                        <ScrollView horizontal>
                            <View>
                                <Svg height={(data.yAis.length * 50) + 30} width={data.xAis.length * 50}>
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
                                    {/* Render x-axis labels */}
                                    {data.xAis.map((hour, index) => (
                                        <SvgText
                                            key={index}
                                            y={(data.yAis.length * 50) + 20}
                                            x={index * 50 + 25}
                                            fontSize="12"
                                            fill="#000"
                                            textAnchor="middle"
                                        >
                                            {hour}
                                        </SvgText>
                                    ))}
                                </Svg>
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
                <Text style={styles.titleBottom}>Hour</Text>
            </View>
        </View>
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
    titleBottom: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center",
        marginTop: 5,
    },
    groupLabel: {
        paddingVertical: 16.5,
        paddingRight: 5,
        textAlign: 'center',
        fontSize: 10,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: "center",
        marginBottom: 20,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default CardByCardholderGraph;
