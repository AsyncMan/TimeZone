let hour = document.querySelector("div#hour");
let minute = document.querySelector("div#minute");
let seconds = document.querySelector("div#seconds");
let timeZone = document.querySelector("div#timezone");
let dateElement = document.querySelector("div#date");
let changeButton = document.querySelector("button#change");
let timeZoneSelectorElement = document.querySelector(
  "select#time-zone-selector",
);

const timeZones = Intl.supportedValuesOf("timeZone");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

dayjs.extend(window.dayjs_plugin_timezone);
dayjs.extend(window.dayjs_plugin_utc);

let currentTimeZone = dayjs.tz.guess();

console.log(dayjs.tz.guess());
setInterval(setTime, 1);

const openModal = () => MicroModal.show("modal-1");

function changeTimeZone() {
  currentTimeZone =
    timeZoneSelectorElement.options[timeZoneSelectorElement.selectedIndex].text;
  MicroModal.close("modal-1");
}

function getAllTimeZone() {
  let output = "";
  for (let timeZone of timeZones) {
    if (timeZone == currentTimeZone) {
      output += `<option value="${timeZone}" selected>${timeZone}</option>`;
    } else {
      output += `<option value="${timeZone}">${timeZone}</option>`;
    }
  }
  return output;
}

document.addEventListener("DOMContentLoaded", () => {
  MicroModal.init();
});
timeZoneSelectorElement.innerHTML = getAllTimeZone();

timeZone.addEventListener("mousedown", openModal);
changeButton.addEventListener("mousedown", changeTimeZone);

function setTime() {
  timeZone.textContent = currentTimeZone;
  hour.textContent = dayjs().tz(currentTimeZone).hour();
  minute.textContent = dayjs().tz(currentTimeZone).minute();
  seconds.textContent = dayjs().tz(currentTimeZone).second();
  let todayDay = days[dayjs().tz(currentTimeZone).day()];
  let todayDate = dayjs().tz(currentTimeZone).date();
  let todayMonth = months[dayjs().tz(currentTimeZone).month()];
  let todayYear = dayjs().tz(currentTimeZone).year();
  dateElement.textContent = `${todayDay}, ${todayDate},${todayMonth},${todayYear}`;
}
