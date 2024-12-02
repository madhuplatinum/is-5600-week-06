import Card from './Card'
import Button from './Button'
import Search from './Search'
import React, { useState, useEffect } from "react"

const CardList = ({ data }) => {
  const limit = 10;
  const defaultDataset = data.slice(0, limit);
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState(defaultDataset);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setProducts(filteredData.slice(offset, offset + limit));
  }, [offset, filteredData])

  const filterTags = (tagQuery) => {
    const filtered = data.filter((product) => {
      if (!tagQuery) {
        return product
      }
      return product.tags.find(({ title }) => title === tagQuery)
    })

    setFilteredData(filtered)
    setOffset(0)
  }

  const handlePagination = (direction) => {
    const newOffset = direction === "next"
      ? Math.min(offset + limit, filteredData.length - limit)
      : Math.max(offset - limit, 0);

    setOffset(newOffset);
  }

  return (
    <div className="cf pa2">
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products && products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button text="Previous" handleClick={() => handlePagination("previous")} />
        <Button text="Next" handleClick={() => handlePagination("next")} disabled={offset + limit >= filteredData.length} />
      </div>
    </div>
  )
}

export default CardList;
