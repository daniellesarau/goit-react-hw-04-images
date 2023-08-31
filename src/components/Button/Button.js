import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ text, type, clickHandler }) => {
  return (
    <div>
      <button
        className={css.Button}
        type={type}
        onClick={clickHandler}
        aria-label={text}
      >
        {text}
      </button>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
};
export default Button;
