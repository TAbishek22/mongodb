const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/StudentData")
    .then(() => console.log("DataBase"))
    .catch(() => console.log("NoData"));
const subSchema = new mongoose.Schema({
    grade1: String,
    grade2: String,
    grade3: String,
});
const subSchema2 = new mongoose.Schema({
    sub1: String,
    sub2: String,
    sub3: String,
});
const academicRecords = new mongoose.Schema({
    student_ID: Number,
    name: String,
    grades: [subSchema],
    subjects: [subSchema2],
});

const coCurricularActivities = new mongoose.Schema({
    student_ID: Number,
    name: String,
    activityType: String,
    duration: Number,
    achievement: String,
});

const academic_Records = new mongoose.model(
    "Academic-Records ",
    academicRecords
);
const co_curricular_activities = new mongoose.model(
    "Co_Curricular_activities-Records ",
    coCurricularActivities
);
//Create or Insert

const create = async () => {
    try {
        console.log("Data stored");
        const allData = await academic_Records.insertMany([
            {
                student_ID: 1,
                name: "T.Abishek",
                grades: { grade1: "A+", grade2: "A+", grade3: "A+" },
                subjects: { sub1: "Maths", sub2: "Science", sub3: "Biology" },
            },
            {
                student_ID: 2,
                name: "K.H. Durga",
                grades: { grade1: "A+", grade2: "A+", grade3: "A+" },
                subjects: { sub1: "Maths", sub2: "Science", sub3: "Biology" },
            },
            {
                student_ID: 3,
                name: "T.Bhuvaneshwari",
                grades: { grade1: "A+", grade2: "A+", grade3: "A+" },
                subjects: { sub1: "Maths", sub2: "Science", sub3: "Biology" },
            },
        ]);
        // const resilt = await academic_Records.insertMany([exp, node, vue]);
    } catch (e) {
        console.log("Error in first", e);
    }
};

const createDocument = async () => {
    try {
        console.log("Second DataStored");
        const allData2 = await co_curricular_activities.insertMany([
            {
                student_ID: 1,
                name: "B.Thirunavukkarasu",
                activityType: "Star-Gazing",
                duration: 1,
                achievement: "In-Progress",
            },
            {
                student_ID: 3,
                name: "hello",
                activityType: "drawing",
                duration: 1,
                achievement: "---",
            },
        ]);
        // const resilt2 = await co_curricular_activities.insertMany([exp, node, vue]);
    } catch (e) {
        console.log("Error In Second-Data", e);
    }
};

create();
createDocument();


//Read

const getDocument = async () => {
    // const result=await courseRecord.find();

    //const result=await courseRecord.find({title:'React JS'});

    const result = await academic_Records.find(
        { name: "K.H. Durga" },
        { student_ID: 0 }
    );

    console.log(result);
};

getDocument();


// Update
const updateDocument = async () => {
    const result2 = await academic_Records.updateOne(
        { name: "K.H. Durga" },
        {
            $set: { student_ID: 6, "grades.$[].grade1": "O" },
            $currentDate: { lastModified: true },
        }
    );
    console.log("The updated data", result2);
};

updateDocument();


//Delete



const deleteDocument = async () => {
    try {
        const result4 = await co_curricular_activities.deleteOne({
            name: "hello",
        });
        console.log("Deleted the data");
    } catch (e) {
        console.log("Error in deletion", e);
    }
};
deleteDocument();