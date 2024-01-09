const currentDay = $("#currentDay");
const ElemDiv = $(".container-fluid");

const timeArray = ["8AM", "9AM", "10AM", "11AM",
  "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];


currentDay.text(dayjs().format("dddd, MMMM D"));
$.each(timeArray, function (i, v) {
    let Row = $("<div>").addClass("row");
    let Time = $("<div>").addClass("hour col-sm-2 col-lg-1");
    let Descr = $("<textarea>").addClass("description col-sm col-lg");
    let bt = $("<div>").addClass("saveBtn col-sm-2 col-lg-1");
    Time.html('<br><br>' + v);
    Row.attr("data-time",v);
//   Time.text(v);
//    bt.text("X");
    Row.append(Time, Descr, bt);
    ElemDiv.append(Row);

})