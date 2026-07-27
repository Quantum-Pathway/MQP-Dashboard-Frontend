import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import ContentCard from '@components/UI/Card/ContentCard';
import CreateTokenForm from '@components/Pages/Tokens/CreateTokenForm';
import { fetchUserLimits } from '@utils/tokens-http';
import ErrorBlock from '@components/UI/MessageBox/ErrorBlock';
import LoadingIndicator from '@components/UI/LoadingIndicator';
import authService from "../../../auth/authService";

const NewToken = () => {
  const darkmode = useSelector((state) => state.accessibilities.darkmode);
  const fs = useSelector((state) => state.accessibilities.font_size);
  const page_header_fs = +fs * 1.5;

  const access_token = authService.getAccessToken();
  if (!access_token) {
    throw new Error("No Keycloak access token is available.");
  }
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['userLimits'],
    queryFn: ({ signal }) => fetchUserLimits({ signal, access_token }),
  });
  if (isError) {
    return <ErrorBlock title={error.message} />;
  }
  let newTokenContent;
  if (isPending) {
    newTokenContent = (
      <ContentCard className={`${darkmode ? 'dark_bg' : 'white_bg'} tokens_container`}>
        <LoadingIndicator />
      </ContentCard>
    );
  }

  if (data) {
    newTokenContent = <CreateTokenForm key="create_form" userLimits={data} access_token={access_token} />;
  }

  return (
    <ContentCard className={`${darkmode ? 'dark_bg' : 'white_bg'} tokens_container h-100`}>
      <div className="createToken_container">
        <h4 className="page_header" style={{ fontSize: page_header_fs }}>
          Create New Token
        </h4>
        {newTokenContent}
      </div>
    </ContentCard>
  );
};

export default NewToken;
