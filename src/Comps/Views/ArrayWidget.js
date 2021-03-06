import React from 'react';
import PropTypes from 'prop-types';
import labeled from './labeled';

function ArrayWidget(props) {
  function renderChild(child, index) {
    return (
      <div>
        <button
          onClick={function remove() {
            props.onChildRemove(index);
          }}
        >
          -
        </button>
        {child}
      </div>
    );
  }

  const children = React.Children.map(props.children, renderChild);
  return (
    <div>
      <div>{children}</div>
      <button onClick={() => props.onChildAdd()}>+</button>
    </div>
  );
}

ArrayWidget.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onChildRemove: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  onChildAdd: PropTypes.func.isRequired,
};
export default labeled(ArrayWidget);
