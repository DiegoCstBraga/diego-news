const ENDPOINT = "http://localhost:3000/api/v1/status";

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch(ENDPOINT);

  const { status } = response;

  console.log({ response });

  expect(status).toBe(200);
});
