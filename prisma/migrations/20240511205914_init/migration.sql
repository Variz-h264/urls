-- CreateTable
CREATE TABLE "short_url" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "customizeLink" TEXT,
    "ip" TEXT,
    "lastUsed" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "short_url_pkey" PRIMARY KEY ("id")
);
