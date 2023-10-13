/*
  Warnings:

  - You are about to drop the `BookingService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookingService" DROP CONSTRAINT "BookingService_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "BookingService" DROP CONSTRAINT "BookingService_serviceId_fkey";

-- DropTable
DROP TABLE "BookingService";

-- CreateTable
CREATE TABLE "booking_service" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "bookingDate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "booking_service" ADD CONSTRAINT "booking_service_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking_service" ADD CONSTRAINT "booking_service_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
