import React from 'react';
import { useFormContext } from './FormContext';

export function StepThree() {
  const { formData, setFormData } = useFormContext();

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, step3: { description: e.target.value } });
  };

  return (
    <div>
      <textarea value={formData.step3?.description || ''} onChange={handleInputChange} />
    </div>
  );
}