import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";

import styles from "./CardDetails.module.scss";

const CartDetails = () => {
  const [cars, setCars] = useState({
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
    features: "",
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
        coverage: "",
      },
    },
    maintenanceRecords: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const cartId = parseInt(id);

  useEffect(() => {
    axios
      .get(`https://2b812fea10d70016.mokky.dev/cars/${cartId}`)
      .then((response) => {
        setCars(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [cartId]);

  const handleChange = (name, value) => {
    const updateCars = { ...cars };
    let carIntLevel = updateCars;
    const passArr = name.split(".");
    const lastKey = passArr.pop();

    for (const key of passArr) {
      carIntLevel[key] = { ...carIntLevel[key] };
      carIntLevel = carIntLevel[key];
    }

    carIntLevel[lastKey] = value;
    setCars(updateCars);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    axios
      .patch(`https://2b812fea10d70016.mokky.dev/cars/${cartId}`, cars)
      .then(() => {
        console.log("Acces");
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleMaintenanceChange = (index, field, value) => {
    const updatedMaintenanceRecords = [...cars.maintenanceRecords];
    updatedMaintenanceRecords[index] = {
      ...updatedMaintenanceRecords[index],
      [field]: value,
    };
    setCars({
      ...cars,
      maintenanceRecords: updatedMaintenanceRecords,
    });
  };

  const handleMaintenanceRecordChange = (
    index,
    field,
    value,
    partIndex = null
  ) => {
    const updatedMaintenanceRecords = [...cars.maintenanceRecords];
    const recordToUpdate = { ...updatedMaintenanceRecords[index] };

    if (partIndex !== null) {
      recordToUpdate.partsUsed[partIndex][field] = value;
    } else {
      recordToUpdate.serviceCenter[field] = value;
    }

    updatedMaintenanceRecords[index] = recordToUpdate;

    setCars({
      ...cars,
      maintenanceRecords: updatedMaintenanceRecords,
    });
  };

  return (
    <div className={styles.container}>
      <h1>Деталі автомобіля</h1>
      <div>
        <div className={styles.infoMain}>
          <h2>
            {cars.manufacturer} {cars.model}
          </h2>
          <div className={styles.box}>
            <p>Рік: </p>
            {isEditing ? (
              <input
                onChange={(event) => handleChange(`year`, event.target.value)}
                value={cars.year}
              />
            ) : (
              <p>{cars.year}</p>
            )}
          </div>
          <div className={styles.box}>
            <p>Колір: </p>
            {isEditing ? (
              <input
                onChange={(event) => handleChange(`color`, event.target.value)}
                value={cars.color}
              />
            ) : (
              <p>{cars.color}</p>
            )}
          </div>
        </div>
        {cars.engine && (
          <div className={styles.engine}>
            <h3>Двигун:</h3>
            <div className={styles.box}>
              <p>Тип двигуна: </p>
              {isEditing ? (
                <input
                  onChange={(event) =>
                    handleChange(`engine.type`, event.target.value)
                  }
                  value={cars.engine?.type}
                />
              ) : (
                <p>{cars.engine.type}</p>
              )}
            </div>
            <div className={styles.box}>
              <p>Потужність: </p>
              {isEditing ? (
                <input
                  onChange={(event) =>
                    handleChange(`engine.horsepower`, event.target.value)
                  }
                  value={cars.engine?.horsepower}
                />
              ) : (
                <p>{cars.engine.horsepower}</p>
              )}
            </div>
            {cars.engine.fuelSystem && (
              <div>
                <h4>Система пального:</h4>
                <div className={styles.box}>
                  <p>Тип:</p>
                  {isEditing ? (
                    <input
                      onChange={(event) =>
                        handleChange(
                          `engine.fuelSystem.type`,
                          event.target.value
                        )
                      }
                      value={cars.engine?.fuelSystem.type}
                    />
                  ) : (
                    <p>{cars.engine.fuelSystem.type}</p>
                  )}
                </div>
                <div className={styles.box}>
                  <p>Ефективність:</p>
                  {isEditing ? (
                    <input
                      onChange={(event) =>
                        handleChange(
                          `engine.fuelSystem.efficiency`,
                          event.target.value
                        )
                      }
                      value={cars.engine?.fuelSystem.efficiency}
                    />
                  ) : (
                    <p>{cars.engine.fuelSystem.efficiency}</p>
                  )}
                </div>
                {cars.engine.fuelSystem.emissions && (
                  <div>
                    <h5>Викиди:</h5>
                    <div className={styles.box}>
                      <p>CO2:</p>
                      {isEditing ? (
                        <input
                          onChange={(event) =>
                            handleChange(
                              "engine.fuelSystem.emissions.co2",
                              event.target.value
                            )
                          }
                          value={cars.engine?.fuelSystem?.emissions?.co2}
                        />
                      ) : (
                        <p>{cars.engine.fuelSystem.emissions.co2}</p>
                      )}
                    </div>
                    <div className={styles.box}>
                      <p>NOx:</p>
                      {isEditing ? (
                        <input
                          onChange={(event) =>
                            handleChange(
                              "engine.fuelSystem.emissions.nox",
                              event.target.value
                            )
                          }
                          value={cars.engine?.fuelSystem?.emissions?.nox}
                        />
                      ) : (
                        <p>{cars.engine.fuelSystem.emissions.nox}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        <div>
          <h3>Особливості:</h3>
          {cars.features && isEditing ? (
            <input
              onChange={(event) => handleChange(`features`, event.target.value)}
              value={cars?.features || ""}
            />
          ) : (
            <p className={styles.box}>{cars.features}</p>
          )}
        </div>
        {cars.owner && (
          <div>
            <h3>Власник:</h3>
            <div className={styles.box}>
              <p>Ім`я:</p>
              {isEditing ? (
                <input
                  onChange={(event) =>
                    handleChange(`owner.name`, event.target.value)
                  }
                  value={cars.owner.name}
                />
              ) : (
                <p>{cars.owner.name}</p>
              )}
            </div>
            <div className={styles.box}>
              <p>Вік:</p>
              {isEditing ? (
                <input
                  onChange={(event) =>
                    handleChange(`owner.age`, event.target.value)
                  }
                  value={cars.owner.age}
                />
              ) : (
                <p>{cars.owner.age}</p>
              )}
            </div>
            <div className={styles.box}>
              <p>Адреса:</p>
              {isEditing ? (
                <div>
                  <input
                    onChange={(event) =>
                      handleChange(`owner.address.street`, event.target.value)
                    }
                    value={cars.owner?.address.street}
                  />
                  <input
                    onChange={(event) =>
                      handleChange(`owner.address.city`, event.target.value)
                    }
                    value={cars.owner.address.city}
                  />
                  <input
                    onChange={(event) =>
                      handleChange(`owner.address.state`, event.target.value)
                    }
                    value={cars.owner.address.state}
                  />
                  <input
                    onChange={(event) =>
                      handleChange(`owner.address.zipCode`, event.target.value)
                    }
                    value={cars.owner.address.zipCode}
                  />
                </div>
              ) : (
                <>
                  <p>{cars.owner.address.street}</p>
                  <p>{cars.owner.address.city}</p>
                  <p>{cars.owner.address.state}</p>
                  <p>{cars.owner.address.zipCode}</p>
                </>
              )}
            </div>
            <h4>Контакт:</h4>
            <div className={styles.box}>
              <p>Телефон:</p>
              {isEditing ? (
                <input
                  onChange={(event) =>
                    handleChange(`owner.contact.phone`, event.target.value)
                  }
                  value={cars.owner.contact.phone}
                />
              ) : (
                <p>{cars.owner.contact.phone}</p>
              )}
            </div>
            <div className={styles.box}>
              <p>Електронна пошта:</p>
              {isEditing ? (
                <input
                  onChange={(event) =>
                    handleChange(`owner.contact.email`, event.target.value)
                  }
                  value={cars.owner.contact.email}
                />
              ) : (
                <p>{cars.owner.contact.email}</p>
              )}
            </div>
            <h4>Страховка:</h4>
            <div className={styles.box}>
              <p>Постачальник:</p>
              {isEditing ? (
                <input
                  onChange={(event) =>
                    handleChange(`owner.insurance.provider`, event.target.value)
                  }
                  value={cars.owner.insurance.provider}
                />
              ) : (
                <p>{cars.owner.insurance.provider}</p>
              )}
            </div>
            <div className={styles.box}>
              <p>Номер полісу:</p>
              {isEditing ? (
                <input
                  onChange={(event) =>
                    handleChange(
                      `owner.insurance.policyNumber`,
                      event.target.value
                    )
                  }
                  value={cars.owner.insurance.policyNumber}
                />
              ) : (
                <p>{cars.owner.insurance.policyNumber}</p>
              )}
            </div>
            <div className={styles.box}>
              <p>Покриття:</p>
              {isEditing ? (
                <input
                  onChange={(event) =>
                    handleChange(`owner.insurance.coverage`, event.target.value)
                  }
                  value={cars.owner.insurance.coverage}
                />
              ) : (
                <p>
                  {Array.isArray(cars.owner.insurance.coverage)
                    ? cars.owner.insurance.coverage.join(", ")
                    : cars.owner.insurance.coverage}
                </p>
              )}
            </div>
          </div>
        )}
        {cars.maintenanceRecords && (
          <div>
            <h3>Обслуговування:</h3>
            {cars.maintenanceRecords.map((record, index) => (
              <div key={index}>
                <div className={styles.box}>
                  <p>Дата:</p>
                  {isEditing ? (
                    <input
                      onChange={(event) =>
                        handleMaintenanceChange(
                          index,
                          "date",
                          event.target.value
                        )
                      }
                      value={record?.date || ""}
                    />
                  ) : (
                    <p>{record.date}</p>
                  )}
                </div>
                <div className={styles.box}>
                  <p>Опис:</p>
                  {isEditing ? (
                    <input
                      onChange={(event) =>
                        handleMaintenanceChange(
                          index,
                          "description",
                          event.target.value
                        )
                      }
                      value={record?.description || ""}
                    />
                  ) : (
                    <p>{record.description}</p>
                  )}
                </div>
                <div className={styles.box}>
                  <p>Пробіг:</p>
                  {isEditing ? (
                    <input
                      onChange={(event) =>
                        handleMaintenanceChange(
                          index,
                          "mileage",
                          event.target.value
                        )
                      }
                      value={record?.mileage || ""}
                    />
                  ) : (
                    <p>{record.mileage}</p>
                  )}
                </div>
                <div>
                  <p>Центр обслуговування:</p>
                  {isEditing ? (
                    <>
                      <input
                        onChange={(event) =>
                          handleMaintenanceRecordChange(
                            index,
                            "name",
                            event.target.value
                          )
                        }
                        value={record.serviceCenter.name}
                      />
                      <input
                        onChange={(event) =>
                          handleMaintenanceRecordChange(
                            index,
                            "location",
                            event.target.value
                          )
                        }
                        value={record.serviceCenter.location}
                      />
                    </>
                  ) : (
                    <>
                      <p>{record.serviceCenter.location}</p>
                      <p>{record.serviceCenter.name}</p>
                    </>
                  )}
                </div>
                <h4>Використані деталі:</h4>
                <ul>
                  {record.partsUsed.map((part, partIndex) => (
                    <li className={styles.item} key={partIndex}>
                      {isEditing ? (
                        <>
                          <input
                            onChange={(event) =>
                              handleMaintenanceRecordChange(
                                index,
                                "quantity",
                                event.target.value,
                                partIndex
                              )
                            }
                            value={part.quantity}
                          />{" "}
                          x{" "}
                          <input
                            onChange={(event) =>
                              handleMaintenanceRecordChange(
                                index,
                                "name",
                                event.target.value,
                                partIndex
                              )
                            }
                            value={part.name}
                          />
                        </>
                      ) : (
                        <>
                          {part.quantity} x {part.name}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button
          disabled={isEditing === true ? "" : "disabled"}
          className={styles.save}
          onClick={handleSave}
        >
          <span>Save</span>
          <IoMdCheckmarkCircle className={styles.saveIcon} />
        </button>
        <button className={styles.edit} onClick={handleEdit}>
          <span>Edit</span>
          <FaEdit className={styles.editIcon} />
        </button>
      </div>
    </div>
  );
};

export default CartDetails;
