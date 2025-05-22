create TABLE if not EXISTS "Session"(
  "id" VARCHAR (36) PRIMARY KEY,
  "userId" VARCHAR (36) REFERENCES "User" ON DELETE CASCADE,
  "accessToken" VARCHAR (250) UNIQUE NOT NULL,
  "accessTokenExpires" BIGINT NOT NULL,
  "createdAt" BIGINT NOT NULL,
  "updatedAt" BIGINT NOT NULL,
  "createdBy" VARCHAR (36),
  "updatedBy" VARCHAR (36)
);
