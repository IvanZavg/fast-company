import React from 'react';
import PropTypes from 'prop-types';

function setItemClass(selectedItem, currentItem, valueProperty) {
  let className = 'list-group-item list-group-item-action';
  if (!selectedItem) return className;

  if (selectedItem[valueProperty] === currentItem[valueProperty]) {
    className += ' active';
  }

  return className;
}

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  const itemsKey = Object.keys(items);
  return (
    <ul className="list-group">
      {itemsKey.map((key) => (
        <li
          className={setItemClass(selectedItem, items[key], valueProperty)}
          key={items[key][valueProperty]}
          onClick={() => onItemSelect(items[key])}
        >
          {items[key][contentProperty]}
        </li>
      ))}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
};

GroupList.propTypes = {
  items: PropTypes.object.isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
};

export default GroupList;
