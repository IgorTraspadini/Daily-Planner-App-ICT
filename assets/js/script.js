const currentDay = $("#currentDay");
const ElemDiv = $(".container-fluid");
var interval = 1000;

const timeArray = [["8AM", 8], ["9AM", 9], ["10AM", 10], ["11AM", 11],
["12PM", 12], ["1PM", 13], ["2PM", 14], ["3PM", 15], ["4PM", 16], ["5PM", 17]];


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
    const diff = v[1] - parseInt(dayjs().format('H'));
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
  clearInterval(upDateGrid);
  const nowTime = dayjs().format('D/M/YYYY H:mm');
  const gridTime = dayjs(dayjs().format('D/M/YYYY').toString() + dayjs().format(' H').toString() + ':59');
  interval = gridTime.diff(nowTime, 'millisecond', true) + 20;
  console.log(interval);
}

//upDateGrid();
//setInterval(upDateGrid, interval);


const nowTime = dayjs().format('D/M/YYYY H:mm');
const gridTime = dayjs(dayjs().format('D/M/YYYY').toString() + dayjs().format(' H').toString() + ':59');
const hourDiff = gridTime.diff(nowTime, 'millisecond', true) + 20;
console.log(dayjs().format('D/M/YYYY').toString() + dayjs().format(' H').toString() + ':00');
console.log(hourDiff);
console.log(nowTime);
