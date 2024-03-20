export const getSteps = async () =>
  fetch("/api/steps", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((e) => e.json())
