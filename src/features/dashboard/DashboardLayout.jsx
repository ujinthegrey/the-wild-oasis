/* eslint-disable */
import styled from "styled-components";
import { useRecentBookings } from "./useResentBookings";

import Spinner from '../../ui/Spinner'
import Stats from './Stats'

import { useRecentStays } from "./useResentStays";
import { useCabins } from '../cabins/useCabins'
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {

  const {isLoading, bookings} = useRecentBookings()
  const {isLoading: isLoadingStays, stays, confirmedStays, numDays} = useRecentStays()
  const {cabins, isLoading: isLoadingCabins} = useCabins()

  if (isLoading || isLoadingStays || isLoadingCabins) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats 
        bookings={bookings} 
        confirmedStays={confirmedStays} 
        numDays={numDays}
        cabinCount={cabins.length}  
      />
      <div>Today&#39;s Activitiy</div>
      <DurationChart  confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
  </StyledDashboardLayout>
  )
}

export default DashboardLayout