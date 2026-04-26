const ELECTION_PHASES = [
  {
    phase: "Phase 1",
    title: "Candidate Declaration",
    date: "12–18 months before election",
    dot: "done",
    detail: "Candidates formally announce their intention to run for office. They form exploratory committees, start raising funds, and begin building their campaign infrastructure. This phase sets the stage for the primary season.",
    ask: "What happens during candidate declaration?"
  },
  {
    phase: "Phase 2",
    title: "Primaries & Caucuses",
    date: "6–12 months before election",
    dot: "done",
    detail: "Voters from each political party choose their preferred candidate. Primaries use secret ballots, while caucuses involve local gatherings where voters discuss and decide openly. These results determine how many delegates each candidate gets.",
    ask: "What is the difference between primaries and caucuses?"
  },
  {
    phase: "Phase 3",
    title: "Party Conventions",
    date: "3–6 months before election",
    dot: "done",
    detail: "Political parties hold large national events to officially nominate their candidates for President and Vice President. The party platform is finalized, outlining the party's core values and policy goals.",
    ask: "Why are party conventions important?"
  },
  {
    phase: "Phase 4",
    title: "General Campaign",
    date: "2–4 months before election",
    dot: "active",
    detail: "Candidates campaign nationwide, focusing heavily on swing states. This period features political rallies, extensive advertising, and televised debates. Candidates aim to appeal to a broad base of general electorate voters.",
    ask: "What do candidates do during the general campaign?"
  },
  {
    phase: "Phase 5",
    title: "Voter Registration Deadline",
    date: "15–30 days before election",
    dot: "",
    detail: "Citizens must register to vote by a specific date to be eligible for the upcoming election. Rules vary by state, with some allowing same-day registration while others require advanced signup.",
    ask: "How does voter registration work in the US?"
  },
  {
    phase: "Phase 6",
    title: "Early & Absentee Voting",
    date: "1–4 weeks before election",
    dot: "",
    detail: "Voters who cannot or prefer not to vote on Election Day can cast their ballots early. This can be done via mail-in absentee ballots or at designated early voting locations.",
    ask: "What is the difference between early voting and absentee voting?"
  },
  {
    phase: "Phase 7",
    title: "Election Day",
    date: "The official voting day",
    dot: "",
    detail: "The final day for voters to cast their ballots in person at their local polling stations. It traditionally falls on the first Tuesday after the first Monday in November.",
    ask: "Why is Election Day on a Tuesday?"
  },
  {
    phase: "Phase 8",
    title: "Vote Counting & Certification",
    date: "Days to weeks after election",
    dot: "",
    detail: "Local and state officials count the ballots and verify the results. Once all votes are tallied and any disputes are resolved, the state formally certifies the election results.",
    ask: "How are votes counted and certified?"
  }
];

const GLOSSARY_TERMS = [
  { term: "Absentee Ballot", def: "A ballot completed and mailed in advance by a voter who is unable to be present at the polls." },
  { term: "Ballot", def: "A device used to cast votes in an election, either on paper or electronically." },
  { term: "Caucus", def: "A local meeting where registered members of a political party gather to vote for their preferred party candidate." },
  { term: "Constituency", def: "A body of voters in a specified area who elect a representative to a legislative body." },
  { term: "Delegate", def: "A person chosen or elected to represent others, notably at a political party convention." },
  { term: "Electoral College", def: "A group of electors who formally cast votes for the election of the president and vice president." },
  { term: "Exit Poll", def: "A poll of voters taken immediately after they have exited the polling stations." },
  { term: "Gerrymandering", def: "Manipulating the boundaries of an electoral constituency to favor one party." },
  { term: "Incumbent", def: "The current holder of an office or position." },
  { term: "Mandate", def: "The authority granted by a constituency to act as its representative." },
  { term: "Polling Station", def: "A place where voters go to cast their votes in an election." },
  { term: "Primary Election", def: "An election that narrows the field of candidates before a general election." },
  { term: "Proportional Representation", def: "An electoral system in which parties gain seats in proportion to the number of votes cast for them." },
  { term: "Recount", def: "A repeated tabulation of votes cast in an election, used to determine the exact outcome." },
  { term: "Runoff Election", def: "A second election held to determine a winner when no candidate receives a majority of votes in the first election." },
  { term: "Suffrage", def: "The right to vote in political elections." },
  { term: "Swing State", def: "A US state where the two major political parties have similar levels of support among voters." },
  { term: "Third Party", def: "A political party organized as an alternative to the major parties in a two-party system." },
  { term: "Voter Registration", def: "The requirement that a person otherwise eligible to vote must register on an electoral roll before they will be entitled or permitted to vote." },
  { term: "Voter Suppression", def: "A strategy used to influence the outcome of an election by discouraging or preventing specific groups of people from voting." }
];

const QUIZ_QUESTIONS = [
  {
    q: "What is the primary purpose of a primary election?",
    opts: [
      "To elect the President of the United States",
      "To narrow the field of candidates before a general election",
      "To vote on new state laws and amendments",
      "To determine how many Electoral College votes a state gets"
    ],
    ans: 1,
    exp: "Primary elections are held by political parties to choose their candidates for the general election, effectively narrowing the field."
  },
  {
    q: "Which term describes manipulating the boundaries of an electoral constituency to favor one party?",
    opts: [
      "Filibustering",
      "Gerrymandering",
      "Lobbying",
      "Canvassing"
    ],
    ans: 1,
    exp: "Gerrymandering is the practice of drawing electoral district boundaries in a way that gives one political party an unfair advantage."
  },
  {
    q: "In the United States, who formally elects the President?",
    opts: [
      "The popular vote of the citizens",
      "The Supreme Court",
      "The Electoral College",
      "The Congress"
    ],
    ans: 2,
    exp: "The Electoral College, a group of electors chosen by the states, formally casts the votes that elect the US President and Vice President."
  },
  {
    q: "What is a 'swing state' in US elections?",
    opts: [
      "A state that frequently changes its election laws",
      "A state with a history of low voter turnout",
      "A state where both major parties have similar levels of support",
      "A state that holds the first primary election"
    ],
    ans: 2,
    exp: "Swing states (or battleground states) are crucial because they don't consistently vote for one party, making them competitive targets for campaigns."
  },
  {
    q: "Which of the following is typically required before a citizen can vote?",
    opts: [
      "Voter registration",
      "Paying a poll tax",
      "Passing a literacy test",
      "Joining a political party"
    ],
    ans: 0,
    exp: "Voter registration is required in almost all states to verify eligibility before a person can cast a ballot. Poll taxes and literacy tests are illegal."
  }
];
