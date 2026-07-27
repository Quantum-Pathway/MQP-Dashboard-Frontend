import React from 'react';
import { useSelector } from 'react-redux';
import ContentCard from '@components/UI/Card/ContentCard';
import { useQuery } from '@tanstack/react-query';
import { fetchResources } from '@utils/resources-http';
import ResourcesList from '@components/Pages/Resources/ResourcesList';
import LoadingIndicator from '@components/UI/LoadingIndicator';
import ErrorBlock from '@components/UI/MessageBox/ErrorBlock';
import authService from "../../../auth/authService";

import './Resources.scss';

function Resources() {
  const darkmode = useSelector((state) => state.accessibilities.darkmode);
  const access_token = authService.getAccessToken();
  if (!access_token) {
    throw new Error("No Keycloak access token is available.");
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['resources'],
    queryFn: ({ signal }) => fetchResources({ signal, access_token }),
  });

  let resourcesContent;
  if (isError) {
    return (
      <ContentCard className={`${darkmode ? 'dark_bg' : 'white_bg'} `}>
        <ErrorBlock title={error.message} message={error.code} />
      </ContentCard>
    );
  }
  if (isPending) {
    resourcesContent = (
      <ContentCard className={`${darkmode ? 'dark_bg' : 'white_bg'} `}>
        <LoadingIndicator />
        <p>Loading data...</p>
      </ContentCard>
    );
  }

  if (data) {
    resourcesContent = (
      <ContentCard className={`${darkmode ? 'dark_bg' : 'white_bg'} h-100`}>
        <ResourcesList
          resources={data.resources}
          available_resources={data.available_resources ? data.available_resources : null}
        />
      </ContentCard>
    );
  }

  return <React.Fragment>{resourcesContent}</React.Fragment>;
}

export default Resources;
