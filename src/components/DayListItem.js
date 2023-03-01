import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

/** PROPS 
 * 
 * name:String the name of the day
 * spots:Number the number of spots remaining
 * selected:Boolean true or false declaring that this day is selected
 * setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
 * 
 */

export default function DayListItem(props) {

  const formatSpots = () => {
    if (props.spots === 0) {
      return 'no spots remaining';
    }

    if (props.spots === 1) {
      return `${props.spots} spot remaining`;
    }
    return `${props.spots} spots remaining`;
  };
  console.log(props.selected)
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    
    "day-list__item--full": !props.spots,
  });

  return (
    <li onClick={() => props.setDay(props.name)}
      className={dayClass}
      data-testid="day">
      <h2 >{props.name}</h2>
      <h3 >{formatSpots(props.spots)}</h3>
    </li>
  );
}
