import { Option, SubOption } from '.prisma/client';
import { controller } from '@keystone-6/core/fields/types/virtual/views';
import { FieldProps } from '@keystone-6/core/types';
import { Box } from '@keystone-ui/core';
import { FieldContainer, FieldLabel } from '@keystone-ui/fields';
import React from 'react';

import {
  CardContainer, PropertySection
} from '../components/common';
type Selection = {
  option: Option;
  subOptions: SubOption[];
};

export const Field = ({
  field,
  value,
}: FieldProps<typeof controller>) => {
  const source: Selection[] = Array.isArray(value) ? value : [];

  const selectionNodes = source.map((sel) => {
    const subOptions = sel.subOptions;
    return (
      <PropertySection title={sel.option.name} key={sel.option.id}>
        {subOptions.map((sub) => (
          <Box key={sub.id}>{sub.name}</Box>
        ))}
      </PropertySection>
    );
  });
  return (
    <FieldContainer>
      <FieldLabel>{field.label}</FieldLabel>
      <CardContainer>{selectionNodes}</CardContainer>
    </FieldContainer>
  );
};
