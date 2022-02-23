import React from 'react';
import './_switch.scss';

type Props = {
    id: string
};

const Switch = ({ id }: Props) => {
  return (
    <>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new-${id}`}
        type="checkbox"
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new-${id}`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;