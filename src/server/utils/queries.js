/* eslint-disable */
'use strict';
/* typically used like this WHERE `ssh redshift` creates a tunnel to your redshift db
ssh -f redshift sleep 10
export CONNECTIONSTRING='postgres://...'
rm out.html; node queries.js > out.html && firefox out.html
*/
const query = require('./query');
console.log("query", query);

async function AverageSessionDurationperUser() {
    try {
        return await query("SELECT displayname, AVG(sessiondurationms) AS avg_session_duration FROM rtcstats GROUP BY displayname");
    } catch (err) {
        return {message: err.message};
    }
}

async function AverageRTTperUser() {
    try {
        return await query("SELECT pcname, SUM(totalReceivedPacketsLost + totalSentPacketsLost) AS total_packets_lost, SUM(totalPacketsReceived + totalPacketsSent) AS total_packets_sent, (SUM(totalReceivedPacketsLost + totalSentPacketsLost) / NULLIF(SUM(totalPacketsReceived + totalPacketsSent), 0)) * 100 AS packets_lost_percentage FROM rtcstats_pc_metrics GROUP BY pcname");
    } catch (err) {
        return {message: err.message};
    }
}

async function AverageRTTperMediaType() {
    try {
        return await query("SELECT displayname, SUM(CASE WHEN isBreakoutRoom THEN sessiondurationms ELSE 0 END) / NULLIF(SUM(sessiondurationms), 0) * 100 AS breakout_room_percentage FROM rtcstats GROUP BY displayname");
    } catch (err) {
        return {message: err.message};
    }
}

async function AverageMeetingDuration() {
    try {
        return await query("SELECT mediaType, AVG(meanRtt) AS avg_rtt FROM rtcstats_track_metrics JOIN rtcstats_pc_metrics ON rtcstats_pc_metrics.id = rtcstats_track_metrics.pcId GROUP BY mediaType");
    } catch (err) {
        return {message: err.message};
    }
}

async function PercentagepeerconnectionsP2P() {
    try {
        return await query("SELECT 100.0 * COUNT(*) / (SELECT COUNT(*) FROM rtcstats_pc_metrics) AS pct_pc_p2p FROM rtcstats_pc_metrics WHERE isP2P = TRUE");
    } catch (err) {
        return {message: err.message};
    }
}

async function PercentagepeerconnectionsJVB() {
    try {
        return await query("SELECT 100.0 * COUNT(*) / (SELECT COUNT(*) FROM rtcstats_pc_metrics) AS pct_pc_relay FROM rtcstats_pc_metrics WHERE usesRelay = TRUE");
    } catch (err) {
        return {message: err.message};
    }
}

async function PercentageofpacketlossbyMediatype() {
    try {
        return await query("SELECT mediaType, AVG(packetsLostPct) AS avg_packet_loss_pct FROM rtcstats_track_metrics GROUP BY mediaType");
    } catch (err) {
        return {message: err.message};
    }
}


const queries = {
    AverageSessionDurationperUser,
    AverageRTTperUser,
    AverageRTTperMediaType,
    AverageMeetingDuration,
    PercentagepeerconnectionsP2P,
    PercentagepeerconnectionsJVB,
    PercentageofpacketlossbyMediatype
}

module.exports = queries;
