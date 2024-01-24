import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchInProgress, getSearchError } from '../selectors';
import Error from '../../errors/components';
import { search } from '../actions';
import { Spinner } from '../../generic/components';
import SearchDetails from './search-details';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { showStats } from '../../raw/legacy';
import { getFileStatus } from '../../files/selectors';
import { useNavigate } from 'react-router-dom';

import { fetchFileBasicAuth, fetchFileJWTAuth } from '../../files/actions';
import { TextField, Typography, Container, Paper } from '@mui/material';
import { styled } from '@mui/system';


const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px; /* Added padding to the header */
  background-color: #f0f0f0; /* Added background color to the header */
  box-shadow: none; /* Removed box shadow */
`;

const LogoutButton = styled('span')`
  cursor: pointer;
  color: #007bff; /* Added color to simulate a link */
  text-decoration: underline;
`;

const SearchField = styled('div')`
  margin-right: 20px;
  display: flex;
  align-items: center;
`;

const Frame = styled('fieldset')`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
`;

const StyledDatePicker = styled(DatePicker)`
  margin-top: 10px;
`;

const StyledDateTextField = styled(TextField)`
  margin-top: 10px;
`;

function getMaxDatePlaceholder() {
  return new Date();
}

function getMinDatePlaceholder() {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  return date;
}

const SearchComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInProgress = useSelector(getSearchInProgress);
  const error = useSelector(getSearchError);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('sessionId') || params.get('meetingUniqueId');
    if (sessionId) {
      dispatch(search({
        sessionId: sessionId
      }));
    }
  }, [dispatch]);

  const [startDate, setStartDate] = useState(getMinDatePlaceholder());
  const [endDate, setEndDate] = useState(getMaxDatePlaceholder());

  const handleLogout = () => {
    localStorage.removeItem("SariskaAccessToken");
    window.location.href = "/";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { target: { elements: { conferenceId } } } = e;

    dispatch(search({
      conferenceId: conferenceId.value.trim(),
      minDate: startDate.toISOString().substring(0, 10),
      maxDate: endDate.toISOString().substring(0, 10)
    }));
  };

  return (
    <Container>
      <div elevation={3} sx={{ padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <Header>
          <Typography variant="h5">Search Conference</Typography>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Header>
        <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
          <SearchField>
            <TextField
              label="Conference name or URL *"
              autoComplete="on"
              name="conferenceId"
              placeholder="thisismyconference"
              required
              autoFocus
            />
          </SearchField>
          <SearchField>
            <label variant="body1">Start date:</label>
            <StyledDatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              customInput={<StyledDateTextField variant="outlined" />}
            />
          </SearchField>
          <SearchField>
            <label variant="body1">End date:</label>
            <StyledDatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              customInput={<StyledDateTextField variant="outlined" />}
            />
          </SearchField>
          <SearchField>
            <button type="submit">Search</button>
          </SearchField>
          
        </form>
      </div>
      <div>
        <SearchDetails />
        {searchInProgress && <Spinner size={20} />}
        {error && <Error {...error} />}
      </div>
    </Container>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dumpId = params.get('dumpId');
    if (dumpId) {
      dispatch(fetchFileBasicAuth(dumpId));
    }
  }, [dispatch]);
  const { data } = useSelector(getFileStatus) || {};
  console.log("datadatadatadatadatadatadatadata", data);

  let logs = [];
  if (data) {
    if (data.peerConnections.null) {
      logs = data.peerConnections.null
        .filter((msg) => msg.type === 'logs')
        .reduce((accumulator, currentValue) => accumulator.concat(currentValue.value), [])
        .map((msg) => ({ method: 'log', data: [msg.text] }));
    }
    showStats(data); // Assuming showStats is defined elsewhere
  }

  return (
    <Container>
      <SearchComponent />
      <div id="result"></div>
    </Container>
  );
};

export default Dashboard;
