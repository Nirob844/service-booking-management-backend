-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('upcoming', 'inProgress');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "status" "ServiceStatus" NOT NULL DEFAULT 'upcoming';
