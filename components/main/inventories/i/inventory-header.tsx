import React from "react";

interface InventoryHeaderProps {
  name?: string;
  lastUpdated?: Date;
}

const InventoryHeader = ({ name, lastUpdated }: InventoryHeaderProps) => {
  return (
    <div className="flex items-center justify-between w-full border-b border-b-border pb-2">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <span className="text-xs text-muted-foreground">
        Last Updated: {lastUpdated?.toLocaleString()}
      </span>
    </div>
  );
};

export default InventoryHeader;
// This component is used to display the header of the inventory page. It takes a prop called name which is the name of the inventory. The component returns a div with a heading that displays the name of the inventory. The heading has some styling applied to it to make it look visually appealing. The component is exported as default so that it can be imported and used in other parts of the application.
