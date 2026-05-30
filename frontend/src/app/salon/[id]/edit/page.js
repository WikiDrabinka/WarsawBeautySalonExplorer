import Link from 'next/link'
import { redirect } from 'next/navigation'
export default async function Home({params}) {
  const { id } = await params;
  const data = await fetch(`http://localhost:8000/salon/${id}`)
  const salon = await data.json()

  async function handleSumbit(props) {
    "use server";
    let object = Object.fromEntries(props)
    Object.keys(object).forEach(key => {
    if (key.startsWith('$')) {
      delete object[key];
    }
    }); 
    let response = await fetch(`http://localhost:8000/salon/${id}`, {
        method: "PUT", body: JSON.stringify(object), headers: {'Content-type' : 'application/json'}
    })
    redirect(`/salon/${id}`)
}

  return (
    <div>
      <Link href={`/`}><button>Main page</button></Link>
      <Link href={`/salon/${id}`}><button>Back</button></Link>
      <h1>{salon.name}</h1>
      <form action={handleSumbit}>
        <div>Name</div>
        <input type="text" defaultValue={salon.name} name="name"></input>
        <div>Address</div>
        <input type="text" defaultValue={salon.address} name="address"></input>
        <div>Postal code</div>
        <input type="text" defaultValue={salon.postal_code} name="postal_code"></input>
        <div>District</div>
        <input type="text" defaultValue={salon.district} name="district"></input>
        <div>Phone number</div>
        <input type="tel" defaultValue={salon.phone_number} pattern="[0-9 ]{9,12}" name="phone_number"></input>
        <div>Website</div>
        <input type="text" defaultValue={salon.website} name="website"></input>
        <div>Rating</div>
        <input type="number" defaultValue={salon.rating} min="1" max="5" step="0.1" name="rating"></input>
        <div>Number of reviews</div>
        <input type="number" defaultValue={salon.number_of_reviews} min="0" name="number_of_reviews"></input>
        <div></div>
        <input type="submit"></input>
      </form>
    </div>
  );
}