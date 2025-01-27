export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "🕺",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandem",
    icon: "👫",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving people",
    icon: "👨‍👩‍👧‍👦",
    people: "3-5",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill seekers",
    icon: "🎉",
    people: "5-10",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Economy",
    desc: "Budget friendly",
    icon: "💵",
  },
  {
    id: 2,
    title: "Standard",
    desc: "Moderate budget",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "High end budget",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate Travel Plan For Location : {location}, for {totalDays} Days for {people} People with {budget} Budget, give me Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, description and suggest itinery with place name, place details, place image url, geo coordinates, ticket pricing, time to travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.";
