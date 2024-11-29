-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "index" INTEGER NOT NULL,
    "tag" TEXT NOT NULL,
    "agent" TEXT NOT NULL,
    "parent_index" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Count" (
    "id" SERIAL NOT NULL,
    "count" INTEGER NOT NULL,
    "from_parent_index" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "Count_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Count" ADD CONSTRAINT "Count_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
