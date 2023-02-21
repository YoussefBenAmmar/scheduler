import React from "react";
import classNames from "classnames";

import "components/Button.scss";

/** PROPS:
 * Base uses no props and is considered the default button
 * Confirm uses the confirm prop to apply the .button--confirm modifier class
 * Danger uses the danger prop to apply the .button--danger modifier class
 * Clickable uses the onClick prop to handle the button click event
 * Disabled uses the disabled prop to apply the disabled attribute to the button element
 */

export default function Button(props) {
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}