var ELECTION_PHASES = [
  { phase: "Phase 1", title: "Voter Registration", date: "Jan - Oct", dot: "Registration", detail: "Ensure you are registered to vote before the deadline.", ask: "How do I register to vote?" },
  { phase: "Phase 2", title: "Primaries & Caucuses", date: "Feb - Jun", dot: "Primaries", detail: "States hold primaries to select presidential nominees.", ask: "What is a primary election?" },
  { phase: "Phase 3", title: "National Conventions", date: "Jul - Aug", dot: "Conventions", detail: "Parties officially nominate their candidates.", ask: "What happens at a national convention?" },
  { phase: "Phase 4", title: "General Election Campaign", date: "Sep - Nov", dot: "Campaign", detail: "Candidates campaign across the country, participating in debates.", ask: "How do presidential campaigns work?" },
  { phase: "Phase 5", title: "Election Day", date: "Early Nov", dot: "Election Day", detail: "Voters go to the polls to cast their ballots.", ask: "When is Election Day?" },
  { phase: "Phase 6", title: "State Certification", date: "Nov - Dec", dot: "Certification", detail: "States count and certify the election results.", ask: "How are votes counted and certified?" },
  { phase: "Phase 7", title: "Electoral College Vote", date: "Mid Dec", dot: "Electoral College", detail: "Electors cast their official votes for President.", ask: "How does the Electoral College work?" },
  { phase: "Phase 8", title: "Inauguration Day", date: "Jan 20", dot: "Inauguration", detail: "The President-elect is officially sworn into office.", ask: "What is Inauguration Day?" }
];

var GLOSSARY_TERMS = [
  { term: "Absentee Ballot", def: "A ballot completed and typically mailed in advance of an election by a voter who is unable to be present at the polls." },
  { term: "Ballot", def: "A process of voting, in writing and typically in secret." },
  { term: "Bipartisan", def: "Involving the agreement or cooperation of two political parties that usually oppose each other's policies." },
  { term: "Caucus", def: "A meeting at which local members of a political party register their preference among candidates running for office or select delegates to attend a convention." },
  { term: "Constituency", def: "A body of voters in a specified area who elect a representative to a legislative body." },
  { term: "Delegate", def: "A person sent or authorized to represent others, in particular an elected representative sent to a conference." },
  { term: "Electoral College", def: "A body of people representing the states of the US, who formally cast votes for the election of the president and vice president." },
  { term: "Gerrymandering", def: "Manipulate the boundaries of an electoral constituency so as to favor one party or class." },
  { term: "Incumbent", def: "The current holder of a political office." },
  { term: "Lobbying", def: "Seek to influence a politician or public official on an issue." },
  { term: "Midterm Election", def: "Elections held in the middle of a president's term, where members of Congress are elected." },
  { term: "Partisan", def: "A strong supporter of a party, cause, or person." },
  { term: "Platform", def: "The declared policy of a political party or group." },
  { term: "Poll", def: "The process of voting in an election." },
  { term: "Primary", def: "A preliminary election to appoint delegates to a party conference or to select the candidates for a principal, especially presidential, election." },
  { term: "Referendum", def: "A general vote by the electorate on a single political question which has been referred to them for a direct decision." },
  { term: "Swing State", def: "A US state where the two major political parties have similar levels of support among voters, viewed as important in determining the overall result of a presidential election." },
  { term: "Ticket", def: "A single election choice which fills more than one political office or seat." },
  { term: "Turnout", def: "The percentage of eligible voters who cast a ballot in an election." },
  { term: "Voter Suppression", def: "A strategy to influence the outcome of an election by discouraging or preventing specific groups of people from voting." }
];

var QUIZ_QUESTIONS = [
  { q: "What is the Electoral College?", opts: ["A university for politicians", "The group that formally elects the President", "A system for campaign finance", "A type of primary election"], ans: 1, exp: "The Electoral College is the group of electors representing the states that formally casts votes for the election of the president." },
  { q: "When is Election Day in the US?", opts: ["First Monday in November", "First Tuesday after the first Monday in November", "Last Tuesday in October", "November 1st always"], ans: 1, exp: "By law, Election Day is the first Tuesday following the first Monday in November." },
  { q: "What is a Swing State?", opts: ["A state with playgrounds", "A state that always votes for one party", "A state where both major parties have a good chance of winning", "A state with the highest population"], ans: 2, exp: "A swing state is highly contested because both major parties have similar levels of support." },
  { q: "What does an Incumbent mean?", opts: ["A new candidate", "The current office holder", "A campaign manager", "A voter"], ans: 1, exp: "An incumbent is the current holder of a political office." },
  { q: "What is a primary election?", opts: ["The final election", "An election to choose party nominees", "A local mayoral election", "A vote on a new law"], ans: 1, exp: "Primaries are preliminary elections to select the candidates for the general election." }
];
