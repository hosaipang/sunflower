/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sunflower",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const table = new sst.aws.Dynamo("user", {
      fields: {
        user_id: "string",
        user_name: "string",
      },
      primaryIndex: { hashKey: "user_id", rangeKey: "user_name" },
    });

    new sst.aws.Nextjs("Dashboard", {
      path: "dashboard",
      link: [table],
    });

    return {
      tableName: table.name,
    };
  },
});
