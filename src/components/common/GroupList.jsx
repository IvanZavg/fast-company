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

function renderFromArray({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          className={setItemClass(selectedItem, item, valueProperty)}
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          role="button"
        >
          {item[contentProperty]}
        </li>
      ))}
    </ul>
  );
}

function renderFromObject({
  itemsKey,
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) {
  return (
    <ul className="list-group">
      {itemsKey.map((key) => (
        <li
          className={setItemClass(selectedItem, items[key], valueProperty)}
          key={items[key][valueProperty]}
          onClick={() => onItemSelect(items[key])}
          role="button"
        >
          {items[key][contentProperty]}
        </li>
      ))}
    </ul>
  );
}

const GroupList = (props) => {
  if (Array.isArray(props.items)) {
    return renderFromArray(props);
  } else if (typeof props.items === 'object') {
    const itemsKey = Object.keys(props.items);
    return renderFromObject({ itemsKey, ...props });
  }
};

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name',
  selectedItem: null
};

GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.object
};

export default GroupList;
