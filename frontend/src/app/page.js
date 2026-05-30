import SalonList from "./SalonList";

export default async function Home() {
  const data = await fetch('http://localhost:8000/')
  const posts = await data.json()
  return (
    <div>
    <h1>Browse salons</h1>
    <SalonList salons={posts}/>
    </div>
  );
}
