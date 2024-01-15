// MultiSelect.tsx

import React from 'react';
import Select from 'react-select';
import { useForm, SubmitHandler, FieldValues, UseFormRegister, Controller, Control } from 'react-hook-form';

// interface MultiSelectProps {
//   label: string;
//   options: { value: string; label: string }[];
// }

// interface FormData {
//   selectedItems: string[];
// }

// const MultiSelect: React.FC<MultiSelectProps> = ({ label, options }) => {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<FormData>();

//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     console.log(data.selectedItems);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <label>{label}</label>
//       <Select
//         isMulti
//         options={options}
//         {...register('selectedItems')}
//         onChange={(selectedOptions) => setValue('selectedItems', selectedOptions.map((option) => option.value))}
//       />

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

interface MultiSelectProps {
  label: string;
  options: { value: string; label: string }[];
  name: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ label, options, name }) => {
  return (
    <div>
      <label>{label}</label>
      <Controller
        name={name}
        render={({ field }) => (
          <Select
            isMulti
            options={options}
            value={field.value}
            onChange={(selectedOptions) => field.onChange(selectedOptions)}
          />
        )}
      />
    </div>
  );
};



export default MultiSelect;
