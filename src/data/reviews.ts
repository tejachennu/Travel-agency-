// Real traveller reviews, transcribed from the review cards featured in
// @mj_holidays_india posts. Long reviews are trimmed with an ellipsis.

export type Review = {
  name: string;
  trip: string;
  destinationSlug?: string;
  quote: string;
  rating: 5;
  source: "Google review" | "Instagram feature";
  post: string;
};

export const reviews: Review[] = [
  {
    name: "Romil Umang",
    trip: "Dubai holiday",
    destinationSlug: "dubai",
    quote:
      "I recently booked my Dubai holiday package with MJ Holidays, and it was nothing short of spectacular! From the very beginning, their team was professional, attentive, and made the entire booking process seamless. The itinerary was perfectly balanced — covering iconic landmarks like the Burj Khalifa and Desert Safari while still giving us time to relax and enjoy the luxurious hotel stay.",
    rating: 5,
    source: "Instagram feature",
    post: "DSKbpjlin92",
  },
  {
    name: "Robin Mikhael",
    trip: "Kerala tour",
    destinationSlug: "kerala",
    quote:
      "Thank you, MJ Holiday, for making my recent Kerala trip arrangement so nicely. It was very professional and enjoyable. Everything was well managed. My trip was very smooth from start to end. We really had a wonderful time at every destination including hotel stay and transport too. I highly recommend you to my friends and near ones.",
    rating: 5,
    source: "Instagram feature",
    post: "DQmBdArigyQ",
  },
  {
    name: "Purvang Trivedi",
    trip: "Maharashtra hill stations",
    destinationSlug: "maharashtra",
    quote:
      "I recently completed a tour with MJ Holidays, and it was an incredible experience! Our guide, Bhavyabhai, was knowledgeable and friendly, making each destination come alive. The hotels were comfortable, and the driver Shayam was excellent. The tour was well-organized, and every detail was taken care of. Highly recommend!",
    rating: 5,
    source: "Google review",
    post: "DQt18n4DNnK",
  },
  {
    name: "Kaival",
    trip: "Dubai trip",
    destinationSlug: "dubai",
    quote:
      "We booked our Dubai trip through MJ Holidays, and the experience was smooth from start to finish. They handled everything professionally — flights, hotel options, city tours, visa process, and even small details like transfers and itinerary timing. Because of their planning, I could enjoy all major attractions like Burj Khalifa, Desert Safari, Miracle Garden, and Marina Cruise without any stress.",
    rating: 5,
    source: "Instagram feature",
    post: "DSKbpjlin92",
  },
  {
    name: "Ansh Patel",
    trip: "Bali group trip",
    destinationSlug: "bali",
    quote:
      "I went to Bali through MJ Holidays. The planning was good. The arrangements are great — all days dinner was delicious. Also when I was in Bali, Bhavya Bhai helped me a lot and responded to me any time. Thank you MJ Holidays, Bhavyabhai, Jatinbhai.",
    rating: 5,
    source: "Google review",
    post: "Dapzr9kgLzF",
  },
  {
    name: "Ketan Salunke",
    trip: "Matheran to Mahabaleshwar",
    destinationSlug: "maharashtra",
    quote:
      "We visited Matheran, Khandala, Lonavala, Panchgani, and Mahabaleshwar with our family, and we had a wonderful time. We had a great experience at every place — the hotels and their services were excellent. Our tour operator took great care of us, regularly checking to ensure that we reached safely and that we didn't face any difficulties.",
    rating: 5,
    source: "Google review",
    post: "DQt18n4DNnK",
  },
  {
    name: "Rohan Patel",
    trip: "Family trips & flights",
    destinationSlug: "spiti-valley",
    quote:
      "Great experience booking my family trips and related flights. I was able to get timely updates regarding booked properties and flights wherever needed. They offer a wide range of hotels to choose from which can make one's trip experience excellent.",
    rating: 5,
    source: "Google review",
    post: "Dbx5Voxg2Uv",
  },
  {
    name: "Ravi Patel",
    trip: "Dubai tour",
    destinationSlug: "dubai",
    quote: "Amazing experience with MJ Holidays in my Dubai tour. Package was awesome and value for money.",
    rating: 5,
    source: "Instagram feature",
    post: "DHTPzrZqz36",
  },
  {
    name: "Akashkumar Modi",
    trip: "Statue of Unity tour",
    destinationSlug: "statue-of-unity",
    quote:
      "Certainly it was a great experience of the Statue of Unity tour with MJ Holidays. Proper planning, nice hotels and yummy food. Thank you for beautiful memories.",
    rating: 5,
    source: "Google review",
    post: "DD8xGWztdma",
  },
];

export function reviewsFor(slug: string) {
  return reviews.filter((r) => r.destinationSlug === slug);
}
