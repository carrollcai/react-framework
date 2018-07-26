import React from 'react';
import PropTypes from 'prop-types';

const Demo = ({ list, children, onClick, nextClickAfter3s }) => (
  <div>
    <div test={list}>
      {list && list.map(item => {
        return (<div key={item.id}>
          {item.date}
        </div>)
      })}
      <div style={{marginTop: 20}}></div>
      <button onClick={id => onClick('1')}>
        Demo获取数据
      </button>
      <div style={{marginTop: 20}}></div>
      <button onClick={id => nextClickAfter3s()}>
        点击，触发渲染
      </button>
      
    </div>
  </div>
);

Demo.propTypes = {
list: PropTypes.array.isRequired
}

export default Demo