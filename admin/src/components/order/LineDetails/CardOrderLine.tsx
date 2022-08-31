import {
    Box, List,
    ListItem, SlideFade, Text, useBoolean
} from '@chakra-ui/react';
import { Button } from '@keystone-ui/button';
import { get } from 'lodash';
import React, { FC } from 'react';
import { CardContainer } from '../../common';
import { PropertyLine, PropertySection } from '../../common/PropertyShow';
import { LineItem} from './types'
const CardOrderLine: FC<{ line: LineItem }> = ({ line }) => {
    const options = get(line, 'selection.options', []) as [];
    const hasOptions = options.length > 0;
    const [subOptionsIsOpen, setSubOptionsOpen] = useBoolean(false);
    const renderOptions = (opts: any[]) => {
      return opts.map((opt) => {
        return (
          <ListItem>
            <Text fontWeight={'bold'}>{get(opt, 'option.name')}</Text>
            <List listStyleType={'disc'} ml="8">
              {get(opt, 'subOptions', []).map((sub: any) => (
                <ListItem>{get(sub, 'name')}</ListItem>
              ))}
            </List>
          </ListItem>
        );
      });
    };
    return (
      <CardContainer>
        <PropertySection title="Producto">
          <PropertyLine label="Nombre:" value={line.product?.name} />
        </PropertySection>
        <PropertySection title="Detalle">
          <PropertyLine label="Cantidad:" value={line.quantity} />
          <PropertyLine label="Precio:" value={`${line.price} S/.`} />
          <PropertyLine label="Total:" value={`${(line as any).total}S/.`} />
        </PropertySection>
        {hasOptions && (
          <Box
            sx={{
              button: {
                mr: '3',
                display: 'block',
              },
            }}
          >
            <Button
              onClick={() => {
                setSubOptionsOpen.toggle();
              }}
              tone="active"
              weight="link"
              size="small"
            >
              {subOptionsIsOpen ? 'Ocultar selección' : 'Ver Selección'}
            </Button>
            {hasOptions && subOptionsIsOpen && (
              <SlideFade in={subOptionsIsOpen} offsetY="20px">
                <List marginTop={'1'} shadow={'md'} p="3">
                  {renderOptions(options)}
                </List>
              </SlideFade>
            )}
          </Box>
        )}
      </CardContainer>
    );
  };
  

  export default CardOrderLine;