import birImage from "@/assets/bir-paragliding.jpg";
import raftingImage from "@/assets/rishikesh-rafting.jpg";
import campingImage from "@/assets/coorg-camping.jpg";
import divingImage from "@/assets/goa-diving.jpg";

export type Adventure = {
  slug: string;
  title: string;
  activity: string;
  location: string;
  state: string;
  image: string;
  rating: string;
  reviews: string;
  price: string;
  category: string;
  duration: string;
  difficulty: string;
  age: string;
  group: string;
  description: string;
  pin: { left: string; top: string };
};

export const adventures = [
  {
    slug: "bir-billing-paragliding",
    title: "Paragliding in Bir Billing",
    activity: "Paragliding",
    location: "Bir Billing",
    state: "Himachal Pradesh",
    image: birImage,
    rating: "4.8",
    reviews: "2,342",
    price: "2,999",
    category: "Air",
    duration: "15–30 mins",
    difficulty: "Beginner",
    age: "12+",
    group: "1–10",
    description:
      "Soar above the Dhauladhar range in one of the world's best-known paragliding settings. Take in sweeping mountain views with guidance from an experienced local pilot.",
    pin: { left: "49%", top: "27%" },
  },
  {
    slug: "rishikesh-river-rafting",
    title: "River Rafting in Rishikesh",
    activity: "River Rafting",
    location: "Rishikesh",
    state: "Uttarakhand",
    image: raftingImage,
    rating: "4.9",
    reviews: "1,806",
    price: "1,499",
    category: "Water",
    duration: "2–3 hours",
    difficulty: "Moderate",
    age: "14+",
    group: "4–8",
    description:
      "Ride lively Himalayan rapids on the Ganges with a local river guide. This guided outing mixes splashy water, riverbank scenery and a shared rush of adventure.",
    pin: { left: "52%", top: "34%" },
  },
  {
    slug: "coorg-stargazing-camp",
    title: "Stargazing Camping in Coorg",
    activity: "Stargazing Camping",
    location: "Coorg",
    state: "Karnataka",
    image: campingImage,
    rating: "4.7",
    reviews: "924",
    price: "3,499",
    category: "Camping",
    duration: "1 night",
    difficulty: "Easy",
    age: "8+",
    group: "2–12",
    description:
      "Settle into a forest-side campsite in the Western Ghats. Spend an unhurried evening beneath a wide sky, with the sounds and cool air of Coorg all around.",
    pin: { left: "38%", top: "70%" },
  },
  {
    slug: "goa-scuba-diving",
    title: "Scuba Diving in Goa",
    activity: "Scuba Diving",
    location: "Grande Island",
    state: "Goa",
    image: divingImage,
    rating: "4.8",
    reviews: "1,276",
    price: "3,799",
    category: "Water",
    duration: "3–4 hours",
    difficulty: "Beginner",
    age: "10+",
    group: "2–6",
    description:
      "Discover Goa's underwater world on a guided introduction to scuba. Get comfortable with the equipment before meeting bright reef life beneath clear coastal water.",
    pin: { left: "43%", top: "61%" },
  },
] satisfies [Adventure, ...Adventure[]];

export const categories = [
  { name: "All", icon: "⊞" },
  { name: "Air", icon: "⌁" },
  { name: "Water", icon: "≈" },
  { name: "Land", icon: "△" },
  { name: "Height", icon: "♙" },
  { name: "Camping", icon: "⌂" },
  { name: "Snow", icon: "❄" },
  { name: "Motorsports", icon: "◉" },
  { name: "Extreme", icon: "↗" },
  { name: "Nature", icon: "❧" },
];

export function getAdventure(slug: string): Adventure {
  return adventures.find((adventure) => adventure.slug === slug) ?? adventures[0];
}

export function calculateBookingTotal(pricePerPerson: number, partySize: number): number {
  return pricePerPerson * partySize;
}
