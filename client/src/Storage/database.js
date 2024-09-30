const dbConfig = {
  name: "userDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "users",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keyPath: "name", options: { unique: false } },
        { name: "email", keyPath: "email", options: { unique: true } },
        { name: "password", keyPath: "password", options: { unique: false } },
        { name: "isBlocked", keyPath: "isBlocked", options: { unique: false } },
        {
          name: "loginHistory",
          keyPath: "loginHistory",
          options: { unique: false },
        },
      ],
    },
  ],
};

export default dbConfig;
