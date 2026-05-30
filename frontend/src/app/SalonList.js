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
      <td>{props.type}</td>
      <td>{props.district}</td>
      <td>{props.rating}</td>
    </tr>
  )
}

export default function SalonList({salons}) {
  const [districts, setDistricts] = useState([]);
  const [types, setTypes] = useState([]);
  let salons_filtered = salons
  if (districts.length > 0) {
    salons_filtered = salons.filter((salon) => {
      return districts.includes(salon.district)
    })
  }
  if (types.length > 0) {
    salons_filtered = salons_filtered.filter((salon) => {
      return types.includes(salon.type)
    })
  }
  let all_districts = [...new Set(salons.map((salon) => salon.district))].sort()
  let all_types = [...new Set(salons.map((salon) => salon.type))].sort()
  if (all_districts.includes("")) {
    all_districts.splice(0,1)
  }
  function handleSelectDistrict(props) {
    let new_districts = districts.slice()
    if (districts.includes(props.target.textContent)) {
        new_districts = districts.filter((district) => district != props.target.textContent)
    } else {
        new_districts.push(props.target.textContent)
    }
    setDistricts(new_districts)
  }
  function handleSelectTypes(props) {
    let new_types = types.slice()
    if (types.includes(props.target.textContent)) {
        new_types = types.filter((district) => district != props.target.textContent)
    } else {
        new_types.push(props.target.textContent)
    }
    setTypes(new_types)
  }


  function District({name, checked}) {
    return (
        <div className="filter" onClick={handleSelectDistrict}>
            <div id={`district-${checked}`}>{name}</div>
        </div>
    )
  }
  function Type({name, checked}) {
    return (
        <div className="filter" onClick={handleSelectTypes}>
            <div id={`type-${checked}`}>{name}</div>
        </div>
    )
  }

  function handleDistrictsReset() {
    setDistricts([])
  }

  function handleTypesReset() {
    setTypes([])
  }

  return (
    <div>
        <div id="label">Filter by district</div>
        <div id="districts">
        {all_districts.map((district) => {
            return <District key={district} name={district} checked={districts.includes(district)}/>
        })}
        <button onClick={handleDistrictsReset}>Reset</button>
        </div>
        <div id="label">Filter by type</div>
        <div id="types">
        {all_types.map((type) => {
            return <Type key={type} name={type} checked={types.includes(type)}/>
        })}
        <button onClick={handleTypesReset}>Reset</button>
        </div>
      <table>
        <thead>
            <tr id="row">
                <td id="name">Name</td>
                <td id="type">Type</td>
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
