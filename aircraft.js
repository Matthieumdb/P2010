// P2010 fleet: one entry per aircraft.
// bew / bewMoment: basic empty weight (lbs) and moment (lbs·m) from the weighing report.
// The other fields are optional and override the page defaults for that aircraft:
// armFront, armRear, armBag, armFuel, fuelDens, mtow, mlw, macDiv, macMin, macMax,
// toHw, toTw, ldHw, ldTw, sfTO, sfLD, xwMax.
window.P2010_FLEET = [
  {
    immat: "EXAMPLE (Oct 5 quiz)",
    bew: 1689,
    bewMoment: 1820,
    note: "Example aircraft from the quiz. The 15 fleet aircraft will be added here."
  }
];
