const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
const database = require("./db_conn");
const std = require("./model/standard");
const Standard = mongoose.model("Standard");
const sub = require("./model/subject");
const Subject = mongoose.model("Subject");
const stud = require("./model/student");
const { find } = require("./model/standard");
const Student = mongoose.model("Student");
const port = process.env.PORT || 1111;

// API of Insert Subject
app.post("/insert/subject", async (req, res) => {
  try {
    const subjectObj = {
      name: req.body.name,
    };
    const result = await Subject(subjectObj).save();
    res.send({
      status: 200,
      message: "Subject created Successfilly",
      resultData: result,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: "Unable to create Subject",
    });
  }
});

// API for Insert Standard
app.post("/insert/standard", async (req, res) => {
  try {
    const standardObj = {
      standard: req.body.standard,
    };
    const result = await Standard(standardObj).save();
    res.send({
      status: 200,
      message: "Standard created Successfilly",
      resultData: result,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: "Unable to create Standard",
    });
  }
});

//API for Add Student
app.post("/add/student", async (req, res) => {
  try {
    const studentObj = {
      name: req.body.name,
      rollno: req.body.rollno,
      address: req.body.address,
      mobile_no: req.body.mobile_no,
      standard: req.body.standard,
      subject: req.body.subject,
    };
    const result = await new Student(studentObj).save();
    res.send({
      status: 200,
      message: "Student created Successfilly",
      resultData: result,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: "Unable to create Student",
    });
  }
});

// API for get Unique subject from student having standrad 8th.
app.get("/get/subject/unique", async (req, res) => {
  try {
    let eightStdResult = await Standard.findOne({ standard: "8th std" });
    eightStdResult = await Student.find({
      standard: eightStdResult._id,
    }).populate("subject");
    let eightStdID = eightStdResult.map((e) => e.subject).flat();
    let unique = eightStdID.map((item) => item.name);
    unique = unique.filter((v) => unique.indexOf(v) === unique.lastIndexOf(v));
    res.send({
      status: 200,
      message: "Count of students with subject Mathematics",
      uniqueData: unique,
    });
  } catch (error) {
    res.send({ status: 400, message: "Unable to fetch data" });
  }
});

// API for Get count of student having Math Subject
app.get("/get/count/maths/subject", async (req, res) => {
  try {
    const sub_name = "Maths";
    let subjectId = await Subject.findOne({ name: sub_name });
    let result = await Student.aggregate([
      { $match: { subject: subjectId._id } },
      { $count: "totalStudent" },
    ]);
    res.send({
      status: 200,
      message: "Total count of students with subject Maths",
      resultData: result,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 400,
      message: "Unable to retrive data",
      error,
    });
  }
});

// API for get standatd having  maths subject
app.get("/get/standatd/subject/maths", async (req, res) => {
  try {
    const subName = "Maths";
    let subjectId = await Subject.findOne({ name: subName });
    let studentResult = await Student.find({ subject: subjectId._id });
    let std_id = studentResult.map((ele) => ele.standard);
    let stdResult = await Standard.find({ _id: std_id });
    stdResult = stdResult.map((ele) => ele.standard);
    res.send({
      status: 200,
      message: "Total count of students with subject Maths",
      resultData: stdResult,
    });
  } catch (error) {
    console.log(error);
    res.send({ status: 400, message: "Unable to retrive data", error });
  }
});

//promise pending...
//In this API I have created function A which is called inside B.
//Here I haven't provided await await keyword for asynchronous request
//so it will give promise pending and when we use await keyword
//it will resolve the issue and give us the output
app.get("/get/:name", async (req, res) => {
  try {
    let A = function (data, name) {
      return data.find({ name: name });
    };
    let B = A(Student, req.params.name);
    res.send({
      status: 200,
      message: "Fetch student data by Name",
      resultData: B,
    });
  } catch (error) {
    res.send({ status: 400, message: "Unable to retrive data" });
  }
});

app.listen(port, () => {
  console.log("Server listening on port 1111");
});
