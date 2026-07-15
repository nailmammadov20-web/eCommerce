-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "compareAtPrice" DECIMAL(10,2),
ADD COLUMN     "isDemo" BOOLEAN NOT NULL DEFAULT false;
