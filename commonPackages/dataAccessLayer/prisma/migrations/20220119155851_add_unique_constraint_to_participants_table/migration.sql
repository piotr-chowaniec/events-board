/*
  Warnings:

  - A unique constraint covering the columns `[user_id,event_id]` on the table `participants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "participants_user_id_event_id_key" ON "participants"("user_id", "event_id");
