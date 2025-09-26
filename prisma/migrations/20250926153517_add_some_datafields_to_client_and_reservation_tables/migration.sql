-- AlterTable
ALTER TABLE "public"."Client" ADD COLUMN     "address" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "public"."Reservation" ADD COLUMN     "pax" INTEGER,
ADD COLUMN     "reservationDate" TIMESTAMP(3);
