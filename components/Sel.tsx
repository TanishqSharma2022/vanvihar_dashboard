import React from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import {MultiSelect} from "react-multi-select-component";
const Sel = () => {
    const form = useForm();
    const options = [{value:"one", name: "one"},{value: "two", name: "two"},{value: "three", name: "three"}]
  return (
    <div>
      <Controller
        name="assignee"
        control={form.control}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              options={options}
              isMulti
              value={options.find((c) => c.value === value)}
              onChange={(val) => onChange(val.map((c) => c.value))}
            ></Select>
          );
        }}
      />
    </div>
  );
};

export default Sel;
