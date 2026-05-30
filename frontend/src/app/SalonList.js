'use client';
import { useState } from 'react';
import Link from 'next/link'

function Salon({props}) {
  return (
    <tr id="row">
      <td>
        <Link href={`/salon/${props.id}`} id="salon_link">
        {props.name}
        </Link>
      </td>
      <td>{props.district}</td>
      <td>{props.rating}</td>
    </tr>
  )
}

export default function SalonList({salons}) {
  const [districts, setDistricts] = useState([]);
  let salons_filtered = salons
  if (districts.length > 0) {
    salons_filtered = salons.filter((salon) => {
      return districts.includes(salon.district)
    })
  }
  let all_districts = [...new Set(salons.map((salon) => salon.district))].sort()
  if (all_districts.includes("")) {
    all_districts.splice(0,1)
  }
  function handleSelect(props) {
    console.log(props)
    let new_districts = districts.slice()
    if (districts.includes(props.target.textContent)) {
        new_districts = districts.filter((district) => district != props.target.textContent)
    } else {
        new_districts.push(props.target.textContent)
    }
    setDistricts(new_districts)
    console.log(districts) 
  }

  function Filter({name, checked}) {
    return (
        <div className="filter" onClick={handleSelect}>
            <div id={`district-${checked}`}>{name}</div>
        </div>
    )
  }

  function handleReset() {
    setDistricts([])
  }

  return (
    <div>
      <table>
        <thead>
            <tr>
                <td>
                    {all_districts.map((district) => {
                        return <Filter key={district} name={district} checked={districts.includes(district)}/>
                    })}
                    <button onClick={handleReset}>Reset</button>
                </td>
            </tr>
            <tr id="row">
                <td id="name">Name</td>
                <td id="district">District</td>
                <td id="rating">Rating</td>
            </tr>
        </thead>
        <tbody>
          {salons_filtered.map((salon) => {
            return <Salon key={salon.id} props = {salon} />
          })}
        </tbody>
      </table>
    </div>
  )
}