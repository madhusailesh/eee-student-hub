require("dotenv").config();

const mongoose = require("mongoose");

const Faculty = require("../src/models/faculty/faculty.model");
const Subject = require("../src/models/subject/subject.model");

const facultyData = require("./data/faculty");

async function seedFaculty() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    await Faculty.deleteMany({});

    console.log("🗑️ Old faculty deleted");

    for (const faculty of facultyData) {
      const subjectDocs = await Subject.find({
        code: { $in: faculty.subjects },
      });

      await Faculty.create({
        ...faculty,
        subjects: subjectDocs.map((subject) => subject._id),
      });
    }

    console.log("✅ Faculty seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedFaculty();