import React, { useState, useEffect } from 'react';
import { GrLinkPrevious , GrLinkNext } from "react-icons/gr";
import {Container, FilterContainer, StatusFilter, SearchInput, Table, TableHead, TableHeader, TableCell, TableRow, ViewProfileButton, ShortlistedIndicator, StatusDropdown, PaginationContainer, PageButton , EmptyMessage} from './styledComponents.js';



const CandidateTable = ({ candidates, onCandidateClick, shortlistedCandidates, candidateStatuses, onStatusUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredCandidates, setFilteredCandidates] = useState(candidates);
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 10;

  useEffect(() => {
    const filtered = candidates.filter((candidate) => {
      const nameMatch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase());
      const candidateStatus = candidateStatuses[candidate.id] || 'Under Review';
      const statusMatch = statusFilter === 'All' || candidateStatus === statusFilter;
      return nameMatch && statusMatch;
    });
    setFilteredCandidates(filtered);
    setCurrentPage(1); 
  }, [searchTerm, statusFilter, candidates, candidateStatuses]);

  const statusOptions = ['All', 'Under Review', 'Next Round', 'Technical Round', 'HR Round' , 'Final Round' , 'Rejected', 'Hired'];

  const handleStatusChange = (candidateId, newStatus) => {
    onStatusUpdate(candidateId, newStatus);
  };

  
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = filteredCandidates.slice(indexOfFirstCandidate, indexOfLastCandidate);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredCandidates.length / candidatesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <FilterContainer>
        <SearchInput
          type="text"
          placeholder="Search candidates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <StatusFilter
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </StatusFilter>
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
          <PaginationContainer>
            <PageButton
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <GrLinkPrevious />
            </PageButton>
            {pageNumbers.map(number => (
              <PageButton
                key={number}
                onClick={() => setCurrentPage(number)}
                active={currentPage === number}
              >
                {number}
              </PageButton>
            ))}
            <PageButton
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageNumbers.length))}
              disabled={currentPage === pageNumbers.length}
            >
              <GrLinkNext />
            </PageButton>
          </PaginationContainer>
        </>
      ) : (
        <EmptyMessage>No candidates match your search criteria. Please try adjusting your filters.</EmptyMessage>
      )}
    </Container>
  );
};

export default CandidateTable;








// import React, { useState } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   background-color: #ffffff;
//   padding: 24px;
//   border-radius: 8px;
//   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
// `;

// const SearchContainer = styled.div`
//   position: relative;
//   margin-bottom: 40px;
// `;

// const SearchInput = styled.input`
//   width: 80%;
//   padding: 8px 12px;
//   padding-left: 36px;
//   height: 30px;
//   border: 1px solid #e2e8f0;
//   border-radius: 40px;
//   font-size: 14px;
//   &:focus {
//     outline: none;
//     border-color: #3b82f6;
//     box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
//   }
// `;

// const Heading = styled.h1`
//   text-align: center;
// `;

// const Table = styled.table`
//   width: 100%;
//   border-collapse: collapse;
// `;

// const TableHead = styled.thead`
//   background-color: #f3f4f6;
// `;

// const TableRow = styled.tr`
//   text-align: center;
//   &:nth-child(even) {
//     background-color: #f9fafb;
//   }
// `;

// const TableHeader = styled.th`
//   padding: 12px;
//   text-align: center;
//   font-weight: 600;
//   color: #374151;
//   border-bottom: 2px solid #e5e7eb;
// `;

// const TableCell = styled.td`
//   padding: 12px;
//   border-bottom: 1px solid #e5e7eb;
// `;

// const ViewProfileButton = styled.button`
//   background-color: #3b82f6;
//   color: white;
//   border: none;
//   padding: 6px 12px;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background-color 0.2s ease;

//   &:hover {
//     background-color: #2563eb;
//   }
// `;

// const ShortlistedIndicator = styled.span`
//   background-color: #4CAF50;
//   color: white;
//   padding: 2px 6px;
//   border-radius: 4px;
//   font-size: 12px;
//   margin-left: 8px;
// `;

// const StatusIndicator = styled.span`
//   background-color: #f59e0b;
//   color: white;
//   padding: 2px 6px;
//   border-radius: 4px;
//   font-size: 12px;
// `;

// const CandidateTable = ({ candidates, onCandidateClick, shortlistedCandidates, candidateStatuses }) => {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredCandidates = candidates.filter((candidate) =>
//     candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Container>
//       <Heading>Candidate Profiles Management</Heading>
//       <SearchContainer>
//         <SearchInput
//           type="text"
//           placeholder="Search candidates..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </SearchContainer>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableHeader>Name</TableHeader>
//             <TableHeader>Highest Degree</TableHeader>
//             <TableHeader>Location</TableHeader>
//             <TableHeader>Status</TableHeader>
//             <TableHeader>Action</TableHeader>
//           </TableRow>
//         </TableHead>
//         <tbody>
//           {filteredCandidates.map((candidate) => (
//             <TableRow key={candidate.id}>
//               <TableCell>
//                 {candidate.name}
//                 {shortlistedCandidates.includes(candidate.id) && (
//                   <ShortlistedIndicator>Shortlisted</ShortlistedIndicator>
//                 )}
//               </TableCell>
//               <TableCell>{candidate.highest_degree_obtained}</TableCell>
//               <TableCell>{candidate.location}</TableCell>
//               <TableCell>
//                 <StatusIndicator>
//                   {candidateStatuses[candidate.id] || 'Applied'}
//                 </StatusIndicator>
//               </TableCell>
//               <TableCell>
//                 <ViewProfileButton onClick={() => onCandidateClick(candidate)}>
//                   View Profile
//                 </ViewProfileButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default CandidateTable;

