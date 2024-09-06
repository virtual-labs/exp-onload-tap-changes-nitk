let txt = "Select Input Voltage";
let speed = 100;
let i = 0;

let leftVoltUp = 33.0;
let leftVoltDown = 11.0;
let rightVoltUp = 33.0;
let rightVoltDown = 11.0;
let voltageChoosen = 33;
let popUpText =
  "Raising tap setting to decrease 11KV voltage is not permitted as input voltage is less than 33KV";
let popUpTextLower =
  "Lowering tap setting to increase 11KV voltage is not permitted as input voltage 33KV";
let popUpRegulatedText =
  "The voltage is regulated to: 11.02KV with 5.0% tap lowered. Number of times tap lowered to be clicked: 4";
function typeWriter() {
  if (i < txt.length) {
    document.getElementById("tag").innerHTML += `<i><b>${txt.charAt(
      i
    )}</b></i>`;
    i++;
    setTimeout(typeWriter, speed);
  } else {
    document.getElementById("tag").innerHTML = "";
    i = 0;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();

let buttonControl = [
  {
    id: "b1",
    voltage: 33,
    voltagePos:
      "position: absolute; left:82px; top: 438px;color: white;font-size: 14px;;cursor: pointer;cursor: pointer",
    clickCount: 0,
    tap: 0,
  },
  {
    id: "b2",
    voltage: 32.5,
    voltagePos:
      "position: absolute; left:144px; top: 438px;color: white;font-size: 14px;cursor: pointer",
    clickCount: 1,
    tap: 0,
  },
  {
    id: "b3",
    voltage: 32.0,
    voltagePos:
      "position: absolute; left:212px; top: 438px;color: white;font-size: 14px;cursor: pointer",
    clickCount: 3,
    tap: 0,
  },
  {
    id: "b4",
    voltage: 31.5,
    voltagePos:
      "position: absolute; left:280px; top: 438px;color: white;font-size: 14px;cursor: pointer",
    clickCount: 4,
    tap: 0,
  },
  {
    id: "b5",
    voltage: 31.0,
    voltagePos:
      "position: absolute; left:348px; top: 438px;color: white;font-size: 14px;cursor: pointer",
    clickCount: 5,
    tap: 0,
  },
  {
    id: "b6",
    voltage: 30.5,
    voltagePos:
      "position: absolute; left:412px; top: 438px;color: white;font-size: 14px;cursor: pointer",
    clickCount: 7,
    tap: 0,
  },
  {
    id: "b7",
    voltage: 30.0,
    voltagePos:
      "position: absolute; left:480px; top: 438px;color: white;font-size: 14px;cursor: pointer",
    clickCount: 8,
    tap: 0,
  },
  {
    id: "b8",
    voltage: 29.5,
    voltagePos:
      "position: absolute; left:548px; top: 438px;color: white;font-size: 14px;cursor: pointer",
    clickCount: 9,
    tap: 0,
  },
  {
    id: "b9",
    voltage: 33.5,
    voltagePos:
      "position: absolute; left:628px; top: 438px;color: white;font-size: 14px;cursor: pointer",
    clickCount: 1,
    tap: 0,
  },
  {
    id: "b10",
    voltage: 34.0,
    voltagePos:
      "position: absolute; left:696px; top: 438px;color: white;font-size: 14px;cursor: pointer",
    clickCount: 2,
    tap: 0,
  },
];

let lower = [
  {
    lowerId: "leftLower",
    tap: 0,
  },
  {
    lowerId: "rightLower",
    tap: 0,
  },
];
let raise = [
  {
    raiseId: "leftRaise",
    tap: 0,
  },
  {
    raiseId: "rightRaise",
    tap: 0,
  },
];

// buttonControl.forEach(function (btn) {
//   let button = document.createElement("img");
//   let volt = document.createElement("p");

//   button.setAttribute("id", btn.id);
//   button.setAttribute("src", "./images/button.png");
//   button.setAttribute("style", btn.buttonPos);
//   button.setAttribute("onclick", `UpdateVoltageOnChange(${btn.voltage})`);
//   volt.innerText = btn.voltage;
//   volt.setAttribute("style", btn.voltagePos);
//   volt.setAttribute("onclick", `UpdateVoltageOnChange(${btn.voltage})`);

//   document.getElementById("canvas0").appendChild(button);
//   document.getElementById("canvas0").appendChild(volt);
// });

function voltageUpdate() {
  document.getElementById("tr1VoltUp").innerHTML = `${parseFloat(
    leftVoltUp.toFixed(2)
  )} KV`;
  document.getElementById("tr1VoltDown").innerHTML = `${parseFloat(
    leftVoltDown.toFixed(2)
  )} KV`;
  document.getElementById("tr2VoltUp").innerHTML = `${parseFloat(
    rightVoltUp.toFixed(2)
  )} KV`;
  document.getElementById("tr2VoltDown").innerHTML = `${parseFloat(
    rightVoltDown.toFixed(2)
  )} KV`;
}

voltageUpdate();

function UpdateVoltageOnChange(element, voltage) {
  document.querySelectorAll(".volts").forEach((volt) => {
    volt.classList.remove("active");
  });

  element.classList.add("active");
  resetButtonClick();
  voltageChoosen = parseFloat(voltage);
  let v1 = voltageChoosen;
  let v2 = voltageChoosen / 3;
  leftVoltUp = v1;
  leftVoltDown = v2;
  rightVoltUp = v1;
  rightVoltDown = v2;
  voltageUpdate();
}

function calculateV2OnRaise(ele) {
  document
    .querySelectorAll(".tap")
    .forEach((t) => t.classList.remove("tap-active"));
  if (ele.id == "leftRaise") {
    document.querySelector("#leftRaise").classList.add("tap-active");
    if (voltageChoosen <= 33) {
      popUpText =
        voltageChoosen == 33
          ? "Raising tap setting to decrease 11KV voltage is not permitted as input voltage is 33KV"
          : "Raising tap setting to decrease 11KV voltage is not permitted as input voltage is less than 33KV";
      showPopup(popUpText);
    } else {
      buttonControl.filter(function (btn) {
        if (btn.voltage == voltageChoosen) {
          raise[0].tap = raise[0].tap + 1;
          if (raise[0].tap <= btn.clickCount) {
            leftVoltDown = leftVoltDown / (1 + 0.0125);
            voltageUpdate();
          } else {
            let percent = 1.25 * btn.clickCount;
            popUpText = `The voltage is regulated to: ${leftVoltDown.toFixed(
              2
            )}KV with ${percent}% tap Raised. Number of times tap raised to be clicked: ${
              btn.clickCount
            }`;
            showPopup(popUpText);
          }
        }
      });
    }
  }
  if (ele.id == "rightRaise") {
    document.querySelector("#rightRaise").classList.add("tap-active");

    if (voltageChoosen <= 33) {
      popUpText =
        voltageChoosen == 33
          ? "Raising tap setting to decrease 11KV voltage is not permitted as input voltage is 33KV"
          : "Raising tap setting to decrease 11KV voltage is not permitted as input voltage is less than 33KV";
      showPopup(popUpText);
    } else {
      buttonControl.filter(function (btn) {
        if (btn.voltage == voltageChoosen) {
          raise[1].tap = raise[1].tap + 1;
          if (raise[1].tap <= btn.clickCount) {
            rightVoltDown = rightVoltDown / (1 + 0.0125);
            voltageUpdate();
          } else {
            let percent = 1.25 * btn.clickCount;
            popUpText = `The voltage is regulated to: ${rightVoltDown.toFixed(
              2
            )}KV with ${percent}% tap Raised. Number of times tap raised to be clicked: ${
              btn.clickCount
            }`;
            showPopup(popUpText);
          }
        }
      });
    }
  }
}
function calculateV2OnLower(ele) {
  document
    .querySelectorAll(".tap")
    .forEach((t) => t.classList.remove("tap-active"));
  if (ele.id == "leftLower") {
    document.querySelector("#leftLower").classList.add("tap-active");

    if (voltageChoosen >= 33) {
      popUpText =
        voltageChoosen == 33
          ? "Lowering tap setting to increase 11KV voltage is not permitted as input voltage 33KV"
          : "Lowering tap setting to increase 11KV voltage is not permitted as input voltage is more than 33KV";
      showPopup(popUpText);
    } else {
      buttonControl.filter(function (btn) {
        if (btn.voltage == voltageChoosen) {
          lower[0].tap = lower[0].tap + 1;
          if (lower[0].tap <= btn.clickCount) {
            leftVoltDown = leftVoltDown / (1 - 0.0125);
            voltageUpdate();
          } else {
            let percent = 1.25 * btn.clickCount;
            popUpText = `The voltage is regulated to: ${leftVoltDown.toFixed(
              2
            )}KV with ${percent}% tap lowered. Number of times tap lowered to be clicked: ${
              btn.clickCount
            }`;
            showPopup(popUpText);
          }
        }
      });
    }
  }
  if (ele.id == "rightLower") {
    document.querySelector("#rightLower").classList.add("tap-active");

    if (voltageChoosen >= 33) {
      popUpText =
        voltageChoosen == 33
          ? "Lowering tap setting to increase 11KV voltage is not permitted as input voltage 33KV"
          : "Lowering tap setting to increase 11KV voltage is not permitted as input voltage is more than 33KV";
      showPopup(popUpText);
    } else {
      buttonControl.filter(function (btn) {
        if (btn.voltage == voltageChoosen) {
          lower[1].tap = lower[1].tap + 1;
          if (lower[1].tap <= btn.clickCount) {
            rightVoltDown = rightVoltDown / (1 - 0.0125);
            voltageUpdate();
          } else {
            let percent = 1.25 * btn.clickCount;
            popUpText = `The voltage is regulated to: ${rightVoltDown.toFixed(
              2
            )}KV with ${percent}% tap lowered. Number of times tap lowered to be clicked: ${
              btn.clickCount
            }`;
            showPopup(popUpText);
          }
        }
      });
    }
  }
}

function showPopup(text) {
  document.getElementById("parentPopup").style.display = "block";
  document.getElementById("popUpContent").innerHTML = `<span class="close"
    onclick="closeModal(event);">Alert</span>
    <p style="text-align:center;padding-top: 20%; font-size: 14px">${text}</p>
    <p style="text-align:center;"><button style="margin:auto;font-size: 14px; cursor: pointer" onclick="closeModal(event)">OK</button></p>
    `;
}

function closeModal(ev) {
  ev.preventDefault();
  document.getElementById("parentPopup").style.display = "none";
}

function resetButtonClick() {
  buttonControl.forEach(function (btn) {
    btn.tap = 0;
  });
  lower.forEach(function (l) {
    l.tap = 0;
  });
  raise.forEach(function (r) {
    r.tap = 0;
  });
}
