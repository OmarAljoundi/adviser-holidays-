-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" JSONB,
    "order" INTEGER NOT NULL DEFAULT 1,
    "is_active" BOOLEAN,
    "is_office" BOOLEAN,
    "show_on_service" BOOLEAN NOT NULL DEFAULT true,
    "show_on_europe" BOOLEAN NOT NULL DEFAULT false,
    "seo" JSONB,
    "slug" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_attributes" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "order" INTEGER,
    "seo" JSONB,
    "location_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "location_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_tours" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "location_attr_id" INTEGER NOT NULL,
    "tour_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "location_tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number_of_days" INTEGER NOT NULL,
    "code" TEXT,
    "slug" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "seo" JSONB,
    "is_active" BOOLEAN,
    "is_ticket_included" BOOLEAN,
    "start_day" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "price_single" DOUBLE PRECISION,
    "price_double" DOUBLE PRECISION,
    "price_single_sa" DOUBLE PRECISION,
    "price_double_sa" DOUBLE PRECISION,
    "price_single_jo" DOUBLE PRECISION,
    "price_double_jo" DOUBLE PRECISION,
    "tour_prices" JSONB[],
    "tour_countries" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tour_hotels" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tour_includes" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "tour_excludes" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "tour_sections" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "airpot_coming" TEXT,
    "airpot_going" TEXT,
    "additional_Info" TEXT,
    "additional_service" JSONB[] DEFAULT ARRAY[]::JSONB[],
    "external_file" JSONB,
    "type_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "image" JSONB NOT NULL DEFAULT '{}',
    "show_on_service" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "tour_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passkey" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "publicKey" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "credentialID" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "deviceType" TEXT NOT NULL,
    "backedUp" BOOLEAN NOT NULL,
    "transports" TEXT,
    "createdAt" TIMESTAMP(3),

    CONSTRAINT "passkey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "setting" (
    "id" SERIAL NOT NULL,
    "section" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdBy" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "setting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "setting_section_key" ON "setting"("section");

-- AddForeignKey
ALTER TABLE "location_attributes" ADD CONSTRAINT "location_attributes_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_tours" ADD CONSTRAINT "location_tours_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_tours" ADD CONSTRAINT "location_tours_location_attr_id_fkey" FOREIGN KEY ("location_attr_id") REFERENCES "location_attributes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location_tours" ADD CONSTRAINT "location_tours_tour_id_fkey" FOREIGN KEY ("tour_id") REFERENCES "tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tour" ADD CONSTRAINT "tour_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "tour_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "passkey" ADD CONSTRAINT "passkey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
