import express from "express";
import { logging } from "./middlewares/logging.js";
import { log } from "console";
let cars = [
  {
    id: 1,
    name: "BMW",
  },
  {
    id: 2,
    name: "Mercedes",
  },
  {
    id: 3,
    name: "Audi",
  },
];
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logging);

app.get("/", (req, res) => {
  res.status(200).json(cars);
});
app.post("/add", (req, res) => {
  const newCar = req.body;
  cars.push(newCar);
  res.status(201).json(cars);
});
app.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  cars = cars.filter((car, index) => car.id != id);
  console.log(cars);

  res.send(cars);
});
app.put("/edit/:id", (req, res) => {
  let newCar = req.body;
  let id = req.params.id;
  console.log(id);
  cars = cars.map((car) => (car.id == id ? newCar : car));
  res.status(200).json(cars);
});

app.listen(6903, () => {
  console.log("Server is running on port 6903");
});
