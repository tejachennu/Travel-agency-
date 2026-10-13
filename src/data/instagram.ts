// Posts from instagram.com/mj_holidays_india. Images live in /public/instagram
// and are named by the post's shortcode so each tile links to the real post.

export type InstagramPost = {
  code: string;
  caption: string;
  alt: string;
};

export const instagramPosts: InstagramPost[] = [
  { code: "Dbx5Voxg2Uv", caption: "Unforgettable Spiti Valley", alt: "Spiti Valley trip poster with traveller photos and a review" },
  { code: "Dapzr9kgLzF", caption: "Unforgettable Bali", alt: "Bali group trip poster with ATV ride and waterfall photos" },
  { code: "DSUw1ERCrZM", caption: "Valentines in Bali — from ₹73,499", alt: "Valentines in Bali package poster with hotels and inclusions" },
  { code: "DSSImffivjf", caption: "Goa Diaries", alt: "Goa Diaries poster with travellers at Dudhsagar and Old Goa" },
  { code: "DSKbpjlin92", caption: "Dubai — City of Dreams", alt: "Dubai trip poster with two traveller reviews" },
  { code: "DQt18n4DNnK", caption: "Wonderful Maharashtra", alt: "Maharashtra hill stations poster with traveller reviews" },
  { code: "DQmBdArigyQ", caption: "Kerala Diaries", alt: "Kerala Diaries poster with family photos and a review" },
  { code: "DKwoxC5yGXa", caption: "Singapore & Malaysia Diaries", alt: "Singapore and Malaysia family trip poster" },
  { code: "DKmtsbdSP61", caption: "Punta Cana Memories", alt: "Punta Cana beach holiday collage" },
  { code: "DKe9hERSvAK", caption: "Aamchi Mumbai", alt: "Mumbai trip poster at the Gateway of India" },
  { code: "DKRCsiYSsep", caption: "Vietnam — Happy Memories", alt: "Vietnam group trip polaroid collage" },
  { code: "DHTPzrZqz36", caption: "Happy Customer — Dubai", alt: "Happy customer Dubai poster with a five-star review" },
  { code: "DD8xGWztdma", caption: "Statue of Unity tour", alt: "Family at the Statue of Unity with a review card" },
  { code: "DIk7hSzgwzK", caption: "Fly to your dream destination", alt: "Fly to your dream destination promotional poster" },
  { code: "DG6E0Qrxg6P", caption: "Secure your flight today", alt: "Flight booking promotional poster with passport and globe" },
  { code: "DCKrrEVRwAX", caption: "Let your dreams take flight", alt: "Aeroplane window at sunset with a travel quote" },
  { code: "DCIxpSSRY1U", caption: "You can go where you dream", alt: "MJ Holidays services poster" },
];

export function postUrl(code: string) {
  return `https://www.instagram.com/p/${code}/`;
}

export function postImage(code: string) {
  return `/instagram/${code}.webp`;
}

export function getPost(code: string) {
  return instagramPosts.find((p) => p.code === code);
}
