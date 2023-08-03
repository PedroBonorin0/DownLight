/*
  Warnings:

  - You are about to drop the column `car_info` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `paid` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `car_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signal` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "car_info",
DROP COLUMN "deadline",
DROP COLUMN "paid",
ADD COLUMN     "car_id" TEXT NOT NULL,
ADD COLUMN     "discount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "expected_date" TIMESTAMP(3),
ADD COLUMN     "number" SERIAL NOT NULL,
ADD COLUMN     "paid_at" TIMESTAMP(3),
ADD COLUMN     "signal" DECIMAL(5,2) NOT NULL,
ADD COLUMN     "total_price" DECIMAL(5,2) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "payment_methods" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars" (
    "id" TEXT NOT NULL,
    "license_plate" TEXT,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_cars" (
    "car_id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,

    CONSTRAINT "client_cars_pkey" PRIMARY KEY ("client_id","car_id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "cpf" TEXT,
    "name" TEXT,
    "phone" TEXT,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_methods_in_order" (
    "order_id" TEXT NOT NULL,
    "payment_method_id" TEXT NOT NULL,

    CONSTRAINT "payment_methods_in_order_pkey" PRIMARY KEY ("payment_method_id","order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cars_license_plate_key" ON "cars"("license_plate");

-- CreateIndex
CREATE UNIQUE INDEX "clients_cpf_key" ON "clients"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "orders_number_key" ON "orders"("number");

-- AddForeignKey
ALTER TABLE "client_cars" ADD CONSTRAINT "client_cars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "client_cars" ADD CONSTRAINT "client_cars_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods_in_order" ADD CONSTRAINT "payment_methods_in_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_methods_in_order" ADD CONSTRAINT "payment_methods_in_order_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
