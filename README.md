# Sariska Analytics

Welcome to Sariska Analytics, where we've taken the RTC Visualizer project to new heights. Our focus is on extracting user-friendly metrics by analyzing raw RTC metrics (WebRTC peerconnection getStats() API), uploaded for each user during the conference call at certain intervals

### Key Features
- **Audio/Video Quality Analysis:** Delve into detailed metrics to assess the quality of audio and video streams during calls.
- **User Location Tracking:** Gain insights into the geographical locations of users, enhancing your understanding of the global reach of your platform.
- **IP Address Analysis:** Identify and track IP addresses to enhance security and troubleshoot potential issues.
- **System Speed Metrics:** Analyze the speed of user systems to optimize the performance of your application.
- **Connection Health Monitoring:** Stay informed about the health of network connections to ensure a seamless user experience.
- **Conference Drop Reasons:** Understand and address conference drop issues with comprehensive data on drop reasons.
- **Call Quality Score:** The call quality score is determined by taking a weighted average of parameters such as audio/video quality analysis, user location tracking, IP address analysis, system speed metrics, connection health, and conference drops.

### Scalable Backend
The backend of this project is supported by an efficient and scalable real-time data processing pipeline. This pipeline utilizes services like Amazon Kinesis Data Firehose to seamlessly deliver streaming data in real-time to various destinations. For raw RTC metrics, it pipes data per user basis to Amazon Simple Storage Service (Amazon S3) as a file, and for aggregation, it also pushes the data stream to Amazon Redshift.

Conference metadata is stored in DynamoDB when a conference is identified, and subsequent queries are directed to Amazon S3 for each participant dump retrieval. This ensures a robust and dynamic system for managing conference data.
[Read more about RTC server here](https://github.com/SariskaIO/rtcstats-server)


## Access the Dashboard
Explore User Metrics here  at [https://analytics.sariska.io](https://analytics.sariska.io).

## Visualize RAW RTC Metrics
Explore detailed raw metris at [https://analytics.sariska.io/debugging](https://analytics.sariska.io/debugging).

### Contribution
Contributions to enhance and expand the capabilities of this project are welcome. Feel free to fork the repository, make improvements, and submit pull requests.

### Feedback and Support
For any questions, feedback, or support, please reach out to the Sariska Analytics team at [support@sariska.io](mailto:support@sariska.io).
Thank you for choosing Sariska Analytics to empower your RTC analytics journey!
