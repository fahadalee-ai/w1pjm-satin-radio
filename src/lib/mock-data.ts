import { asset } from "./utils";

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type Listener = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  alerts: boolean;
};

export type Show = {
  id: string;
  name: string;
  host: string;
  days: DayKey[];
  start: string;
  end: string;
  description: string;
  image: string;
};

export type StoryKind = "news" | "event" | "weather";

export type Story = {
  id: string;
  kind: StoryKind;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  time: string;
  place?: string;
};

export const DAYS: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

const studio = asset("photos/studio.jpg");
const mic = asset("photos/mic.jpg");
const board = asset("photos/board.jpg");
const coast = asset("photos/coast.jpg");
const light = asset("photos/lighthouse.jpg");
const town = asset("photos/field.jpg");
const crowd = asset("photos/crowd.jpg");
const shore = asset("photos/shore.jpg");

export const IMAGES = {
  studio: mic,
  board,
  coast: light,
  town: crowd,
  auth: asset("photos/auth.jpg"),
  dusk: coast,
};

export const ONBOARDING = [
  {
    image: mic,
    alt: "Warm-lit radio studio with a microphone in the foreground",
    heading: "YOUR TOWN. YOUR STATION.",
    body: "Broadcasting live music, local news, and community events straight from Cape Cod — to wherever you are.",
    cta: "Next →",
  },
  {
    image: light,
    alt: "Cape Cod coastline and lighthouse in warm evening light",
    heading: "MUSIC MADE FOR HOME",
    body: "An eclectic mix of classic favorites, today's hits, and independent Massachusetts artists — curated daily, never generic.",
    cta: "Next →",
  },
  {
    image: crowd,
    alt: "A local crowd gathered for a community event",
    heading: "NEVER MISS WHAT'S HAPPENING",
    body: "Real-time local news, weather, traffic, and coverage of the events that matter to your neighborhood.",
    cta: "Start Listening",
  },
] as const;

export const seedListeners: Listener[] = [
  {
    id: "u1",
    name: "Alex Brennan",
    email: "alex@capecod.com",
    phone: "(508) 555-0148",
    password: "Listen1",
    alerts: true,
  },
];

export const SHOWS: Show[] = [
  {
    id: "morning-drive",
    name: "Morning Drive",
    host: "Dana Cole",
    days: ["mon", "tue", "wed", "thu", "fri"],
    start: "06:00",
    end: "09:00",
    description:
      "Traffic on Route 6, the marine forecast, and the songs Cape Cod wakes up to. Dana keeps the board warm and the town talking.",
    image: board,
  },
  {
    id: "cape-classics",
    name: "Cape Classics",
    host: "Lena Brooks",
    days: ["mon", "tue", "wed", "thu", "fri"],
    start: "09:00",
    end: "12:00",
    description:
      "Classic favorites and deep cuts chosen for the late morning — the soundtrack between the school run and lunch on Main Street.",
    image: studio,
  },
  {
    id: "midday-local",
    name: "Midday Local",
    host: "Chris Malloy",
    days: ["mon", "tue", "wed", "thu", "fri"],
    start: "12:00",
    end: "14:00",
    description:
      "Guest interviews, small-business stories, and community commentary live from the studio.",
    image: mic,
  },
  {
    id: "afternoon-mix",
    name: "The Afternoon Mix",
    host: "Jordan Pike",
    days: ["mon", "tue", "wed", "thu", "fri"],
    start: "14:00",
    end: "17:00",
    description:
      "Today's hits beside standout tracks from independent Massachusetts artists. Never a generic clock.",
    image: board,
  },
  {
    id: "hometown-headlines",
    name: "Hometown Headlines",
    host: "Priya Shah",
    days: ["mon", "tue", "wed", "thu", "fri"],
    start: "17:00",
    end: "19:00",
    description:
      "Local news, town-hall notes, and the drive-home briefing — short, clear, and about this place.",
    image: town,
  },
  {
    id: "evening-session",
    name: "Evening Session",
    host: "Sam Ortega",
    days: ["mon", "tue", "wed", "thu", "fri"],
    start: "19:00",
    end: "22:00",
    description:
      "A slower set for the harbor lights. Interviews when the night calls for them, music when it doesn't.",
    image: coast,
  },
  {
    id: "saturday-shoreline",
    name: "Saturday Shoreline",
    host: "Dana Cole",
    days: ["sat"],
    start: "08:00",
    end: "11:00",
    description: "Weekend weather, beach traffic, and a brighter music bed for Saturday morning.",
    image: shore,
  },
  {
    id: "independent-mass",
    name: "Independent Massachusetts",
    host: "Lena Brooks",
    days: ["sat"],
    start: "11:00",
    end: "14:00",
    description: "A dedicated block for Massachusetts artists — new singles, live sessions, and local labels.",
    image: studio,
  },
  {
    id: "sports-desk",
    name: "High School Sports Desk",
    host: "Chris Malloy",
    days: ["sat"],
    start: "14:00",
    end: "17:00",
    description: "Friday night scores, Saturday previews, and the fields that hold this town together.",
    image: town,
  },
  {
    id: "weekend-gold",
    name: "Weekend Gold",
    host: "Jordan Pike",
    days: ["sat"],
    start: "17:00",
    end: "20:00",
    description: "The records people still request by name. Gold on the dial, gold in the crate.",
    image: board,
  },
  {
    id: "sunday-community",
    name: "Sunday Community Hour",
    host: "Priya Shah",
    days: ["sun"],
    start: "08:00",
    end: "11:00",
    description: "Calendars, fundraisers, church suppers, and the week ahead in plain language.",
    image: crowd,
  },
  {
    id: "lighthouse-brunch",
    name: "Lighthouse Brunch",
    host: "Sam Ortega",
    days: ["sun"],
    start: "11:00",
    end: "14:00",
    description: "An easy Sunday mix — coastal, warm, and unhurried.",
    image: light,
  },
  {
    id: "sunday-classics",
    name: "Cape Cod Classics",
    host: "Lena Brooks",
    days: ["sun"],
    start: "14:00",
    end: "17:00",
    description: "The long-play version of the weekday classics block.",
    image: coast,
  },
  {
    id: "sign-off-stories",
    name: "Sign-Off Stories",
    host: "Dana Cole",
    days: ["sun"],
    start: "17:00",
    end: "20:00",
    description: "Letters, local history, and one last song before the night watch.",
    image: mic,
  },
  {
    id: "night-watch",
    name: "Night Watch",
    host: "W1PJM",
    days: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
    start: "22:00",
    end: "06:00",
    description: "Overnight instrumentals and station IDs. The tower stays lit.",
    image: duskImage(),
  },
];

