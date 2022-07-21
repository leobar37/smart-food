import {
  Box,
  HStack,
  Image,
  Text,
  VStack,
  Link,
  useMultiStyleConfig,
  chakra,
} from '@chakra-ui/react';
import { cx } from '@chakra-ui/utils';
import { FC, ReactNode } from 'react';
import { motion, Variants, isValidMotionProp } from 'framer-motion';
type ExoticCardProps = {
  variant?: 'small' | 'large';
  src: string;
  alt?: string;
  title: ReactNode;
  subTitle: string;
  link: ReactNode;
};

const imageVariants: Variants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.4,
  },
};
const BoxMotion = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});
const ImageMotion = chakra(motion.img);

export const ExoticCard: FC<ExoticCardProps> = ({
  src,
  alt,
  title,
  subTitle,
  link,
  ...props
}) => {
  const styles = useMultiStyleConfig('ExoticCard', props);
  return (
    <BoxMotion
      whileHover="hover"
      __css={styles.card}
      className={cx('exotic_card')}
    >
      <ImageMotion
        __css={styles.image}
        src={src}
        variants={imageVariants}
        className="exotic_card__image"
      />
      <Box __css={styles.box}>
        <HStack __css={styles.info} className="exotic_card__info">
          <VStack fontWeight={'light'} alignItems={'start'} spacing="0">
            <Text>{title}</Text>
            <Text>{subTitle}</Text>
          </VStack>
          <VStack alignItems={'start'} h="full">
            {link}
          </VStack>
        </HStack>
      </Box>
    </BoxMotion>
  );
};
