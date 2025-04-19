import React from 'react'

const PublicInventoryHeader = ({name}:{name: string}) => {
  return (
    <header className="fixed inset-x-0 top-0 z-10 border-b border-b-border">
      <nav className="flex items-center justify-between w-full h-16 px-4 bg-white">
        <div className="flex items-center justify-start w-full h-full gap-2">
          <h3 className="text-lg font-semibold uppercase">{name}</h3>
        </div>
        {/* <div className="flex items-center justify-end w-full h-full">
          <button className="px-4 py-2 text-white bg-blue-500 rounded">Add Item</button>
        </div> */}
      </nav>
    </header>
  )
}

export default PublicInventoryHeader;
