import React from 'react';
import {Link} from 'react-router-dom';
import {useProjects} from 'shared-logic';

export default function Home() {
  const {data, isLoading, isError, error} = useProjects();

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <span>Error: {error?.message}</span>;
  }
  return (
    <div>
      <h1>This is the homepage</h1>
      <div>{data?.data?.data?.[0]?.name}</div>
      <Link to="/second">Route to second page</Link>
    </div>
  );
}
