create TABLE if not EXISTS "User"(
  "id" VARCHAR (36) PRIMARY KEY,
  "email" VARCHAR (250) NOT NULL UNIQUE,
  "password" varchar(250) NOT NULL,
  "createdAt" BIGINT NOT NULL,
  "updatedAt" BIGINT NOT NULL,
  "createdBy" VARCHAR (36),
  "updatedBy" VARCHAR (36)
);
