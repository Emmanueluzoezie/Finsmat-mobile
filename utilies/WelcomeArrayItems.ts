export const dailyTreat = [
    {
        treat: "Junk",
        image: require("../assets/junk.png")
    },
    {
        treat: "Gambling",
        image: require("../assets/betting.jpeg")
    },
    {
        treat: "Alcohol",
        image: require("../assets/acohol.png")
    },
    {
        treat: "Weed",
        image: require("../assets/weed.png")
    },
    {
        treat: "Cigarette",
        image: require("../assets/cigar.png")
    },
]



export const currencies = [
    { name: "NGN", symbol: "₦", country: "Nigeria" },
    { name: "ZAR", symbol: "R", country: "South Africa" },
    { name: "XAF", symbol: "FCFA", country: "Cameroon" },
    { name: "SLL", symbol: "Le", country: "Sierra Leone" },
    { name: "KES", symbol: "KSh", country: "Kenya" },
    { name: "RWF", symbol: "FRw", country: "Rwanda" },
    { name: "EGP", symbol: "£", country: "Egypt" },
    { name: "ETB", symbol: "Br", country: "Ethiopia" },
    { name: "GHS", symbol: "₵", country: "Ghana" },
    { name: "MAD", symbol: "MAD", country: "Morocco" },
    { name: "TND", symbol: "DT", country: "Tunisia" },
    { name: "DZD", symbol: "د.ج", country: "Algeria" },
];



export const gifImage = [
    "https://gifdb.com/images/high/albert-einstein-thinking-smart-85s5hh2zivu2hvgn.gif",
    "https://media2.giphy.com/media/3i4xTtJQIJk0o/200w.gif?cid=6c09b952n6zve64zkxed46rcc7umzholqevzesndt0hvyvka&ep=v1_gifs_search&rid=200w.gif&ct=g",
    "https://gifdb.com/images/high/albert-einstein-thinking-smart-85s5hh2zivu2hvgn.gif",
    "https://media.tenor.com/nOEycT3HL3AAAAAM/the-office.gif",
    "https://media4.giphy.com/media/j0A8PCnlz49qt1BWCD/giphy.gif",
    "https://www.icegif.com/wp-content/uploads/2021/12/icegif-1419.gif",
    "https://media.tenor.com/cI2BHEubzBIAAAAM/thinking-smart.gif",

] 

export const hashTagWord = [
    "DeyPlay",
    "BeWise",
    "UseYaHead",
]

export const TimeSpent = [
    "Daily",
    "Weekly",
    "Monthly"
]

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1); // Get yesterday's date
const dayBeforeYesterday = new Date(today);
dayBeforeYesterday.setDate(today.getDate() - 2); // Get the date from two days ago

const formatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
const formattedToday = today.toLocaleDateString(undefined, formatOptions);
const formattedYesterday = yesterday.toLocaleDateString(undefined, formatOptions);
const formattedDayBeforeYesterday = dayBeforeYesterday.toLocaleDateString(undefined, formatOptions);

export const history = [
    // {
    //     title: "Friends quiz",
    //     amount: 100,
    //     date: formattedYesterday,
    //     id: 1
    // },
    // {
    //     title: "Savings quiz",
    //     amount: 600,
    //     date: formattedDayBeforeYesterday,
    //     id: 2
    // },
    // {
    //     title: "Savings quiz",
    //     amount: 4000,
    //     date: formattedToday,
    //     id: 3
    // },
    // {
    //     title: "daily quiz",
    //     amount: 130,
    //     date: formattedYesterday,
    //     id: 4
    // },
    // {
    //     title: "compound quiz",
    //     amount: 5000,
    //     date: formattedToday,
    //     id: 5
    // },
    // {
    //     title: "Friends quiz",
    //     amount: 120,
    //     date: formattedDayBeforeYesterday,
    //     id: 6
    // },
    // {
    //     title: "Budget quiz",
    //     amount: 400,
    //     date: formattedToday,
    //     id: 7
    // },
    // {
    //     title: "Investment quiz",
    //     amount: 1000,
    //     date: formattedDayBeforeYesterday,
    //     id: 8
    // },
    // {
    //     title: "Savings quiz",
    //     amount: 100,
    //     date: formattedToday,
    //     id: 9
    // },
    // {
    //     title: "Investment quiz",
    //     amount: 200,
    //     date: formattedDayBeforeYesterday,
    //     id: 10
    // },
    // {
    //     title: "Bugdet quiz",
    //     amount: 300,
    //     date: formattedYesterday,
    //     id: 11
    // },
    // {
    //     title: "Savings quiz",
    //     amount: 200,
    //     date: formattedToday,
    //     id: 12
    // },
] 
