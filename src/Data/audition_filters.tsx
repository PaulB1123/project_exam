import PlusIcon from "../Componets/Navigation/icons/Plus.svg";
import GenderIcon from "../Componets/Navigation/icons/Gender.png";
import DefaultIcon from "../Componets/Navigation/icons/Default.png";
import FilterContext from "./FilterContext";
import { useContext } from "react";

const Data = [
  {
    title: "dropdown_audition",
    items: [],
  },
  {
    title: "audition_bar",
    items: [
      {
        id: "1",
        logo: DefaultIcon,
        description: "Segment",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: " A bar",
      },
      {
        id: "2",
        logo: GenderIcon,
        description: "Gender",
        add: PlusIcon,
        filters: [
          "This is another text that I have to make ",
          "18-30",
          "31-40",
          "41-50",
          "51-60",
          "61+",
          "unknown",
        ],
        category: " A bar",
      },
      {
        id: "3",
        logo: DefaultIcon,
        description: "Age Group",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: " A bar",
      },
      {
        id: "4",
        logo: DefaultIcon,
        description: "Region",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: " A bar",
      },
      {
        id: "5",
        logo: DefaultIcon,
        description: "Tier",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "6",
        logo: DefaultIcon,
        description: "Offer Copy",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "7",
        logo: DefaultIcon,
        description: "Offer Communication",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "8",
        logo: DefaultIcon,
        description: "Segment",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "9",
        logo: GenderIcon,
        description: "Gender",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "10",
        logo: DefaultIcon,
        description: "Age Group",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "11",
        logo: DefaultIcon,
        description: "Region",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "12",
        logo: DefaultIcon,
        description: "Tier",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "13",
        logo: DefaultIcon,
        description: "Offer Copy",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "14",
        logo: DefaultIcon,
        description: "Offer Communication",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "15",
        logo: DefaultIcon,
        description: "Segment",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "16",
        logo: GenderIcon,
        description: "Gender",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "17",
        logo: DefaultIcon,
        description: "Age Group",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "18",
        logo: DefaultIcon,
        description: "Region",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "19",
        logo: DefaultIcon,
        description: "Tier",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "20",
        logo: DefaultIcon,
        description: "Offer Copy",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
      {
        id: "21",
        logo: DefaultIcon,
        description: "Offer Communication",
        add: PlusIcon,
        filters: ["18--", "18-30", "31-40", "41-50", "51-60", "61+", "unknown"],
        category: "blabla",
      },
    ],
  },
];

// function Filter() {
//   const { filterAudience } = useContext(FilterContext);
//   console.log(filterAudience);
// }

// Filter();

export default Data;
