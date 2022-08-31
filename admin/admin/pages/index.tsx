import { PageContainer } from '@keystone-6/core/admin-ui/components';
import { H1, Text } from '@keystone-ui/core';
import React from 'react';

export default function CustomPage() {
  return (
    <PageContainer header={<H1>Dashboard</H1>}>
      <Text>Todavía no implementamos el dashboard 🙄</Text>
    </PageContainer>
  );
}
