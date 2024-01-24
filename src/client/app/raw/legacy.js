import Plotly from 'plotly.js-dist'
 let audioSenderMetrics = {};
 let audioSenderMetricsTimestamp = {};
 let videoSenderMetrics =  {};
 let videoSenderMetricsTimestamp = {};
 let audioReceiverMetrics = {};
 let audioReceiverMetricsTimestamp = {};
 let videoReceiverMetrics = {};
 let videoReceiverMetricsTimestamp = {};

function getMetricDiffArray(arr) { 
  const differencesArray = [];
  
  for (let i = 1; i < arr.length; i++) {
    differencesArray.push(arr[i] - arr[i - 1]);
  }

  return differencesArray;
}

function calculateInboundOutboundStats(stats, metricType, type, metricFilter) {  
  // Convert items to an array if it's an object  
  stats.forEach((stat) => {
    if (stat?.type !== "getStats") {
      return;
    }
    const allRecords = Object.values(stat.value);
    allRecords.forEach(itr=> {       
      if (!itr?.codecId) {
        return;
      }

      let itrStr = itr?.ssrc.toString();
      const metrics = type === "sender"
        ? itr.mediaType === "audio" ? audioSenderMetrics : videoSenderMetrics
        : itr.mediaType === "audio" ? audioReceiverMetrics : videoReceiverMetrics;
      
      const timestampMetrics = type === "sender"
        ? itr.mediaType === "audio" ? audioSenderMetricsTimestamp : videoSenderMetricsTimestamp
        : itr.mediaType === "audio" ? audioReceiverMetricsTimestamp : videoReceiverMetricsTimestamp;
                  
      if (itr.mediaType === "audio" && type === "sender" &&  !itr[metricType])   {
        console.log("Sending audio", itr)
      }
      if (itr?.type !== metricFilter ) {
        return;
      }
      
      metrics[metricType] = metrics[metricType] || {};
      metrics[metricType][itrStr] = metrics[metricType][itrStr] || [];
      metrics[metricType][itrStr].push(itr[metricType]);
      
      timestampMetrics[metricType] = timestampMetrics[metricType] || {};
      timestampMetrics[metricType][itrStr] = timestampMetrics[metricType][itrStr] || [];
      timestampMetrics[metricType][itrStr].push(itr.timestamp);
    });
  });
}

function processConnections (peerConnections, data) {
  console.log("connectionIds, data",peerConnections, data);
  let recieverStats = peerConnections.PC_0;
  let senderStats = peerConnections.PC_1;
  // Change "reciever" to "receiver" in the following line
  // calculateInboundOutboundStats(recieverStats, "audioLevel", "receiver");
  // Change "sender" to "sender" in the following line
  calculateInboundOutboundStats(recieverStats, "packetsLost", "receiver", "inbound-rtp") 
  console.log("audioSenderMetrics ", audioReceiverMetrics)
  console.log("audioSenderMetricsTimestamp ", audioReceiverMetricsTimestamp)
  // Extract relevant data for plotting

  const container = document.getElementById('result');
  const traces = [];

  for (const [key, value] of Object.entries(audioReceiverMetrics)) {
    for (const [ssrc, stat] of Object.entries(value)) {
      const timestamps = audioReceiverMetricsTimestamp[key][ssrc];
      const timestampsDate = timestamps.map(ts => new Date(ts));
      const packetsLost = stat;

      const freezeThreshold = 5;
      const freezePoints = timestampsDate.filter((_, index) => packetsLost[index] > freezeThreshold);

      const trace1 = {
        x: timestampsDate,
        y: packetsLost,
        mode: 'markers',
        name: `Source ${key} - Packets Lost`,
      };

      traces.push(trace1);

      if (freezePoints.length > 0) {
        const trace2 = {
          x: freezePoints,
          y: new Array(freezePoints.length).fill(freezeThreshold),
          mode: 'markers',
          marker: { color: 'red', size: 8 },
          name: `Source ${key} - Audio Freeze`,
        };

        traces.push(trace2);
      }
    }
  }

  const layout = {
    title: 'Audio Freeze Detection',
    xaxis: { title: 'Timestamp' },
    yaxis: { title: 'Packets Lost' },
    showlegend: true,
  };

  const config = {
    responsive: true,
  };

  Plotly.newPlot(container, traces, layout, config);
}

export const showStats = data => {
  window.setTimeout(processConnections, 0, data.peerConnections, data)
}

