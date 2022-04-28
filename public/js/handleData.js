window.onload = function () {
  handleLocal();
  document.getElementById("xlsxFile").addEventListener("change", function (e) {
    var files = e.target.files;
    if (files.length == 0) return;
    var f = files[0];
    console.log(f.name);
    document.querySelector("footer .about a:nth-child(2)").innerHTML = f.name;
    if (!/\.xlsx$/g.test(f.name)) return alert("仅支持读取xlsx格式！");
    handleUpload(f);
  });
};

function handleUpload(file) {
  var reader = new FileReader();
  reader.onload = function (e) {
    var data = e.target.result;
    var workbook = XLSX.read(data, { type: "binary" });
    data = handleAllSheet(workbook);
    window.localStorage.setItem("408dataAll", data);
  };
  reader.readAsBinaryString(file);
}

function handleLocal() {
  var xhr = new XMLHttpRequest();
  xhr.open("get", "/data/data.xlsx", true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function () {
    if (xhr.status == 200) {
      var data = new Uint8Array(xhr.response);
      data = XLSX.read(data, { type: "array" });
      data = handleAllSheet(data);
      window.localStorage.setItem("408dataAll", data);
    }
  };
  xhr.send();
}

function tolist(csv, sheetNames) {
  var beginTime = +new Date();
  sheetNames = sheetNames.split("==");
  let Data = { name: sheetNames, teachers: [] };
  csv = csv.split("\n");
  var teacher;
  var course;
  var chapter;
  var lesson;
  var p = [-1, -1, -1, -1];
  for (let i = 1; i < csv.length; i++) {
    let row = csv[i];
    let cells = row.split(",");
    if (!cells[5]) return Data;
    if (cells[0]) {
      if (cells[0].indexOf("http") > -1 || cells[0].indexOf("file") > -1) {
        // console.log(cells[0].indexOf("http"));
        // console.log(Data.teachers[p[0]].name);
        Data.teachers[p[0]].cover = cells[0];
      } else {
        teacher = cells[0].split("==");
        p.splice(0, 4, p[0] + 1, -1, -1, -1);
        Data.teachers.push({ name: teacher, courses: [] });
      }
    }
    if (cells[1]) {
      course = cells[1].split("==");

      // console.log(course);
      p.splice(1, 3, p[1] + 1, -1, -1);
      let obj = { name: course, chapters: []};

        obj.otherName = cells[2] || course[0];
      
      Data.teachers[p[0]].courses.push(obj);
    }
    if (cells[3]) {
      chapter = cells[3].split("==");
      p.splice(2, 2, p[2] + 1, -1);
      let obj = {
        name: chapter,
        lessons: [],
        cover: [cells[4] || "默认位置", ["#333", 22, 68]],
      };
      Data.teachers[p[0]].courses[p[1]].chapters.push(obj);
    }
    if (cells[5]) {
      lesson = cells[5];
      p.splice(3, 1, p[2] + 1);
      let duration = cells[7]
      let obj = { name: lesson, duration:duration,url:cells[6]||""};
      Data.teachers[p[0]].courses[p[1]].chapters[p[2]].lessons.push(obj);
    }
  }
  // console.log(Data);
  var endTime = +new Date();
  console.log("共计" + (endTime - beginTime) + "ms");
  return Data;
}

function handleAllSheet(workbook) {
  var sheetNames = workbook.SheetNames;
  let DataAll = [];
  let Recommend = [];
  let sheetIndex = 0;
  for (let i = 0; i < sheetNames.length; i++) {
    if (sheetNames[i] == "Config") continue;
    if (sheetNames[i] == "Tips") continue;
    var worksheet = workbook.Sheets[sheetNames[i]];
    var csv = XLSX.utils.sheet_to_csv(worksheet);
    DataAll.push(tolist(csv, sheetNames[i]));
    Recommend.push(getRecommend(csv, sheetNames[i], sheetIndex));
    sheetIndex++;
  }
  return JSON.stringify([DataAll, Recommend]);
}

function getRecommend(csv, sheetName, sheetIndex) {
  let rec = {};
  rec.subject = sheetName.split("==")[0];
  rec.groups = [];

  csv = csv.split("\n");
  let subList = [];
  let teacher = [];
  let subjectNum = 0;
  for (let i = 1; i < csv.length; i++) {
    let row = csv[i];
    let cells = row.split(",");

    if (cells[1]) {
      // 找下一个cells[1]，计算找的次数
      // 找一共多少章节
      let chapterNum = 0;
      let lessonNum;
      for (let j = i + 1; j < csv.length; j++) {
        if (csv[j].split(",")[1]) {
          lessonNum = j - i;
          break;
        } else {
          if (csv[j].split(",")[3]) {
            chapterNum++;
            // console.log(csv[j].split(",")[3]);
          }
        }
        lessonNum = j - i;
        // subjectNum = 0
      }

      // 构建对象
      if (cells[0].split("==")[0]) {
        teacher.unshift(cells[0].split("==")[0]);
        subjectNum = 0;
      }

      let subject = cells[1].split("==")[0];
      if (subList.indexOf(subject) < 0) {
        // 不在列表中，subjectNum++
        // console.log(subject, "不在列表中");
        subjectNum++;
      } else {
        // console.log(subject, "我在在列表中", subjectNum);
        subjectNum++;
      }

      let obj = {
        name: teacher[0] + "《" + (cells[2].split("==")[0] || subject) + "》",
        cover: csv[i+1].split(",")[2],
        lessonNum: lessonNum,
        chapterNum: chapterNum,
        id: [sheetIndex, teacher.length - 1, subjectNum - 1, 0, 0].join("."),
      };

      // 如果没有这个sub 就push，如果有，就插入

      if (subList.indexOf(subject) < 0) {
        subList.push(subject);
        rec.groups.push({ name: subject, list: [obj] });
      } else {
        rec.groups[subList.indexOf(subject)].list.push(obj);
      }
      // console.log(obj.id, obj.name);
    }
  }
  return rec;
}
