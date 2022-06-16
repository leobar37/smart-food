import { ClassNames } from '@emotion/react';
import { Box, useTheme } from '@keystone-ui/core';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

export const CardContainer: FC = ({ children }) => {
  const { tones } = useTheme();
  const tone = tones['active'];
  return (
    <ClassNames>
      {({ css }) => (
        <Box
          as="div"
          paddingLeft={'small'}
          className={css({
            position: 'relative',
            margin: '10px 0',
            ':before': {
              content: '" "',
              backgroundColor: tone.border,
              borderRadius: 4,
              width: 4,
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: 1,
            },
          })}
        >
          {children}
        </Box>
      )}
    </ClassNames>
  );
};
