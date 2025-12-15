const queue = [];

function addToQueue(job) {
  queue.push(job);
}

function processQueue() {
  if (queue.length === 0) return;

  const job = queue.shift();
  job();

  setImmediate(processQueue);
}

module.exports = {
  addToQueue,
  processQueue
};
