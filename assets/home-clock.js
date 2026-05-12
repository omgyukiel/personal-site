const clock = document.getElementById("home-clock");

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "America/Los_Angeles",
  timeZoneName: "short",
});

function updateClock() {
  if (!clock) return;

  if (window.__HOME_CLOCK_TEST_VALUE__) {
    clock.dateTime = "2026-05-12T16:00:00.000Z";
    clock.textContent = window.__HOME_CLOCK_TEST_VALUE__;
    return;
  }

  const now = new Date();
  clock.dateTime = now.toISOString();
  clock.textContent = formatter.format(now).replace(",", "");
}

updateClock();

if (!window.__HOME_CLOCK_TEST_VALUE__) {
  setInterval(updateClock, 1000);
}
