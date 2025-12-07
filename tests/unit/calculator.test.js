const calculadora = require("../../models/calculadora");

test("Somar 2 + 2 deveria retornar 4", () => {
  const resultado = calculadora.sum(2, 2);
  expect(resultado).toBe(4);
});

test("Somar 5 + 100 deveria retornar 105", () => {
  const resultado = calculadora.sum(5, 100);
  expect(resultado).toBe(105);
});

test("Somar 'banana' + 100 deveria retornar 'Error'", () => {
  const resultado = calculadora.sum("banana", 100);
  expect(resultado).toBe("Error");
});
