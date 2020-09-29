console.log('Hello');

// import {getFCP} from 'https://unpkg.com/web-vitals@0.2.4/dist/web-vitals.es5.min.js?module';

// getFCP(console.log);


// Keep track of whether (and when) the page was first hidden, see:
// https://github.com/w3c/page-visibility/issues/29
// NOTE: ideally this check would be performed in the document <head>
// to avoid cases where the visibility state changes before this code runs.
let firstHiddenTime = document.visibilityState === 'hidden' ? 0 : Infinity;
document.addEventListener('visibilitychange', (event) => {
  firstHiddenTime = Math.min(firstHiddenTime, event.timeStamp);
}, {once: true});

// Sends the passed data to an analytics endpoint. This code
// uses `/analytics`; you can replace it with your own URL.
function sendToAnalytics(data) {
  const body = JSON.stringify(data);
  console.log('body is ', body);
  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
 // (navigator.sendBeacon && navigator.sendBeacon('/analytics', body)) ||
  //    fetch('/analytics', {body, method: 'POST', keepalive: true});
}

// Use a try/catch instead of feature detecting `paint`
// support, since some browsers throw when using the new `type` option.
// https://bugs.webkit.org/show_bug.cgi?id=209216
try {
  function onPaintEntry(entry, po) {
    // Only report FCP if the page wasn't hidden prior to
    // the entry being dispatched. This typically happens when a
    // page is loaded in a background tab.
    if (entry.name === 'first-contentful-paint' &&
        entry.startTime < firstHiddenTime) {
      // Disconnect the observer.
      po.disconnect();

      // Report the FCP value to an analytics endpoint.
      sendToAnalytics({fcp: entry.startTime});
    }
  }

  // Create a PerformanceObserver that calls `onPaintEntry` for each entry.
  const po = new PerformanceObserver((entryList, po) => {
    entryList.getEntries().forEach((entry) => onPaintEntry(entry, po));
  });

  // Observe entries of type `paint`, including buffered entries,
  // i.e. entries that occurred before calling `observe()` below.
  po.observe({
    type: 'paint',
    buffered: true,
  });
} catch (e) {
    console.log('error is ', e);
  // Do nothing if the browser doesn't support this API.
}

window.getFCP((fcpValue, node) => {
    console.log("First Contentful Paint", fcpValue);
    console.log("DOM node resposible for FCP ", fcpValue);
  });