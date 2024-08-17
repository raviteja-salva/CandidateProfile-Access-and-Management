import React, { useState, useEffect, useCallback } from 'react';
import candidatesData from '../../candidates.json';
import CandidateDetails from '../CandidateDetails';
import CandidateTable from '../CandidateList';
import { Container, Heading } from './styledComponents.js';

const CandidateProfileManagement = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
  const [candidateStatuses, setCandidateStatuses] = useState({});

  useEffect(() => {
    // Initialize candidate statuses
    const initialStatuses = {};
    candidatesData.forEach(candidate => {
      initialStatuses[candidate.id] = 'Under Review';
    });
    setCandidateStatuses(initialStatuses);
  }, []);

  const handleCandidateClick = useCallback((candidate) => {
    setSelectedCandidate(candidate);
  }, []);

  const handleCloseDetails = useCallback(() => {
    setSelectedCandidate(null);
  }, []);

  const handleShortlist = useCallback((candidateId) => {
    setShortlistedCandidates(prev => 
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  }, []);

  const handleStatusUpdate = useCallback((candidateId, newStatus) => {
    setCandidateStatuses(prev => ({
      ...prev,
      [candidateId]: newStatus
    }));
  }, []);

  return (
    <Container>
      <Heading>Candidate Profiles Management</Heading>
      <CandidateTable
        candidates={candidatesData}
        onCandidateClick={handleCandidateClick}
        shortlistedCandidates={shortlistedCandidates}
        candidateStatuses={candidateStatuses}
        onStatusUpdate={handleStatusUpdate}
      />
      {selectedCandidate && (
        <CandidateDetails 
          candidate={selectedCandidate} 
          onClose={handleCloseDetails}
          onShortlist={handleShortlist}
          isShortlisted={shortlistedCandidates.includes(selectedCandidate.id)}
          onStatusUpdate={handleStatusUpdate}
          currentStatus={candidateStatuses[selectedCandidate.id] || 'Under Review'}
        />
      )}
    </Container>
  );
};

export default React.memo(CandidateProfileManagement);




// import React, { useState, useEffect, useCallback } from 'react';
// import candidatesData from '../../candidates.json';
// import CandidateDetails from '../CandidateDetails';
// import CandidateTable from '../CandidateList';
// import { Container, Heading, ShortlistToggle } from './styledComponents.js';

// const CandidateProfileManagement = () => {
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
//   const [candidateStatuses, setCandidateStatuses] = useState({});
//   const [showOnlyShortlisted, setShowOnlyShortlisted] = useState(false);

//   useEffect(() => {
//     // Initialize candidate statuses
//     const initialStatuses = {};
//     candidatesData.forEach(candidate => {
//       initialStatuses[candidate.id] = 'Under Review';
//     });
//     setCandidateStatuses(initialStatuses);
//   }, []);

//   const handleCandidateClick = useCallback((candidate) => {
//     setSelectedCandidate(candidate);
//   }, []);

//   const handleCloseDetails = useCallback(() => {
//     setSelectedCandidate(null);
//   }, []);

//   const handleShortlist = useCallback((candidateId) => {
//     setShortlistedCandidates(prev => 
//       prev.includes(candidateId)
//         ? prev.filter(id => id !== candidateId)
//         : [...prev, candidateId]
//     );
//   }, []);

//   const handleStatusUpdate = useCallback((candidateId, newStatus) => {
//     setCandidateStatuses(prev => ({
//       ...prev,
//       [candidateId]: newStatus
//     }));
//   }, []);

//   const toggleShortlistedView = useCallback(() => {
//     setShowOnlyShortlisted(prev => !prev);
//   }, []);

//   const displayedCandidates = showOnlyShortlisted
//     ? candidatesData.filter(candidate => shortlistedCandidates.includes(candidate.id))
//     : candidatesData;

//   return (
//     <Container>
//       <Heading>Candidate Profiles Management</Heading>
//       <ShortlistToggle onClick={toggleShortlistedView}>
//         {showOnlyShortlisted ? 'Show All Candidates' : 'Show Shortlisted Candidates'}
//       </ShortlistToggle>
//       <CandidateTable
//         candidates={displayedCandidates} 
//         onCandidateClick={handleCandidateClick}
//         shortlistedCandidates={shortlistedCandidates}
//         candidateStatuses={candidateStatuses}
//         onStatusUpdate={handleStatusUpdate}
//       />
//       {selectedCandidate && (
//         <CandidateDetails 
//           candidate={selectedCandidate} 
//           onClose={handleCloseDetails}
//           onShortlist={handleShortlist}
//           isShortlisted={shortlistedCandidates.includes(selectedCandidate.id)}
//           onStatusUpdate={handleStatusUpdate}
//           currentStatus={candidateStatuses[selectedCandidate.id] || 'Under Review'}
//         />
//       )}
//     </Container>
//   );
// };

// export default React.memo(CandidateProfileManagement);






// import React, { useState , useEffect } from 'react';
// import candidatesData from '../../candidates.json';
// import CandidateDetails from '../CandidateDetails';
// import CandidateTable from '../CandidateList';
// import {Container , Heading, TabContainer, Tab} from './styledComponents.js';


// const CandidateProfileManagement = () => {
//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [shortlistedCandidates, setShortlistedCandidates] = useState([]);
//   const [candidateStatuses, setCandidateStatuses] = useState({});

//   useEffect(() => {
//     // Initialize candidate statuses
//     const initialStatuses = {};
//     candidatesData.forEach(candidate => {
//       initialStatuses[candidate.id] = 'Under Review';
//     });
//     setCandidateStatuses(initialStatuses);
//   }, []);

//   const handleCandidateClick = (candidate) => {
//     setSelectedCandidate(candidate);
//   };

//   const handleCloseDetails = () => {
//     setSelectedCandidate(null);
//   };

//   const handleShortlist = (candidateId) => {
//     setShortlistedCandidates(prev => 
//       prev.includes(candidateId)
//         ? prev.filter(id => id !== candidateId)
//         : [...prev, candidateId]
//     );
//   };

//   const handleStatusUpdate = (candidateId, newStatus) => {
//     setCandidateStatuses(prev => ({
//       ...prev,
//       [candidateId]: newStatus
//     }));
//   };

//   const displayedCandidates = activeTab === 'all'
//     ? candidatesData
//     : candidatesData.filter(candidate => shortlistedCandidates.includes(candidate.id));

//   return (
//     <Container>
//       <Heading>Candidate Profiles Management</Heading>
//       <TabContainer>
//         <Tab active={activeTab === 'all'} onClick={() => setActiveTab('all')}>All Candidates</Tab>
//         <Tab active={activeTab === 'shortlisted'} onClick={() => setActiveTab('shortlisted')}>Shortlisted Candidates</Tab>
//       </TabContainer>
//       <CandidateTable
//         candidates={displayedCandidates} 
//         onCandidateClick={handleCandidateClick}
//         shortlistedCandidates={shortlistedCandidates}
//         candidateStatuses={candidateStatuses}
//         onStatusUpdate={handleStatusUpdate}
//       />
//       {selectedCandidate && (
//         <CandidateDetails 
//           candidate={selectedCandidate} 
//           onClose={handleCloseDetails}
//           onShortlist={handleShortlist}
//           isShortlisted={shortlistedCandidates.includes(selectedCandidate.id)}
//           onStatusUpdate={handleStatusUpdate}
//           currentStatus={candidateStatuses[selectedCandidate.id] || 'Under Review'}
//         />
//       )}
//     </Container>
//   );
// };

// export default CandidateProfileManagement;
