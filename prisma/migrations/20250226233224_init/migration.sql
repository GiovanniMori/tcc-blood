-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'ACCEPTED', 'CANCELED');

-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE');

-- CreateTable
CREATE TABLE "Hemocenter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "start_hour" TIMESTAMP(3) NOT NULL,
    "end_hour" TIMESTAMP(3) NOT NULL,
    "interval" INTEGER NOT NULL,
    "max_capacity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hemocenter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "hemocenter_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "donorUserId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "blood_donation_id" TEXT,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BloodDonation" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "donor_id" TEXT NOT NULL,
    "hemocenter_id" TEXT NOT NULL,
    "blood_type" "BloodType" NOT NULL,
    "volume" DOUBLE PRECISION NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BloodDonation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
    "hemocenterId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donor" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "last_donation_date" TIMESTAMP(3),
    "cpf" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "blood_type" "BloodType",
    "referral_by" TEXT,
    "referral_code" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birth_date" TIMESTAMP(3),

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follows" (
    "follower_id" TEXT NOT NULL,
    "following_id" TEXT NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("follower_id","following_id")
);

-- CreateTable
CREATE TABLE "Mission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "limit" INTEGER NOT NULL,
    "last_update" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reward" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT,
    "points" INTEGER NOT NULL,

    CONSTRAINT "Reward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "generated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reedemed_by" TEXT,
    "reward_id" TEXT NOT NULL,
    "sponsor_id" TEXT NOT NULL,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DonorToMission" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_blood_donation_id_key" ON "Appointment"("blood_donation_id");

-- CreateIndex
CREATE INDEX "Appointment_blood_donation_id_idx" ON "Appointment"("blood_donation_id");

-- CreateIndex
CREATE INDEX "Appointment_donorUserId_idx" ON "Appointment"("donorUserId");

-- CreateIndex
CREATE INDEX "Appointment_hemocenter_id_idx" ON "Appointment"("hemocenter_id");

-- CreateIndex
CREATE INDEX "BloodDonation_donor_id_idx" ON "BloodDonation"("donor_id");

-- CreateIndex
CREATE INDEX "BloodDonation_hemocenter_id_idx" ON "BloodDonation"("hemocenter_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_hemocenterId_idx" ON "User"("hemocenterId");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_nickname_key" ON "Donor"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_cpf_key" ON "Donor"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_referral_code_key" ON "Donor"("referral_code");

-- CreateIndex
CREATE INDEX "Donor_id_idx" ON "Donor"("id");

-- CreateIndex
CREATE INDEX "Follows_follower_id_idx" ON "Follows"("follower_id");

-- CreateIndex
CREATE INDEX "Follows_following_id_idx" ON "Follows"("following_id");

-- CreateIndex
CREATE INDEX "Sponsor_id_idx" ON "Sponsor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Voucher_code_key" ON "Voucher"("code");

-- CreateIndex
CREATE INDEX "Voucher_sponsor_id_idx" ON "Voucher"("sponsor_id");

-- CreateIndex
CREATE INDEX "Voucher_reward_id_idx" ON "Voucher"("reward_id");

-- CreateIndex
CREATE INDEX "Voucher_reedemed_by_idx" ON "Voucher"("reedemed_by");

-- CreateIndex
CREATE UNIQUE INDEX "_DonorToMission_AB_unique" ON "_DonorToMission"("A", "B");

-- CreateIndex
CREATE INDEX "_DonorToMission_B_index" ON "_DonorToMission"("B");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_hemocenter_id_fkey" FOREIGN KEY ("hemocenter_id") REFERENCES "Hemocenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_donorUserId_fkey" FOREIGN KEY ("donorUserId") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_blood_donation_id_fkey" FOREIGN KEY ("blood_donation_id") REFERENCES "BloodDonation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodDonation" ADD CONSTRAINT "BloodDonation_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BloodDonation" ADD CONSTRAINT "BloodDonation_hemocenter_id_fkey" FOREIGN KEY ("hemocenter_id") REFERENCES "Hemocenter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_hemocenterId_fkey" FOREIGN KEY ("hemocenterId") REFERENCES "Hemocenter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sponsor" ADD CONSTRAINT "Sponsor_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_reedemed_by_fkey" FOREIGN KEY ("reedemed_by") REFERENCES "Donor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_reward_id_fkey" FOREIGN KEY ("reward_id") REFERENCES "Reward"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_sponsor_id_fkey" FOREIGN KEY ("sponsor_id") REFERENCES "Sponsor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DonorToMission" ADD CONSTRAINT "_DonorToMission_A_fkey" FOREIGN KEY ("A") REFERENCES "Donor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DonorToMission" ADD CONSTRAINT "_DonorToMission_B_fkey" FOREIGN KEY ("B") REFERENCES "Mission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
