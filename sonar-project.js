const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://149.28.159.113:9000",
    options: {
      "sonar.projectKey": "mm-event-bus",
      "sonar.projectName": "mm-event-bus",
      "sonar.projectVersion": "1.0.0",
      "sonar.projectDescription": "Event bus Demo",
      "sonar.sources": ".",
      "sonar.token":
        "{AQAAABAAAAAwG25KPwoCEGoAoUfYvkFhSsUsg6rKNY1wjcTF4e3mzZSos0sTrr+/UWr+oECyC9Ldj7lJpbwHIVHBXDDsCccB0w==}",
      "sonar.inclusions": "packages/core/src/**", // Entry point of your code
    },
  },
  () => {}
);
