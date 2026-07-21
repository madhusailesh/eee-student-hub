require("dotenv").config();

const mongoose = require("mongoose");

const Subject = require("../src/models/subject/subject.model");
const subjects = require("./data/subjects");

async function seedSubjects() {
  try {
    // Connect Database
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    // Delete old data
    await Subject.deleteMany({});

    console.log("🗑️ Old subjects deleted");

    // Insert new data
    await Subject.insertMany(subjects);

    console.log(`✅ ${subjects.length} subjects inserted successfully`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder Error:", error);

    process.exit(1);
  }
}

seedSubjects();