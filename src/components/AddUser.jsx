import React, { useEffect, useState } from "react";
import { GrUserAdd } from "react-icons/gr";
import { Country, State, City } from "country-state-city";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Modal, TextInput, Label, Button, Select } from "flowbite-react";
import { db } from "../utils/firebase";

const AddUser = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  const handleClick = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const gender = form.querySelector('input[name="gender"]:checked').value;
    const fullName = form.elements.fullName.value;
    const email = form.elements.email.value;
    const dob = form.elements.dob.value;
    const hobby = form.elements.hobby.value;
    const country = form.elements.country.value;
    const state = form.elements.state.value;
    console.log(gender, fullName, email, dob, hobby, country, state);

    if (fullName && email) {
      db.collection("users").add({
        name: fullName,
        email: email,
        dob: dob ? dob : null,
        gender: gender ? gender : null,
        country: country ? country : null,
        state: state ? state : null,
        hobby: hobby ? hobby : null,
      });
      setShowModal(false);
      form.reset();
    }
  };

  return (
    <>
      <div className="flex cursor-pointer rounded-xl hover:bg-slate-400 justify-center items-center gap-2">
        <button onClick={handleClick} className="text-center text-xl font-bold">
          Add User
        </button>
        <GrUserAdd size={20} />
      </div>
      <Modal
        show={showModal}
        size="md"
        popup={true}
        onClose={handleClick}
        className="pt-28"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Full Name" />
                </div>
                <TextInput
                  required
                  id="small"
                  type="text"
                  sizing="sm"
                  name="fullName"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="name@gmail.com"
                  required={true}
                  name="email"
                />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="dob" value="Date of Birth" />
                </div>
                <TextInput id="dob" type="date" name="dob" />
              </div>

              <fieldset className="flex flex-col gap-4" id="radio">
                <legend className="mb-1">What is your Gender?</legend>
                <div className="flex items-center gap-2">
                  <input
                    id="male"
                    type="radio"
                    name="gender"
                    value="Male"
                    defaultChecked={true}
                  />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    id="female"
                    type="radio"
                    name="gender"
                    value="Female"
                  />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input id="other" type="radio" name="gender" value="Other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </fieldset>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="hobby" value="What is your hobby?" />
                </div>
                <TextInput
                  name="hobby"
                  id="hobby"
                  type="text"
                  sizing="sm"
                  required
                />
              </div>

              <div id="select">
                <div className="mb-2 block">
                  <Label htmlFor="countries" value="Select your country" />
                </div>
                <CountryDropdown
                  name="country"
                  classes="w-72"
                  id="countries"
                  value={selectedCountry}
                  onChange={(val) => {
                    setSelectedCountry(val);
                    setSelectedState("");
                    setSelectedCity("");
                  }}
                />
              </div>

              <div id="select">
                <div className="mb-2 block">
                  <Label htmlFor="states" value="Select your State" />
                </div>
                <RegionDropdown
                  name="state"
                  id="states"
                  classes="w-72"
                  placeholder="Select Your State"
                  country={selectedCountry}
                  value={selectedState}
                  onChange={(val) => {
                    setSelectedState(val);
                    setSelectedCity("");
                  }}
                />
              </div>

              <button
                type="submit"
                className="py-2 px-3 font-bold bg-red-500 text-white"
              >
                Done
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddUser;
