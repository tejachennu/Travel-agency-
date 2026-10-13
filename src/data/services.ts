import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Bus,
  FileCheck2,
  Hotel,
  IdCard,
  Map as MapIcon,
  Package,
  Plane,
  ScrollText,
  Stamp,
  Truck,
  Users,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  blurb: string;
  points: string[];
  icon: LucideIcon;
};

export const travelServices: Service[] = [
  {
    id: "flights",
    title: "Flight Booking",
    blurb: "Domestic and international fares compared for you, with seats, baggage and date changes handled by a real person.",
    points: ["Best-fare search across airlines", "Group & family bookings", "Web check-in and change support"],
    icon: Plane,
  },
  {
    id: "hotels",
    title: "Hotel Booking",
    blurb: "From smart city stays to Marriott resorts and private-pool villas — a wide range of hand-picked hotels for every budget.",
    points: ["Verified, well-reviewed properties", "Honeymoon & family room upgrades", "Timely updates on every booking"],
    icon: Hotel,
  },
  {
    id: "packages",
    title: "Customised Tour Packages",
    blurb: "Tell us your dates, budget and travel style; we craft a personalised itinerary that's well planned and easy to change.",
    points: ["Handpicked experiences", "Budget-friendly options", "Domestic & international"],
    icon: Package,
  },
  {
    id: "transport",
    title: "Transport & Transfers",
    blurb: "Airport pick-ups, inter-hotel transfers and private cars with experienced drivers, so you're never left waiting.",
    points: ["Airport pick-up & drop", "Inter-city & inter-hotel transfers", "Private vehicles with drivers"],
    icon: Bus,
  },
  {
    id: "groups",
    title: "Family & Group Tours",
    blurb: "Friends' trips, family reunions and corporate outings with a tour manager who checks in at every step.",
    points: ["Dedicated coordinator", "Group fares & rooming", "Daily check-ins on tour"],
    icon: Users,
  },
  {
    id: "itineraries",
    title: "Expert Trip Planning",
    blurb: "Not sure where to go? Our travel experts suggest destinations, routes and seasons that fit you.",
    points: ["Destination advice", "Day-by-day plans", "24/7 support while you travel"],
    icon: MapIcon,
  },
];

export const documentServices: Service[] = [
  {
    id: "passport",
    title: "Passport Services",
    blurb: "New passports, renewals and re-issues — we prepare forms, photos and documents so your appointment goes right the first time.",
    points: ["Fresh & renewal applications", "Document checklist review", "Appointment scheduling"],
    icon: BadgeCheck,
  },
  {
    id: "visa",
    title: "Visa Assistance",
    blurb: "Tourist and visit visas for Dubai, Singapore, Vietnam and more, filed with the correct documents and timelines.",
    points: ["E-visas & sticker visas", "Cover letters & itineraries", "Real-time status updates"],
    icon: Stamp,
  },
  {
    id: "oci",
    title: "OCI Application",
    blurb: "End-to-end help with the Overseas Citizen of India card — online form, photo & signature specs, uploads and the final bundle, ready for your in-person biometrics visit at BLS.",
    points: ["Online form filling", "Document upload & bundling", "Embassy protocols explained"],
    icon: IdCard,
  },
  {
    id: "pcc",
    title: "Police Clearance Certificate",
    blurb: "Indian PCC applications for residents of Canada, prepared and submitted with the correct supporting documents.",
    points: ["Eligibility & checklist", "Form preparation", "Submission guidance"],
    icon: FileCheck2,
  },
  {
    id: "surrender",
    title: "Passport Surrender",
    blurb: "Surrender of Indian passport and renunciation paperwork after acquiring Canadian citizenship, done properly.",
    points: ["Surrender certificate", "Fee & timeline guidance", "Linked OCI application"],
    icon: ScrollText,
  },
  {
    id: "courier",
    title: "Purolator Pickup & Drop",
    blurb: "Doorstep Purolator pickup and drop for your documents to BLS and IRCC Ottawa — no trips to the post office.",
    points: ["Doorstep pickup in Canada", "BLS & IRCC Ottawa", "Tracked end to end"],
    icon: Truck,
  },
];

/** The original "One-Stop Travel & BLS Services Partner" promises from mjholidays.in. */
export const documentPromises = [
  "Guidance on document checklists, timelines and embassy protocols",
  "Real-time updates on document requirements and appointment scheduling",
  "End-to-end help with uploading documents, filling out online forms and preparing the application bundle",
];
