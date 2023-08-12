-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_product_id_fkey";

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
