import styled from 'styled-components';

export const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 50px;
  background-color: #E2EAF4;
`;

export const Heading = styled.h1`
  text-align: center;
`;


export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const Tab = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#4CAF50' : '#f1f1f1'};
  color: ${props => props.active ? 'white' : 'black'};
  border: none;
  cursor: pointer;
  margin-right: 10px;
`;