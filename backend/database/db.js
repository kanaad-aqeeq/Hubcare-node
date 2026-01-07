const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

/* =========================
   ENV & MODE
========================= */
const isProduction = process.env.NODE_ENV === "production";

/* =========================
   SEQUELIZE INSTANCE
========================= */
const sequelize = new Sequelize(
  process.env.DB_BASE_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DIALECT || "postgres",
    logging: false,
  }
);

/* =========================
   CONNECTION CHECK
========================= */
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

/* =========================
   DB OBJECT
========================= */
const db = {
  sequelize,
  Sequelize,
};

/* =========================
   LOAD MODELS
========================= */
const modelsDir = path.join(__dirname, "../models");

fs.readdirSync(modelsDir)
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const modelDef = require(path.join(modelsDir, file));
    if (typeof modelDef === "function") {
      const model = modelDef(sequelize, DataTypes);
      db[model.name] = model;
    } else {
      console.warn(`⚠️ Skipping invalid model file: ${file}`);
    }
  });

/* =========================
   SET ASSOCIATIONS
========================= */
Object.keys(db).forEach((modelName) => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
});

/* =========================
   CREATE ADMIN USER
========================= */
const createAdminUser = async () => {
  try {
    const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_USERNAME } = process.env;

    if (!db.user) {
      throw new Error("User model not initialized");
    }

    const existingAdmin = await db.user.findOne({
      where: { email: ADMIN_EMAIL },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

      await db.user.create({
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password: hashedPassword,
        role: "Admin",
      });

      console.log("✅ Admin user created");
    } else {
      console.log("ℹ️ Admin user already exists");
    }
  } catch (err) {
    console.error("❌ Admin creation failed:", err);
  }
};

/* =========================
   SYNC DATABASE
========================= */
db.sequelize
  .sync({
    force: false,
    alter: !isProduction, // ❗ SAFE: alter only in local/dev
  })
  .then(async () => {
    console.log("✅ Database synced");
    await createAdminUser();
  })
  .catch((err) => {
    console.error("❌ Sync error:", err);
  });

module.exports = db;
