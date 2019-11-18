import React from 'react';
import cn from 'classnames';

const Select = (props) => {
  const {
    type,
    onChange,
    users,
    user,
  } = props;
  const classLabel = cn({
    'row no-gutters': type === 'formTask',
    'label-user': type === 'mainMenu',
  });
  const classSelect = cn({
    'style-input input-user': type === 'formTask',
    'select-user': type === 'mainMenu',
  });
  return (
    <label htmlFor className={classLabel}>
    Пользователь
      {type === 'formTask' ? <p className="red-star">*</p> : null}
      <select value={user} className={classSelect} onChange={onChange}>
        {users.map((us) => (
          <option key={us.fullName}>
            {us.fullName}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
