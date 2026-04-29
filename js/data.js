var ELECTION_PHASES = [
  {phase:'Phase 1',title:'Candidate Declaration',date:'12-18 months before election',dot:'done',detail:'Candidates formally announce their intention to run for office. They file paperwork with election authorities, declare their party affiliation, meet eligibility requirements, and begin building their campaign teams and fundraising operations.',ask:'How do candidates officially declare they are running for office?'},
  {phase:'Phase 2',title:'Primaries and Caucuses',date:'6-12 months before election',dot:'done',detail:'Within each party, registered voters choose their preferred candidate through primary elections or caucuses. Winners earn delegate support. This narrows the field to one nominee per major party.',ask:'What is the difference between a primary election and a caucus?'},
  {phase:'Phase 3',title:'Party Conventions',date:'3-6 months before election',dot:'done',detail:'Political parties hold national conventions where delegates officially nominate their candidates. The party platform is adopted. Candidates deliver acceptance speeches generating national media coverage.',ask:'What happens at a political party convention?'},
  {phase:'Phase 4',title:'General Campaign',date:'2-4 months before election',dot:'active',detail:'Nominated candidates campaign nationwide holding rallies, running advertisements, participating in debates, and reaching voters through social media. Voter registration drives peak during this period.',ask:'How does campaign finance work in elections?'},
  {phase:'Phase 5',title:'Voter Registration Deadline',date:'15-30 days before election',dot:'',detail:'Most jurisdictions require voters to register by a specific deadline. First-time voters must submit their information to be added to the official electoral roll. Some states allow same-day registration.',ask:'How does voter registration work and why is it required?'},
  {phase:'Phase 6',title:'Early and Absentee Voting',date:'1-4 weeks before election',dot:'',detail:'Many jurisdictions offer early in-person voting or mail-in ballots for voters who cannot make it on election day. Absentee ballot requests must typically be submitted in advance.',ask:'How does absentee and mail-in voting work?'},
  {phase:'Phase 7',title:'Election Day',date:'The official voting day',dot:'',detail:'Eligible registered voters cast their secret ballots at designated polling stations. Poll workers verify voter identity. Voters receive a ballot, mark their choices in private, and submit the completed ballot.',ask:'What happens at a polling station on election day?'},
  {phase:'Phase 8',title:'Vote Counting and Certification',date:'Days to weeks after election',dot:'',detail:'After polls close, ballots are tallied by trained election officials. Results are audited and provisional ballots are reviewed. Final certified results are submitted to the appropriate authority and the winning candidate is declared.',ask:'How are election results counted, audited, and certified?'}
];

var GLOSSARY_TERMS = [
  {term:'Absentee Ballot',def:'A ballot cast by a voter who cannot attend in person on election day, submitted by mail or in advance.'},
  {term:'Ballot',def:'The official form or device used by a voter to record and cast their choices in an election.'},
  {term:'Caucus',def:'A local meeting where party members gather to select candidates or delegates through open group discussion.'},
  {term:'Constituency',def:'A defined geographic area whose residents are represented by a single elected official.'},
  {term:'Delegate',def:'A representative chosen to vote on behalf of a group at a party convention or nominating event.'},
  {term:'Electoral College',def:'In the US, a group of electors from each state who formally cast votes to elect the president and vice president.'},
  {term:'Exit Poll',def:'A survey of voters conducted immediately after they cast their ballot, used to predict election outcomes.'},
  {term:'Gerrymandering',def:'The manipulation of electoral district boundaries to favor one political party or group over another.'},
  {term:'Incumbent',def:'The current holder of an elected office who is seeking re-election in an upcoming race.'},
  {term:'Mandate',def:'The authority an elected official derives from voters to govern and implement specific policies.'},
  {term:'Polling Station',def:'A designated location where eligible registered voters go to cast their ballots on election day.'},
  {term:'Primary Election',def:'A preliminary election in which party members vote to select their party\'s official candidate for the general election.'},
  {term:'Proportional Representation',def:'An electoral system where the share of legislative seats reflects the share of votes each party receives.'},
  {term:'Recount',def:'A second official count of votes, typically requested when the margin of victory is very small.'},
  {term:'Runoff Election',def:'A second election held between top candidates when no single candidate wins the required majority.'},
  {term:'Suffrage',def:'The legal right to vote in public political elections. Universal suffrage means all adult citizens can vote.'},
  {term:'Swing State',def:'A state where support is roughly equal between parties, making it highly competitive and influential.'},
  {term:'Third Party',def:'Any political party other than the two dominant parties in a two-party political system.'},
  {term:'Voter Registration',def:'The process of officially signing up with government authorities to be verified as an eligible voter.'},
  {term:'Voter Suppression',def:'Efforts to discourage, prevent, or disenfranchise eligible voters from exercising their right to vote.'}
];

var QUIZ_QUESTIONS = [
  {q:'What is the main purpose of a primary election?',opts:['To select a party\'s official candidate for the general election','To count and certify final election results','To draw new electoral district boundaries','To register new voters before election day'],ans:0,exp:'A primary election allows party members to vote and choose who will represent their party in the upcoming general election, narrowing down the field of candidates.'},
  {q:'What does gerrymandering refer to?',opts:['A type of electronic voting machine','Manipulating district boundaries to favor one political party','A form of absentee or mail-in voting','The process of auditing and recounting ballots'],ans:1,exp:'Gerrymandering is the practice of drawing electoral district boundaries in a way that gives one political party an unfair advantage over others.'},
  {q:'What is the Electoral College in the United States?',opts:['A university that trains election administrators','A committee that approves all election results','A body of electors who formally cast votes to elect the president','The national agency that oversees campaign finance'],ans:2,exp:'The Electoral College is a constitutional body of electors who formally cast the official votes to elect the president after the popular vote is held.'},
  {q:'What makes a state a swing state or battleground state?',opts:['It has the highest number of electoral votes','It always votes for the same party every election','Support is roughly equal between parties making its outcome unpredictable','It holds its primary elections last'],ans:2,exp:'A swing state is one where no single party dominates. Both major parties have similar levels of support making the outcome uncertain and giving these states outsized importance.'},
  {q:'What is the purpose of voter registration?',opts:['To allow candidates to officially run for office','To add a citizen\'s information to the official voter roll so they can cast a ballot','To determine which polling station gets the most resources','To assign party affiliation to all citizens'],ans:1,exp:'Voter registration is the process by which eligible citizens formally sign up with election authorities, verifying their identity and residence, so they can legally cast a ballot.'}
];
