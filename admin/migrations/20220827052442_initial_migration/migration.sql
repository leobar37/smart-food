-- CreateEnum
CREATE TYPE "UserRolType" AS ENUM ('ADMIN', 'STAFF');

-- CreateEnum
CREATE TYPE "OrderStatusType" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'DELIVERED', 'IN_CART');

-- CreateEnum
CREATE TYPE "OrderPaymentMethodType" AS ENUM ('CASH', 'CREDIT_CARD', 'PLIN', 'YAPE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',
    "rol" "UserRolType",
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL DEFAULT E'',
    "name" TEXT NOT NULL DEFAULT E'',
    "lastName" TEXT NOT NULL DEFAULT E'',
    "direction" TEXT NOT NULL DEFAULT E'',
    "email" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "photo" JSONB,
    "name" TEXT NOT NULL DEFAULT E'',
    "count" INTEGER,
    "price" DOUBLE PRECISION,
    "excerpt" TEXT NOT NULL DEFAULT E'',
    "category" TEXT,
    "description" TEXT NOT NULL DEFAULT E'',
    "isAvalaible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "limit" INTEGER,
    "label" TEXT NOT NULL DEFAULT E'',
    "product" TEXT,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubOption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "option" TEXT,

    CONSTRAINT "SubOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'',
    "description" TEXT NOT NULL DEFAULT E'',
    "title" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderLine" (
    "id" TEXT NOT NULL,
    "order" TEXT,
    "product" TEXT,
    "createdAt" TIMESTAMP(3),
    "quantity" INTEGER,
    "price" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "selection" JSONB DEFAULT '{}',

    CONSTRAINT "OrderLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "orderNumber" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" "OrderStatusType" DEFAULT E'IN_CART',
    "client" TEXT,
    "metadata" JSONB DEFAULT '{}',
    "paymentMethod" "OrderPaymentMethodType",

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Option_product_idx" ON "Option"("product");

-- CreateIndex
CREATE INDEX "SubOption_option_idx" ON "SubOption"("option");

-- CreateIndex
CREATE INDEX "OrderLine_order_idx" ON "OrderLine"("order");

-- CreateIndex
CREATE INDEX "OrderLine_product_idx" ON "OrderLine"("product");

-- CreateIndex
CREATE INDEX "Order_client_idx" ON "Order"("client");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubOption" ADD CONSTRAINT "SubOption_option_fkey" FOREIGN KEY ("option") REFERENCES "Option"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_order_fkey" FOREIGN KEY ("order") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_client_fkey" FOREIGN KEY ("client") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;
