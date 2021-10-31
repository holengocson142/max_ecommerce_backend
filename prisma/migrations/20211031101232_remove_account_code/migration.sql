-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "full_name" VARCHAR(511),
    "avatar" VARCHAR(255),
    "email" VARCHAR(320),
    "phone" VARCHAR(20),
    "password" VARCHAR(255) NOT NULL,
    "status" SMALLINT NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_email_key" ON "account"("email");
