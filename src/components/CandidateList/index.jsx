import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Container,
  FilterContainer,
  SearchInput,
  Table,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
  ViewProfileButton,
  ShortlistedIndicator,
  StatusDropdown,
  EmptyMessage,
  BubbleContainer,
  BubbleFilter
} from './styledComponents.js';
import Pagination from '../Pagination';

const CandidateTable = ({ candidates, onCandidateClick, shortlistedCandidates, candidateStatuses, onStatusUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState(['All']);
  const [filteredCandidates, setFilteredCandidates] = useState(candidates);
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 10;

  const statusOptions = useMemo(() => ['All', 'Under Review', 'Interview Scheduled', 'Shortlisted', 'Rejected', 'Hired'], []);

  const filterCandidates = useCallback(() => {
    return candidates.filter((candidate) => {
      const nameMatch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase());
      const candidateStatus = candidateStatuses[candidate.id] || 'Under Review';
      const statusMatch = activeFilters.includes('All') || activeFilters.includes(candidateStatus);
      return nameMatch && statusMatch;
    });
  }, [candidates, searchTerm, activeFilters, candidateStatuses]);

  useEffect(() => {
    const filtered = filterCandidates();
    setFilteredCandidates(filtered);
    setCurrentPage(1);
  }, [filterCandidates]);

  const handleStatusChange = useCallback((candidateId, newStatus) => {
    onStatusUpdate(candidateId, newStatus);
  }, [onStatusUpdate]);

  const toggleFilter = useCallback((filter) => {
    setActiveFilters((prevFilters) => {
      if (filter === 'All') {
        return ['All'];
      }
      const newFilters = prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters.filter((f) => f !== 'All'), filter];
      return newFilters.length === 0 ? ['All'] : newFilters;
    });
  }, []);

  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  return (
    <Container>
      <FilterContainer>
        <SearchInput
          type="text"
          placeholder="Search candidates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <BubbleContainer>
          {statusOptions.map((status) => (
            <BubbleFilter
              key={status}
              active={activeFilters.includes(status)}
              onClick={() => toggleFilter(status)}
            >
              {status}
            </BubbleFilter>
          ))}
        </BubbleContainer>
      </FilterContainer>
      {currentCandidates.length > 0 ? (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Name</TableHeader>
                <TableHeader>Highest Degree</TableHeader>
                <TableHeader>Location</TableHeader>
                <TableHeader>Status</TableHeader>
                <TableHeader>Action</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {currentCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    {candidate.name}
                    {shortlistedCandidates.includes(candidate.id) && (
                      <ShortlistedIndicator>Shortlisted</ShortlistedIndicator>
                    )}
                  </TableCell>
                  <TableCell>{candidate.highest_degree_obtained}</TableCell>
                  <TableCell>{candidate.location}</TableCell>
                  <TableCell>
                    <StatusDropdown
                      value={candidateStatuses[candidate.id] || 'Under Review'}
                      onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
                    >
                      {statusOptions.slice(1).map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </StatusDropdown>
                  </TableCell>
                  <TableCell>
                    <ViewProfileButton onClick={() => onCandidateClick(candidate)}>
                      View Profile
                    </ViewProfileButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <EmptyMessage>No candidates match your search criteria. Please try adjusting your filters.</EmptyMessage>
      )}
    </Container>
  );
};

export default React.memo(CandidateTable);












// import React, { useState, useEffect } from 'react';
// import { Container, FilterContainer, StatusFilter, SearchInput, Table, TableHead, TableHeader, TableCell, TableRow, ViewProfileButton, ShortlistedIndicator, StatusDropdown, EmptyMessage } from './styledComponents.js';
// import Pagination from '../Pagination'; // Import the new Pagination component

// const CandidateTable = ({ candidates, onCandidateClick, shortlistedCandidates, candidateStatuses, onStatusUpdate }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [filteredCandidates, setFilteredCandidates] = useState(candidates);
//   const [currentPage, setCurrentPage] = useState(1);
//   const candidatesPerPage = 10;

//   useEffect(() => {
//     const filtered = candidates.filter((candidate) => {
//       const nameMatch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase());
//       const candidateStatus = candidateStatuses[candidate.id] || 'Under Review';
//       const statusMatch = statusFilter === 'All' || candidateStatus === statusFilter;
//       return nameMatch && statusMatch;
//     });
//     setFilteredCandidates(filtered);
//     setCurrentPage(1);
//   }, [searchTerm, statusFilter, candidates, candidateStatuses]);

//   const statusOptions = ['All', 'Under Review', 'Interview Scheduled' ,'Shortlisted', 'Rejected', 'Hired'];

//   const handleStatusChange = (candidateId, newStatus) => {
//     onStatusUpdate(candidateId, newStatus);
//   };

//   const indexOfLastCandidate = currentPage * candidatesPerPage;
//   const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
//   const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

//   const totalPages = Math.ceil(filteredCandidates.length / candidatesPerPage);

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <Container>
//       <FilterContainer>
//         <SearchInput
//           type="text"
//           placeholder="Search candidates..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <StatusFilter
//           value={statusFilter}
//           onChange={(e) => setStatusFilter(e.target.value)}
//         >
//           {statusOptions.map((status) => (
//             <option key={status} value={status}>
//               {status}
//             </option>
//           ))}
//         </StatusFilter>
//       </FilterContainer>
//       {currentCandidates.length > 0 ? (
//         <>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableHeader>Name</TableHeader>
//                 <TableHeader>Highest Degree</TableHeader>
//                 <TableHeader>Location</TableHeader>
//                 <TableHeader>Status</TableHeader>
//                 <TableHeader>Action</TableHeader>
//               </TableRow>
//             </TableHead>
//             <tbody>
//               {currentCandidates.map((candidate) => (
//                 <TableRow key={candidate.id}>
//                   <TableCell>
//                     {candidate.name}
//                     {shortlistedCandidates.includes(candidate.id) && (
//                       <ShortlistedIndicator>Shortlisted</ShortlistedIndicator>
//                     )}
//                   </TableCell>
//                   <TableCell>{candidate.highest_degree_obtained}</TableCell>
//                   <TableCell>{candidate.location}</TableCell>
//                   <TableCell>
//                     <StatusDropdown
//                       value={candidateStatuses[candidate.id] || 'Under Review'}
//                       onChange={(e) => handleStatusChange(candidate.id, e.target.value)}
//                     >
//                       {statusOptions.slice(1).map((status) => (
//                         <option key={status} value={status}>
//                           {status}
//                         </option>
//                       ))}
//                     </StatusDropdown>
//                   </TableCell>
//                   <TableCell>
//                     <ViewProfileButton onClick={() => onCandidateClick(candidate)}>
//                       View Profile
//                     </ViewProfileButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </tbody>
//           </Table>
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={handlePageChange}
//           />
//         </>
//       ) : (
//         <EmptyMessage>No candidates match your search criteria. Please try adjusting your filters.</EmptyMessage>
//       )}
//     </Container>
//   );
// };

// export default CandidateTable;


