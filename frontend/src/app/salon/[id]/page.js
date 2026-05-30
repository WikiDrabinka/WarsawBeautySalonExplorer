import map_icon from "@/../public/map-location-solid-full.svg"
import Image from "next/image";
import Link from 'next/link'
export default async function Home({params}) {
  const { id } = await params;
  const data = await fetch(`http://localhost:8000/salon/${id}`)
  const salon = await data.json()
  let address = `${salon.address}, ${salon.postal_code}, ${salon.district}, Warsaw`
  let reviews = salon.number_of_reviews
  if (reviews>1) {
    reviews = reviews + " reviews"
  } else {
    reviews = reviews + " review"
  }
  return (
    <div>
      <Link href={`/`}><button>Main page</button></Link>
      <Link href={`/salon/${id}/edit`}><button>Edit</button></Link>
      <h1>{salon.name}</h1>
      <h4>{salon.type}</h4>
      <h3 id="maps">
        <Image src={map_icon} alt="Maps logo" id="maps_logo"></Image>
        <a href={`https://www.google.pl/maps/place/${address.replace(" ", "+")}`} id="maps_link">{address}</a>
      </h3>
      <div>
        {(salon.phone_number) && <div><a href={`tel:${salon.phone_number}`}>{salon.phone_number}</a></div>}
        {(salon.website) && <div><a href={salon.website}>Website</a></div>}
        <div>Rating: {salon.rating} ({reviews})</div>
      </div>
    </div>
  );
}
