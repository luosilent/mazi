var maintainStartTime = new Date(2018, 8, 14, 0, 40);
var maintainStopTime = new Date(2018, 8, 14, 5, 0);
if (new Date() > maintainStartTime && new Date() < maintainStopTime) {
  location.href = location.origin + '/maintain.html';
}