function duskImage() {
  return coast;
}

export const STORIES: Story[] = [
  {
    id: "route-6",
    kind: "news",
    title: "Route 6 slow through Orleans after the morning ferry rush",
    excerpt: "Expect delays eastbound until late morning. Local detours are moving.",
    time: "28 min ago",
    place: "Orleans",
    image: shore,
    body: [
      "W1PJM traffic is watching a slow crawl on Route 6 through Orleans after the first ferry wave. Eastbound lanes are the pinch point.",
      "If you can hold until midmorning, the backup usually breaks once the beach lots fill and the through-traffic thins.",
      "We'll update on Hometown Headlines at 5.",
    ],
  },
  {
    id: "town-meeting",
    kind: "news",
    title: "Barnstable town meeting takes up the harbor budget tonight",
    excerpt: "Dredging, pier repairs, and a small-business grant are on the warrant.",
    time: "2 hr ago",
    place: "Barnstable",
    image: town,
    body: [
      "Tonight's town meeting puts the harbor budget in front of neighbors who actually use the water. Dredging, pier repairs, and a grant for seasonal storefronts are the items drawing the most comment.",
      "W1PJM will carry a short recap on Morning Drive tomorrow — what passed, what waited, and what it means for the summer season.",
    ],
  },
  {
    id: "library",
    kind: "news",
    title: "Hyannis library opens a late reading room on Thursdays",
    excerpt: "Doors stay open until 8 p.m. starting next week. No card required to sit.",
    time: "Yesterday",
    place: "Hyannis",
    image: studio,
    body: [
      "The library is keeping the main reading room open until 8 p.m. on Thursdays, aimed at people who can't get there before the dinner hour.",
      "You don't need a card to take a chair. Cards still matter if you want to take a book home.",
    ],
  },
  {
    id: "festival",
    kind: "event",
    title: "Harbor Lights festival returns to the waterfront",
    excerpt: "Friday dusk through Sunday afternoon. Local bands on the small stage.",
    time: "This weekend",
    place: "Hyannis Harbor",
    image: crowd,
    body: [
      "Harbor Lights is back on the waterfront: food tents, a small stage, and the kind of crowd that knows the volunteers by name.",
      "W1PJM will be on site Saturday afternoon with a live cut-in during High School Sports Desk and a music bed from Independent Massachusetts artists.",
    ],
  },
  {
    id: "football",
    kind: "event",
    title: "Friday night lights: Barnstable at home",
    excerpt: "Kickoff 7 p.m. under the lights. Bring a layer — the wind off the field is real.",
    time: "Friday",
    place: "Barnstable High",
    image: town,
    body: [
      "Barnstable is home Friday under the lights. Kickoff is 7 p.m.",
      "Chris Malloy will have the score and a short locker-room note on Saturday's High School Sports Desk.",
    ],
  },
  {
    id: "market",
    kind: "event",
    title: "Saturday growers' market on Main Street",
    excerpt: "Opens 8 a.m. Lobster rolls sell out before noon. Come early.",
    time: "Saturday",
    place: "Main Street",
    image: shore,
    body: [
      "The Saturday growers' market sets up at 8 a.m. The lobster rolls are gone before noon most weeks — that part is not a rumor.",
      "We'll mention vendor notes on Saturday Shoreline if the weather turns.",
    ],
  },
  {
    id: "marine",
    kind: "weather",
    title: "Marine forecast: southwest breeze, 2 to 3 foot seas",
    excerpt: "Small craft stay comfortable. Fog possible on the sound before sunrise.",
    time: "Updated 5:10 a.m.",
    place: "Cape Cod Bay",
    image: coast,
    body: [
      "Southwest breeze today, seas 2 to 3 feet on the bay. Comfortable for small craft if you know the water.",
      "A patch of fog is possible on the sound before sunrise. It should lift once the sun gets on it.",
    ],
  },
  {
    id: "today-wx",
    kind: "weather",
    title: "Today: golden and mild, low 70s by the water",
    excerpt: "Inland a few degrees warmer. Evening cools fast after sunset.",
    time: "Today",
    place: "Cape Cod",
    image: light,
    body: [
      "A mild day along the shore, low 70s, warmer a mile inland. Skies stay mostly clear.",
      "After sunset the temperature drops quickly. If you're staying for Harbor Lights, bring a layer.",
    ],
  },
  {
    id: "weekend-wx",
    kind: "weather",
    title: "Weekend: Saturday fair, Sunday a passing shower",
    excerpt: "The shower looks brief and early. Afternoon plans should hold.",
    time: "Weekend outlook",
    place: "Cape Cod",
    image: shore,
    body: [
      "Saturday looks fair for the market and the festival. Sunday brings a passing shower, most likely early.",
      "Afternoon plans should hold. We'll revise this on Morning Drive if the timing shifts.",
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "W1PJM has brought back that authentic local radio feel. It is wonderful waking up and hearing what is actually happening right here in Cape Cod.",
    name: "Anthony M.",
  },
  {
    quote:
      "As a local business owner, advertising and sharing our story on W1PJM gave us an immediate lift. They genuinely care about this town.",
    name: "Elena R.",
  },
  {
    quote:
      "Great music mix throughout the afternoon, and the local news segments are right to the point. The live stream is clear as day!",
    name: "Marcus D.",
  },
] as const;

export const ALERTS = [
  { id: "a1", title: "Morning Drive starts in 30 minutes", time: "Today · 5:30 AM", kind: "Show reminder" },
  { id: "a2", title: "Route 6 delays through Orleans", time: "28 min ago", kind: "Breaking local news" },
  { id: "a3", title: "Harbor Lights festival this weekend", time: "Yesterday", kind: "Event" },
] as const;

export function dayKey(date = new Date()): DayKey {
  return DAYS[(date.getDay() + 6) % 7]!.key;
}

export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h! * 60 + m!;
}

export function formatClock(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h! >= 12 ? "PM" : "AM";
  const hour = h! % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function showsForDay(day: DayKey) {
  return SHOWS.filter((show) => show.days.includes(day)).sort((a, b) => {
    const start = toMinutes(a.start) - toMinutes(b.start);
    if (a.id === "night-watch") return 1;
    if (b.id === "night-watch") return -1;
    return start;
  });
}

export function currentShow(date = new Date()): Show {
  const day = dayKey(date);
  const now = date.getHours() * 60 + date.getMinutes();
  const lineup = SHOWS.filter((show) => show.days.includes(day));
  const live = lineup.find((show) => {
    const start = toMinutes(show.start);
    const end = toMinutes(show.end);
    if (end > start) return now >= start && now < end;
    return now >= start || now < end;
  });
  return live ?? lineup[0] ?? SHOWS[0]!;
}

export function featuredShows(date = new Date()) {
  return showsForDay(dayKey(date)).filter((show) => show.id !== "night-watch").slice(0, 6);
}
