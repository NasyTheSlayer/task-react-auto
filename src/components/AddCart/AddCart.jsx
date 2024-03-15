import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcCancel } from "react-icons/fc";
import { FiSave } from "react-icons/fi";

import styles from "./AddCart.module.scss";

const AddCart = ({ handleLoading }) => {
  const [newCar, setNewCar] = useState({
    manufacturer: "",
    model: "",
    year: "",
    color: "",
    engine: {
      type: "",
      horsepower: "",
      fuelSystem: {
        type: "",
        efficiency: "",
        emissions: {
          co2: "",
          nox: "",
        },
      },
    },
    battery: {
      capacity: "",
      chargingTime: "",
      warranty: {
        years: "",
        coverage: "",
      },
      chargingStations: [],
    },
    features: [],
    owner: {
      name: "",
      age: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
      },
      contact: {
        phone: "",
        email: "",
      },
      insurance: {
        provider: "",
        policyNumber: "",
        coverage: [],
      },
    },
    maintenanceRecords: [],
  });

  const havigate = useNavigate();
  const handleChange = (event, pass) => {
    const { value } = event.target;
    setNewCar((prevState) => {
      let newState = { ...prevState };
      let carIntLevel = newState;
      const passArray = pass.split(".");
      let lastKey = passArray.pop();

      for (const key of passArray) {
        carIntLevel[key] = { ...carIntLevel[key] };
        carIntLevel = carIntLevel[key];
      }

      carIntLevel[lastKey] = value;

      return newState;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`https://2b812fea10d70016.mokky.dev/cars`, newCar)
      .then(() => {
        console.log("Acces");
        havigate("/task-react-auto/");
        handleLoading();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancel = () => {
    havigate("/task-react-auto/");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.content}>
          <div>
            <label>Марка:</label>
            <input
              type="text"
              name="manufacturer"
              value={newCar.manufacturer}
              required
              onChange={(event) => handleChange(event, "manufacturer")}
            />
          </div>
          <div>
            <label>Модель:</label>
            <input
              type="text"
              name="model"
              value={newCar.model}
              required
              onChange={(event) => handleChange(event, "model")}
            />
          </div>
          <div>
            <label>Рік:</label>
            <input
              type="number"
              name="year"
              value={newCar.year}
              required
              onChange={(event) => handleChange(event, "year")}
            />
          </div>
          <div>
            <label>Колір:</label>
            <input
              type="text"
              name="color"
              value={newCar.color}
              required
              onChange={(event) => handleChange(event, "color")}
            />
          </div>
          <div>
            <h3>Двигун:</h3>
            <div>
              <label>Тип двигуна:</label>
              <input
                type="text"
                name="type"
                value={newCar.engine.type}
                required
                onChange={(event) => handleChange(event, "engine.type")}
              />
            </div>
            <div>
              <label>Потужність:</label>
              <input
                type="text"
                name="horsepower"
                value={newCar.engine.horsepower}
                required
                onChange={(event) => handleChange(event, "engine.horsepower")}
              />
            </div>
            <div>
              <h4>Система пального:</h4>
              <div>
                <label>Тип</label>
                <input
                  type="text"
                  name="type"
                  value={newCar.engine.fuelSystem.type}
                  required
                  onChange={(event) =>
                    handleChange(event, "engine.fuelSystem.type")
                  }
                />
              </div>
              <div>
                <label>Ефективність:</label>
                <input
                  type="text"
                  name="efficiency"
                  value={newCar.engine.fuelSystem.efficiency}
                  required
                  onChange={(event) =>
                    handleChange(event, "engine.fuelSystem.efficiency")
                  }
                />
              </div>
              <div>
                <h5>Викиди:</h5>
                <div>
                  <label>CO2:</label>
                  <input
                    type="text"
                    name="co2"
                    value={newCar.engine.fuelSystem.emissions.co2}
                    required
                    onChange={(event) =>
                      handleChange(event, "engine.fuelSystem.emissions.co2")
                    }
                  />
                </div>
                <div>
                  <label>NOx:</label>
                  <input
                    type="text"
                    name="nox"
                    value={newCar.engine.fuelSystem.emissions.nox}
                    required
                    onChange={(event) =>
                      handleChange(event, "engine.fuelSystem.emissions.nox")
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3>Особливості:</h3>
            <div>
              <input
                type="text"
                name="features"
                value={newCar.features}
                required
                onChange={(event) => handleChange(event, "features")}
              />
            </div>
          </div>
          <div>
            <h3>Власник:</h3>
            <div>
              <label>Ім`я:</label>
              <input
                type="text"
                name="name"
                value={newCar.owner.name}
                required
                onChange={(event) => handleChange(event, "owner.name")}
              />
            </div>
            <div>
              <label>Вік:</label>
              <input
                type="text"
                name="name"
                value={newCar.owner.age}
                required
                onChange={(event) => handleChange(event, "owner.age")}
              />
            </div>
            <div>
              <h4>Адреса:</h4>
              <div>
                <div>
                  <label>Вулиця:</label>
                  <input
                    type="text"
                    name="street"
                    value={newCar.owner.address.street}
                    required
                    onChange={(event) =>
                      handleChange(event, "owner.address.street")
                    }
                  />
                </div>
                <div>
                  <label>Місто:</label>
                  <input
                    type="text"
                    name="city"
                    value={newCar.owner.address.city}
                    required
                    onChange={(event) =>
                      handleChange(event, "owner.address.city")
                    }
                  />
                </div>
                <div>
                  <label>Штат:</label>
                  <input
                    type="text"
                    name="state"
                    value={newCar.owner.address.state}
                    required
                    onChange={(event) =>
                      handleChange(event, "owner.address.state")
                    }
                  />
                </div>
                <div>
                  <label>Індекс:</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={newCar.owner.address.zipCode}
                    required
                    onChange={(event) =>
                      handleChange(event, "owner.address.zipCode")
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <h4>Контакт:</h4>
              <div>
                <label>Телефон:</label>
                <input
                  type="text"
                  name="phone"
                  value={newCar.owner.contact.phone}
                  required
                  onChange={(event) =>
                    handleChange(event, "owner.contact.phone")
                  }
                />
              </div>
              <div>
                <label>Електронна пошта:</label>
                <input
                  type="text"
                  name="email"
                  value={newCar.owner.contact.email}
                  required
                  onChange={(event) =>
                    handleChange(event, "owner.contact.email")
                  }
                />
              </div>
            </div>
            <div>
              <h4>Страховка:</h4>
              <div>
                <label>Постачальник:</label>
                <input
                  type="text"
                  name="provider"
                  value={newCar.owner.insurance.provider}
                  required
                  onChange={(event) =>
                    handleChange(event, "owner.insurance.provider")
                  }
                />
              </div>
              <div>
                <label>Номер полісу:</label>
                <input
                  type="text"
                  name="policyNumber"
                  value={newCar.owner.insurance.policyNumber}
                  required
                  onChange={(event) =>
                    handleChange(event, "owner.insurance.policyNumber")
                  }
                />
              </div>
              <div>
                <label>Покриття:</label>
                <input
                  type="text"
                  name="coverage"
                  value={newCar.owner.insurance.coverage}
                  required
                  onChange={(event) =>
                    handleChange(event, "owner.insurance.coverage")
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <button className={styles.save}>
          <span>Зберегти</span>
          <FiSave className={styles.saveIcon} />
        </button>
        <button className={styles.cancel} onClick={handleCancel}>
          <span>Скасувати</span>
          <FcCancel className={styles.cancelIcon} />
        </button>
      </form>
    </div>
  );
};

export default AddCart;
