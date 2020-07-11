import React from 'react';

import Layout from '../components/layout';

const NotFoundPage = ({ location }) => (
  <Layout location={location} title="Not Found">
    <p>You have hit a page that doesn&#39;t exist...</p>
  </Layout>
);

export default NotFoundPage;
