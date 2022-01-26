-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "event_id" TEXT,
    "cloud_name" TEXT NOT NULL,
    "public_id" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "format" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "images_user_id_key" ON "images"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_event_id_key" ON "images"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "images_public_id_key" ON "images"("public_id");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
