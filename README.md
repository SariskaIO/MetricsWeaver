# Sariska Analytics

Welcome to Sariska Analytics, an advanced user analytics dashboard that builds upon the RTC Visualizer project. Our platform utilizes the WebRTC peer connection getStats() API to deliver enhance user experience by providing detailed metrics and analysis of audio/video quality within calls.

## Access the Dashboard
Explore the comprehensive insights offered by Sariska Analytics at [https://analytics.sariska.io](https://analytics.sariska.io).

## Visualize RAW RTC Metrics
For those who wish to delve into the raw RTC metrics and analyze them directly, access the RTC Visualizer at [https://rtc-visualizer.sariska.io/](https://rtc-visualizer.sariska.io/).

### Key Features
- **Audio/Video Quality Analysis:** Delve into detailed metrics to assess the quality of audio and video streams during calls.
- **User Location Tracking:** Gain insights into the geographical locations of users, enhancing your understanding of the global reach of your platform.
- **IP Address Analysis:** Identify and track IP addresses to enhance security and troubleshoot potential issues.
- **System Speed Metrics:** Analyze the speed of user systems to optimize the performance of your application.
- **Connection Health Monitoring:** Stay informed about the health of network connections to ensure a seamless user experience.
- **Conference Drop Reasons:** Understand and address conference drop issues with comprehensive data on drop reasons.
- **Call Quality Score:** The call quality score is determined by taking a weighted average of parameters such as audio/video quality analysis, user location tracking, IP address analysis, system speed metrics, connection health, and conference drops.

### Scalable Backend
The backend of this project is supported by an efficient and scalable real-time data processing pipeline. This pipeline utilizes services like Amazon Kinesis Data Firehose to seamlessly deliver streaming data in real-time to various destinations, including Amazon Simple Storage Service (Amazon S3), Amazon Redshift etc.

Conference metadata is stored in DynamoDB when a conference is identified, and subsequent queries are directed to Amazon S3 for each participant dump retrieval. This ensures a robust and dynamic system for managing conference data.
[Read more here](https://github.com/SariskaIO/rtcstats-server)

### How to Use
1. **Dashboard Access:**
   Visit [https://analytics.sariska.io](https://analytics.sariska.io) to explore the analytics dashboard.

2. **Raw Metrics Visualization:**
	For a more technical approach and access to raw RTC metrics, please visit https://rtc-visualizer.sariska.io/. You can also directly visualize live raw metrics by navigating to chrome://webrtc-internals/ in your browser during the conference call.

### Contribution
Contributions to enhance and expand the capabilities of this project are welcome. Feel free to fork the repository, make improvements, and submit pull requests.

### Feedback and Support
For any questions, feedback, or support, please reach out to the Sariska Analytics team at [support@sariska.io](mailto:support@sariska.io).

Thank you for choosing Sariska Analytics to empower your RTC analytics journey!