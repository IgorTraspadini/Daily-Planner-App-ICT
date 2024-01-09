const currentDay = $("#currentDay");
const ElemDiv = $(".container-fluid");
var interval;

const timeArray = [["8AM", 8], ["9AM", 9], ["10AM", 10], ["11AM", 11],
["12PM", 12], ["1PM", 13], ["2PM", 14], ["3PM", 15], ["4PM", 16], ["5PM", 17]];

if (JSON.parse(localStorage.getItem("tasksList")) === null) {
  let taskArray = {
    "8": "",
    "9": "",
    "10": "",
    "11": "",
    "12": "",
    "13": "",
    "14": "",
    "15": "",
    "16": "",
    "17": "",
  };
  localStorage.setItem("tasksList", JSON.stringify(taskArray));
}

currentDay.text(dayjs().format("dddd, MMMM D"));
$.each(timeArray, function (i, v) {
  let Row = $("<div>").addClass("row");
  let Time = $("<div>").addClass("hour col-sm-2 col-lg-1");
  let Descr = $("<textarea>").addClass("description col-sm col-lg");
  let bt = $("<div>").addClass("saveBtn col-sm-2 col-lg-1");
  Time.html('<br><br>' + v[0]);
  Row.attr("data-time", v[1]);
  Row.append(Time, Descr, bt);
  ElemDiv.append(Row);
})

function upDateGrid(e) {
  $.each(timeArray, function (i, v) {
    const ElemGrid = $(`.row[data-time='${v[1]}']`);
    const tasks = JSON.parse(localStorage.getItem("tasksList"));
    const diff = v[1] - parseInt(dayjs().format('H'));
    ElemGrid.children(".description").text(tasks[v[1]]);
    switch (true) {
      case diff < 0:
        ElemGrid.children(".description").addClass("past");
        break;
      case diff == 0:
        ElemGrid.children(".description").addClass("present");
        break;
      default:
        ElemGrid.children(".description").addClass("future");
        break;
    }
  })
  let nowTime = dayjs().format('D/M/YYYY H:mm');
  let gridTime = dayjs(dayjs().format('D/M/YYYY').toString() + dayjs().format(' H').toString() + ':59');
  interval = gridTime.diff(nowTime, 'millisecond', true) + 20;
  setTimeout(upDateGrid, interval);
}

ElemDiv.on("click", ".saveBtn", function (e) {
  const tasks = JSON.parse(localStorage.getItem("tasksList"));
  let key = $(e.target).parent().attr("data-time").toString();
  tasks[key] = $(e.target).siblings(".description").val();
  localStorage.setItem("tasksList", JSON.stringify(tasks));
}
)

upDateGrid();

