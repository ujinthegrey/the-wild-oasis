/* eslint-disable */
import styled from "styled-components";
import { useRecentBookings } from "./useResentBookings";

import Spinner from '../../ui/Spinner'
import { useRecentStays } from "./useResentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {

  const {isLoading, bookings} = useRecentBookings()
  const {isLoading: isLoadingStays, stays, confirmedStays} = useRecentStays()

  if (isLoading || isLoadingStays) return <Spinner />

  console.log(bookings)

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Today&#39;s Activitiy</div>
      <div>Chart stay durations</div>
      <div>Chart sales</div>
  </StyledDashboardLayout>
  )
}

export default DashboardLayout