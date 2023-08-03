-- CreateEnum
CREATE TYPE "StatusPermission" AS ENUM ('DELETE', 'EDIT');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(5,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(5,2) NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "status" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permissions" "StatusPermission"[] DEFAULT ARRAY['DELETE', 'EDIT']::"StatusPermission"[],

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "car_info" TEXT NOT NULL,
    "budget" DECIMAL(5,2) NOT NULL,
    "priority" "Priority" NOT NULL DEFAULT 'LOW',
    "deadline" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status_id" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services_in_order" (
    "order_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,

    CONSTRAINT "services_in_order_pkey" PRIMARY KEY ("order_id","service_id")
);

-- CreateTable
CREATE TABLE "products_in_order" (
    "order_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "products_in_order_pkey" PRIMARY KEY ("product_id","order_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "services_name_key" ON "services"("name");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_key" ON "products"("name");

-- CreateIndex
CREATE UNIQUE INDEX "status_name_key" ON "status"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services_in_order" ADD CONSTRAINT "services_in_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "services_in_order" ADD CONSTRAINT "services_in_order_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_in_order" ADD CONSTRAINT "products_in_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_in_order" ADD CONSTRAINT "products_in_order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
