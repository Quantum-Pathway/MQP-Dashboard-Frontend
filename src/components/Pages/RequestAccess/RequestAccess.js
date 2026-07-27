import React from 'react';
import BlankCard from '@components/UI/Card/BlankCard';
import RequestAccessForm from '@components/Pages/RequestAccess/RequestAccessForm';
import Footer from '@components/Layout/Footer/Footer';

import './RequestAccess.scss';

/**
 * RequestAccess - Page for new users to request access to the quantum computing platform
 */
const RequestAccess = () => {
  return (
    <BlankCard>
      <div className="mb-4 col-12 col-xl-8 col-xxl-6 RequestForm_wrap">
        <RequestAccessForm />
        <Footer />
      </div>
    </BlankCard>
  );
};
export default RequestAccess;
