-- CreateTable
CREATE TABLE "AddCart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "AddCart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddCart" ADD CONSTRAINT "AddCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddCart" ADD CONSTRAINT "AddCart_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
