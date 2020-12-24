import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';


const screenwidth = Dimensions.get("window").width;

const PreviewLineChart = ({ datasets, index, mastercolour, linecolour }) => {
    
    let chartset = [];
    let slimList = [];
    // let actionlist = [];
    let chartLabels =[];
    datasets.forEach((chart) => {
        if (chart.length> 0) {
            chartLabels = chart.find(x=> x.index === index).labels;
            slimList = chart.find(x=> x.index === index).data.map(a => a.value);
            // actionlist = chart.find(x=> x.index === index).data.map(a => a.buy);
            if (slimList.length > 0) {
                let dataset = {
                    data: slimList,
                    color: () => linecolour
                    , strokeWidth: "2"
                };

                chartset.push(dataset);
            }
            
            // if (actionlist.length > 0) {
            //     let dataset = {
            //         data: actionlist,
            //         color: () => linecolour
            //         , strokeWidth: "2"
            //     };

            //     chartset.push(dataset);
            // }
        }
        
    });

    // const data = {
    //     labels: ["Test1", "Test2"],
    //     legend: ["L1", "L2", "L3"],
    //     data: [
    //       [60, 60, 60],
    //       [30, 30, 60]
    //     ],
    //     barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
    //   };
   
const chartConfig = {
    backgroundColor: mastercolour,
    backgroundGradientFrom: mastercolour,
    backgroundGradientTo: mastercolour,
    fillShadowGradient: linecolour,
    fillShadowGradientOpacity: 0,
    decimalPlaces: 2, // optional, defaults to 2dp #f9b10b
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
    style: {
        borderRadius: 0
    }
};
if (chartset.length > 0) {
    return (
        <>
        <LineChart
            data={{
                labels: chartLabels,
                datasets: chartset
            }}
            fromZero={false}
            drawBorders={false}
            withDots={false}
            withShadow={true}
            withOuterLines={false}
            withInnerLines={false}
            withHorizontalLabels={true}
            width={screenwidth } // from react-native
            height={250}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
            style={{
                flex: 1,
                marginVertical: 0,
                borderRadius: 0,
                margin: 0,
                paddingRight: 0,
                top: 0
            }}
        />
</>
    )
}
else {
    return (
        <View style={styles.activitycontainer}>
            <ActivityIndicator size="large" color="white" />
        </View>
    )
}
};

const styles = StyleSheet.create({
    activitycontainer: {
        padding: 30
    }
});

export default PreviewLineChart;