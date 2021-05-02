import React, { useState } from "react";


export type NavOption = {
  onClickHandler: () => void,
  label: string,
  eventKey: string
}

type NavBarPropsType = {
  navOptions: Array<NavOption>
}

type NavBarState = {
  selected: string | undefined
}

const NavBar: React.FC<NavBarPropsType> = ( navBarProps: NavBarPropsType ) => {
  const [navBarState, setNavBarState ] = useState<NavBarState>({
    selected: navBarProps.navOptions[0].eventKey
  });
  
  const defaultMenuElementStyle = "flex-none p-2 px-4 font-bold cursor-pointer"
  const selectedMenuElementStyle = defaultMenuElementStyle + " rounded-lg bg-purple-700 text-white";

  const renderButtons = (options:Array<NavOption>) => {
    return options.map(option => (
      <li className={option.eventKey===navBarState.selected ? selectedMenuElementStyle : defaultMenuElementStyle} 
      key={option.eventKey} data-key={option.eventKey} onClick={(e) => {
        option.onClickHandler()
        setNavBarState({
          selected: e.currentTarget.dataset.key
        })
      }}>{option.label}</li>
    ))
  }

  return (
    <ul className="flex">
      {renderButtons(navBarProps.navOptions)}
    </ul>
  );
}

export default NavBar;