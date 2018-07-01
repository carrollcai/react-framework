import React from 'react';
import PropTypes from 'prop-types';

const Demo = ({ list, children, onClick }) => (
  <div>
    <div test={list}>
      {list && list.map(item => {
        return (<div key={item.id}>
          {item.date}
        </div>)
      })}
      <button onClick={id => onClick('1')}>
        Demo点击
      </button>
    </div>
  </div>
);

Demo.propTypes = {
list: PropTypes.array.isRequired
}

export default Demo