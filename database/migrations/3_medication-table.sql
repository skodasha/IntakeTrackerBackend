create TABLE if not EXISTS "Medication"(
  "id" VARCHAR (36) PRIMARY KEY,
  "userId" VARCHAR (36) REFERENCES "User" ON DELETE CASCADE,
  "name" VARCHAR (250) NOT NULL,
  "description" VARCHAR (500) NOT NULL,
  "initialAmount" INT NOT NULL,
  "targetAmount" INT NOT NULL,
  "createdAt" BIGINT NOT NULL,
  "updatedAt" BIGINT NOT NULL,
  "createdBy" VARCHAR (36),
  "updatedBy" VARCHAR (36)
);
